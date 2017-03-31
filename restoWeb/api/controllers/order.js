//var models = require("../../database/models");
var redis = require('redis');
var client = redis.createClient("redis://rediscloud:6wPtT2Oi8rVx458z@redis-19567.c8.us-east-1-3.ec2.cloud.redislabs.com:19567", {no_ready_check: false});
var promise = require('promise');
var Redlock = require('redlock');
var uuid = require('uuid/v1');
var ttl = 1000;
var _ = require('lodash');
var models = require("../../database/models");
var orderModel;
var orderedItemsModel;
var itemModel;
var orderedItemIngredientModel;
var restaurantModel;
var itemTranslationModel;
var itemSizeTranslationModel;
var itemSizeModel;
var redlock = new Redlock(
  // you should have one client for each redis node
  // in your cluster
  [client],
  {
    // the expected clock drift; for more details
    // see http://redis.io/topics/distlock
    driftFactor: 0.01, // time in ms

    // the max number of times Redlock will attempt
    // to lock a resource before erroring
    retryCount: 30,

    // the time in ms between attempts
    retryDelay: 100 // time in ms
  }
);

setDatabase(models);

module.exports = {
  placeOrder: placeOrder,
  retrieveOrders: retrieveRestaurantOrders,
  removeAllRestaurantsOrders: removeAllOrders,
  closeRedis: closeRedis,
  removeRestaurantsOrder: removeRestaurantsOrder,
  payForOrder: payForOrder,
  completeOrder: completeOrder,
  cancelOrder: cancelOrder,
  retrieveCompletedOrders: retrieveCompletedRestaurantOrders,
  retrieveCompletedOrder: retrieveCompletedRestaurantOrder
};

function setDatabase(m) {
  models = m;
  orderModel = models.getOrdersModel();
  orderedItemsModel = models.getOrderedItemsModel();
  itemModel = models.getItemModel();
  orderedItemIngredientModel = models.getOrderedItemIngredientModel();
  restaurantModel = models.getRestaurantModel();
  itemTranslationModel = models.getItemTranslationModel();
  itemSizeTranslationModel = models.getItemSizeTranslationsModel();
  itemSizeModel = models.getItemSizesModel();
}

redlock.on('clientError', function (err) {
  console.error('A redis error has occurred:', err);
});

function placeOrder(req, res) {
  return new promise(function (fulfill, reject) {
    var order = req.body.order;
    var restaurantId = order.restaurantId;
    var restaurantOrders = [];
    var restaurantKey = 'restaurantOrders:' + restaurantId;
    var uuidGen = uuid();
    order.id = uuidGen;

    redlock.lock(restaurantKey + 'lock', ttl).then(function (lock) {
      var internalPromise = new promise(function (internalFulfill, reject) {
        client.get(restaurantKey, function (err, reply) {
          if (reply) {
            restaurantOrders = JSON.parse(reply);
            unlock(lock);
            internalFulfill(restaurantOrders);
          }
          else {
            unlock(lock);
            internalFulfill([]);
          }
        });
      });

      internalPromise.then(function (restaurantOrders) {
        restaurantOrders.push(order);
        client.setex(restaurantKey, 24 * 60 * 60, JSON.stringify(restaurantOrders), function (err, reply) {
          if (reply == "OK") {
            unlock(lock);
            res.json({success: 1, description: "Order stored", orderId: order.id});
            fulfill(order.id);
            notifyNewOrder(restaurantId, order);
          }
          else {
            res.json({success: 1, description: "Order failed to store"});
            unlock(lock);
            reject();
          }
        });
      });
    });
  });

}

function unlock(lock) {
  return lock.unlock()
    .catch(function (err) {
      console.error(err);
    });
}

function notifyNewOrder(restaurantId, order) {
  client.publish('restaurantNewOrder' + restaurantId, JSON.stringify(order));
}

