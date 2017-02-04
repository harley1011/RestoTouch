var models = require("../../database/models");

setDatabase(models);

module.exports = {
  completeOrder: order
};

function setDatabase(m) {
  models = m;

}

