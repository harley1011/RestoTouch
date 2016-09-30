var models = require("../../database/models");
var restaurantModel = models.getRestaurantModel();

module.exports = {
  getAll: getAll,
  save: save,
  get: get,
  update: update,
  del: del
};

//GET /restaurant
function getAll(req, res, next) {
  restaurantModel.findAll().then(function(restaurants) {
    res.json({ restaurants: restaurants });
  });
}

//POST /restaurant
function save(req, res, next) {
  var restaurant = req.body;
  restaurantModel.create(restaurant).then(function(result) {
    return res.json({success: 1, description: "Restaurant Added"});
  });
}

//GET /restaurant/{id}
function get(req, res, next) {
  /*var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  var movie = db.find(id);
  if(movie) {
      res.json(movie);
  }else {
      res.status(204).send();
  }*/
}

//PUT /restaurant/{id}
function update(req, res, next) {
  /*var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  var movie = req.body;
  if(db.update(id, movie)){
      res.json({success: 1, description: "Movie updated!"});
  }else{
      res.status(204).send();
  }*/
}

//DELETE /restaurant/{id}
function del(req, res, next) {
  /*var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  if(db.remove(id)){
      res.json({success: 1, description: "Movie deleted!"});
  }else{
      res.status(204).send();
  }*/

}