function payForOrder(req, res) {
  var restoMode = req.swagger.params.restoMode.value;
  var restaurantId = req.body.restaurantId;
  var id = req.body.id;
  var order = req.body;
  var restaurantKey = 'restaurantOrders:' + restaurantId;

  if(restoMode === 'kco') {
    return orderModel.find({where: {orderId: id}, include: [{
    model: orderedItemsModel,
    as: 'orderedItems',
    include: [{
        model: itemModel,
        as: 'item',
        include: [{
          model: itemTranslationModel,
          as: 'translations'
        }]
      }, {
        model: itemSizeModel,
        as: 'size',
        include: [{
          model: itemSizeTranslationModel,
          as: 'translations'
        }]
      }]
    }]}).then(function (oldOrder) {
      if(oldOrder === null) {
        order.status = 'paidNotComplete';
        modifyOrderInCache(restaurantKey, id, order.status);
        var orderedItems = [];
        order.orderedItems.forEach(function (orderedItem) {
          orderedItem.sizes.forEach(function (sizeContainer) {
            var selectedIngredients = [];
            if(sizeContainer.selectedIngredients) {
              sizeContainer.selectedIngredients.ingredients.forEach(function (ingredientContainer) {
                selectedIngredients.push({
                  ingredientId: ingredientContainer.ingredient.id,
                  //quantity: ingredientContainer.ingredient.quantity
                });
              });
            }

            orderedItems.push({itemId: orderedItem.item.id, itemSizeId: sizeContainer.size.id});
          });
        });
        return orderModel.create({total: order.total, status: order.status, restaurantId: restaurantId, orderedItems: orderedItems, orderId: id},
        {
          include: [{
            model: orderedItemsModel, as: 'orderedItems', include: [{
              model: orderedItemIngredientModel,
              as: 'orderedItemIngredients'
            }]
          }]
        }).then(function (createdOrder) {
            return res.json({success: 1, description: "Order PaidNotComplete"});
        })
      }
      else {
        for (var prop in order) {
          oldOrder[prop] = order[prop];
        }
        oldOrder.status = 'paidComplete';
        removeRestaurantOrderFromCache(restaurantKey, id);
        oldOrder.save().then(function(result) {
        return res.json({success: 1, description: 'Order PaidComplete'});
        });
      }
    })
  }

  return removeRestaurantOrderFromCache(restaurantKey, req.body.id).then(function (result) {
      var order = result.removedOrder;
      order.status = req.body.status;
      var orderedItems = [];
      order.orderedItems.forEach(function (orderedItem) {
        orderedItem.sizes.forEach(function (sizeContainer) {
          var selectedIngredients = [];
          if(sizeContainer.selectedIngredients) {
            sizeContainer.selectedIngredients.ingredients.forEach(function (ingredientContainer) {
              selectedIngredients.push({
                ingredientId: ingredientContainer.ingredient.id,
                //quantity: ingredientContainer.ingredient.quantity
              });
            });
          }

          orderedItems.push({itemId: orderedItem.item.id, itemSizeId: sizeContainer.size.id});
        });
      });

      return orderModel.create({total: order.total, status: order.status, restaurantId: restaurantId, orderedItems: orderedItems, orderId: id},
        {
          include: [{
            model: orderedItemsModel, as: 'orderedItems', include: [{
              model: orderedItemIngredientModel,
              as: 'orderedItemIngredients'
            }]
          }]
        }).then(function (createdOrder) {
          if(restoMode === 'kce') {
            var restaurantOrders = [];
            redlock.lock(restaurantKey + 'lock', ttl).then(function (lock) {
              var internalPromise = new promise(function (internalFulfill, reject) {
                client.get(restaurantKey, function (err, reply) {
                  if (reply) {
                    restaurantOrders = JSON.parse(reply);
                    unlock(lock);
                    internalFulfill(restaurantOrders);
                  }
                  else {
                    unlock(lock);
                    internalFulfill([]);
                  }
                });
              });

              internalPromise.then(function (restaurantOrders) {
                restaurantOrders.push(order);
                client.setex(restaurantKey, 24 * 60 * 60, JSON.stringify(restaurantOrders), function (err, reply) {
                  if (reply == "OK") {
                    unlock(lock);
                    //res.json({success: 1, description: "Order stored", orderId: order.id});
                    //fulfill(order.id);
                    notifyNewOrder(restaurantId, order);
                  }
                  else {
                    //res.json({success: 1, description: "Order failed to store"});
                    unlock(lock);
                    reject();
                  }
                });
              });
            });
          }
        return res.json({success: 1, description: "Order paid"});
      });
    }
  )
}

