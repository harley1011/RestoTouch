/**
 * Created by Harley on 1/20/2017.
 */
var _ = require('lodash');
var promise = require('promise');
module.exports = {
  nestedUpdate: nestedUpdate,
  nestedUpdateModel: nestedUpdateModel
};



function nestedUpdateModel(newRecord, oldRecord, options) {
  var promises = [];
  for (var prop in newRecord) {
    if (newRecord[prop] instanceof Array) {
      var nestedMeta = _.find(options.include, {'as': prop});
      if (nestedMeta) {
        promises.push((function(nestedMeta) {
          return nestedUpdate(nestedMeta.model, oldRecord, newRecord, prop, nestedMeta.updateColumn, nestedMeta.addIdColumn, oldRecord[nestedMeta.idToAdd]).then(function (result) {
            if (nestedMeta.include) {
              result.forEach(function (oldNestedObject) {
                return nestedUpdateModel(oldNestedObject.newRecord, oldNestedObject, nestedMeta);
              })
            }
          });
        })(nestedMeta));

      }
    }
    else {
      oldRecord[prop] = newRecord[prop];
    }
  }
  return oldRecord.save().then(function (result) {
    return promise.all(promises).then(function () {
      return result;
    })
  });
}


function nestedUpdate(nestedModel, oldRecord, newRecord, nestedRecordName, column, addIdColumn, idToAdd) {
  var oldNestedRecords = oldRecord[nestedRecordName];
  var newNestedRecords = newRecord[nestedRecordName];

  var promiseArray = [];

  var toRemove = _.differenceBy(oldNestedRecords, newNestedRecords, column);
  var toAdd = _.differenceBy(newNestedRecords, oldNestedRecords, column);
  var toUpdate = _.differenceBy(_.differenceBy(newNestedRecords, toAdd, column), toRemove, column);

  toAdd.forEach(function (addRecord) {
    addRecord[addIdColumn] = idToAdd;
    promiseArray.push(nestedModel.create(addRecord));
  });

  toRemove.forEach(function (removeRecord) {
    nestedModel.destroy({where: {id: removeRecord[column]}});
  });

  toUpdate.forEach(function (updateRecord) {
    var oldRecord = _.find(oldNestedRecords, function (record) {
      return record[column] === updateRecord[column]
    });
    for (var prop in updateRecord) {
      if (!(updateRecord[prop] instanceof Array))
        oldRecord[prop] = updateRecord[prop];
    }
    promiseArray.push(oldRecord.save());
  })
  return promise.all(promiseArray).then(function (values) {
    for(var i = 0; i < toAdd.length; i++)
      values[i]['newRecord'] = toAdd[i];
    for(var i = 0; i < toUpdate.length; i++)
      values[i + toAdd.length]['newRecord'] = toUpdate[i];
    return values;
  });
}



// for(var i = 0; i < toAdd.length; i++) {
//   returnRecords.push(values[i]);
//   returnRecords[i]['newRecord'] = toAdd[i];
// }
// for(var i = 0; i < toUpdate.length; i++)
// {
//   var record = _.find(toUpdate, function (record) {
//     return record[column] === toUpdate[column]
//   });
//   record['newRecord'] = toUpdate[i];
//   returnRecords.push(record);
// }
