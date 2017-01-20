/**
 * Created by Harley on 1/20/2017.
 */
var _ = require('lodash');

module.exports = {
  nestedUpdate: nestedUpdate
};

function nestedUpdate(nestedModel, oldRecord, newRecord, nestedRecordName, column, addIdColumn, idToAdd) {
  var oldNestedRecords = oldRecord[nestedRecordName];
  var newNestedRecords = newRecord[nestedRecordName];

  var toRemove = _.differenceBy(oldNestedRecords, newNestedRecords, column);
  var toAdd = _.differenceBy(newNestedRecords, oldNestedRecords, column);
  var toUpdate = _.differenceBy(toAdd, toRemove, column);

  toAdd.forEach(function(addRecord) {
    addRecord[addIdColumn] = idToAdd;
  });

  nestedModel.bulkCreate(toAdd);

  toRemove.forEach(function(removeRecord) {
    nestedModel.destroy({where: {id: removeRecord.id}});
  });

  toUpdate.forEach( function (updateRecord) {
    var oldRecord = _.find(oldNestedRecords, {'id': updateRecord.id})
    for (var prop in updateRecord) {
      oldRecord[prop] = updateRecord[prop];
    }
    oldRecord.save();
  });
}