function completeOrder(req, res) {
  var restoMode = req.swagger.params.restoMode.value;
  var restaurantId = req.body.restaurantId;
  var restaurantKey = 'restaurantOrders:' + restaurantId;
  var order = req.body;
  var id = order.id;
  console.log("Id:" + id);

  if(restoMode === 'kco') {
    return orderModel.find({where: {orderId: id}, include: [{
    model: orderedItemsModel,
    as: 'orderedItems',
    include: [{
        model: itemModel,
        as: 'item',
        include: [{
          model: itemTranslationModel,
          as: 'translations'
        }]
      }, {
        model: itemSizeModel,
        as: 'size',
        include: [{
          model: itemSizeTranslationModel,
          as: 'translations'
        }]
      }]
    }]}).then(function (oldOrder) {
      if(oldOrder === null) {
        order.status = 'notPaidComplete';
        modifyOrderInCache(restaurantKey, id, order.status);
        var orderedItems = [];
        order.orderedItems.forEach(function (orderedItem) {
          orderedItem.sizes.forEach(function (sizeContainer) {
            var selectedIngredients = [];
            if(sizeContainer.selectedIngredients) {
              sizeContainer.selectedIngredients.ingredients.forEach(function (ingredientContainer) {
                selectedIngredients.push({
                  ingredientId: ingredientContainer.ingredient.id,
                  //quantity: ingredientContainer.ingredient.quantity
                });
              });
            }

            orderedItems.push({itemId: orderedItem.item.id, itemSizeId: sizeContainer.size.id});
          });
        });
        return orderModel.create({total: order.total, status: order.status, restaurantId: restaurantId, orderedItems: orderedItems, orderId: id},
        {
          include: [{
            model: orderedItemsModel, as: 'orderedItems', include: [{
              model: orderedItemIngredientModel,
              as: 'orderedItemIngredients'
            }]
          }]
        }).then(function (createdOrder) {
            return res.json({success: 1, description: "Order NotPaidComplete"});
        })
      }
      else {
        for (var prop in order) {
          oldOrder[prop] = order[prop];
        }
        oldOrder.status = 'paidComplete';
        removeRestaurantOrderFromCache(restaurantKey, id);
        oldOrder.save().then(function(result) {
        return res.json({success: 1, description: 'Order PaidComplete'});
        });
      }
    })
  }

  removeRestaurantOrderFromCache(restaurantKey, id);

  return orderModel.find({where: {orderId: id}, include: [{
    model: orderedItemsModel,
    as: 'orderedItems',
    include: [{
      model: itemModel,
      as: 'item',
      include: [{
        model: itemTranslationModel,
        as: 'translations'
      }]
    }, {
      model: itemSizeModel,
      as: 'size',
      include: [{
        model: itemSizeTranslationModel,
        as: 'translations'
      }]
    }]
  }]}).then(function (oldOrder) {
    for (var prop in order) {
      oldOrder[prop] = order[prop];
    }
    oldOrder.status = 'paidComplete';
    oldOrder.save().then(function(result) {
      return res.json({success: 1, description: 'Order Complete'});
    });
  });
}

function cancelOrder(req, res) {
  var id = req.swagger.params.orderId.value;
  var restaurantId = req.swagger.params.restaurantId.value;
  var restaurantKey = 'restaurantOrders:' + restaurantId;
  console.log(restaurantKey);
  console.log(id);
  removeRestaurantOrderFromCache(restaurantKey, id);
  return orderModel.find({where: {orderId: id}, include: [{
    model: orderedItemsModel,
    as: 'orderedItems',
    include: [{
      model: itemModel,
      as: 'item',
      include: [{
        model: itemTranslationModel,
        as: 'translations'
      }]
    }, {
      model: itemSizeModel,
      as: 'size',
      include: [{
        model: itemSizeTranslationModel,
        as: 'translations'
      }]
    }]
  }]}).then(function (oldOrder) {
    if(oldOrder === null) {
      return res.json({success: 1, description: 'Order not in database'});
    }
    return oldOrder.destroy().then(function(result) {
      return res.json({success: 1, description: 'Order Canceled'});
    });
  });
  //console.log("In cancelOrder");
  //return res.json({success: 1, description: 'Order Canceled'});
}

function retrieveCompletedRestaurantOrder(req, res) {
  var orderId = req.swagger.params.orderId.value;
  orderModel.find({where: {id: orderId}, include: [{
    model: orderedItemsModel,
    as: 'orderedItems',
    include: [{
      model: itemModel,
      as: 'item',
      include: [{
        model: itemTranslationModel,
        as: 'translations'
      }]
    }, {
      model: itemSizeModel,
      as: 'size',
      include: [{
        model: itemSizeTranslationModel,
        as: 'translations'
      }]
    }]
  }]}).then(function (order) {
    return res.json({order: order});

  });
}

function retrieveCompletedRestaurantOrders(req, res) {
  var restaurantId = extractRestaurantId(req);
  return orderModel.findAll({where: {restaurantId: restaurantId}}).then(function (orders) {
    return res.json({success: 1, orders: orders});
  })
}

function retrieveRestaurantOrders(req, res) {
  var restaurantId = extractRestaurantId(req);
  var restaurantKey = 'restaurantOrders:' + restaurantId;
  return new promise(function (fulfill, reject) {
    redlock.lock(restaurantKey + 'lock', ttl).then(function (lock) {
      client.get(restaurantKey, function (err, reply) {
        if (reply == null) {
          res.json({success: 1, orders: []});
        }
        else {
          res.json({success: 1, orders: JSON.parse(reply)});
        }
        unlock(lock);
        fulfill();
      });
    });
  });
}

function removeRestaurantOrderFromCache(restaurantKey, orderId) {
  return new promise(function (fulfill, reject) {
    redlock.lock(restaurantKey + 'lock', ttl).then(function (lock) {
      client.get(restaurantKey, function (err, reply) {
        if (reply) {
          var restaurantOrders = JSON.parse(reply);
          var removed = _.remove(restaurantOrders, function (n) {
            return n.id == orderId;
          });

          if (removed.length == 0) {
            unlock(lock);
            fulfill({
              success: 0,
              description: "Order not removed because it doesn't exist in the restaurants orders"
            });

          }
          client.setex(restaurantKey, 24 * 60 * 60, JSON.stringify(restaurantOrders), function (err, reply) {
            if (reply == "OK") {
              unlock(lock);
              fulfill({success: 1, description: "Order removed from restaurants order", removedOrder: removed[0]});
            }
            else {
              unlock(lock);
              reject({success: 0, description: "Order failed to store, removed would be persisted"});
            }
          });
        }
        else {

          unlock(lock);
          fulfill({
            success: 0,
            description: "Order not removed because it doesn't exist in the restaurants orders"
          });
        }
      });
    });
  });
}

function modifyOrderInCache(restaurantKey, orderId, status) {
  return new promise(function (fulfill, reject) {
    redlock.lock(restaurantKey + 'lock', ttl).then(function (lock) {
      client.get(restaurantKey, function (err, reply) {
        if (reply) {
          var restaurantOrders = JSON.parse(reply);
          var orderToUpdate = _.find(restaurantOrders, function (o) {
            return o.id == orderId;
          });

          orderToUpdate.status = status;

          if (orderToUpdate.length == 0) {
            unlock(lock);
            fulfill({
              success: 0,
              description: "Order not updated because it doesn't exist in the restaurants orders"
            });

          }
          client.setex(restaurantKey, 24 * 60 * 60, JSON.stringify(restaurantOrders), function (err, reply) {
            if (reply == "OK") {
              unlock(lock);
              fulfill({success: 1, description: "Order removed from restaurants order", updatedOrder: orderToUpdate});
            }
            else {
              unlock(lock);
              reject({success: 0, description: "Order failed to update, removed would be persisted"});
            }
          });
        }
        else {

          unlock(lock);
          fulfill({
            success: 0,
            description: "Order not updated because it doesn't exist in the restaurants orders"
          });
        }
      });
    });
  });
}

function removeRestaurantsOrder(req, res) {
  var restaurantId = extractRestaurantId(req);
  var restaurantKey = 'restaurantOrders:' + restaurantId;
  return removeRestaurantOrderFromCache(restaurantKey, req.body.orderId).then(function (result) {
    return res.json({success: result.success, description: result.description});
  });
}


function extractRestaurantId(req) {
  return req.body ? req.body.restaurantId ? req.body.restaurantId : req.swagger.params.restaurantId.value : req.swagger.params.restaurantId.value;
}

function removeAllOrders(req, res) {
  var restaurantId = extractRestaurantId(req);

  return new promise(function (fulfill, reject) {
    client.del('restaurantOrders:' + restaurantId, function (err, reply) {
      if (reply == 1) {
        res.json({success: 1, description: "Orders removed"});
        fulfill();
      }
      else {
        res.json({success: 1, description: "No orders for restaurant exists"});
        fulfill();
      }
    });
  });
}

function closeRedis() {
  client.quit();
}
