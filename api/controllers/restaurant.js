var getUserModel = require('../../database/models');

module.exports = {
  getAll: getAll,
  save: save,
  get: get,
  update: update,
  del: del
};

var restaurants = [
  {
    id: 1,
    name: 'McDonald',
    description: 'Fast food restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 2,
    name: 'Yuan Vegetarien',
    description: 'Asian vegan restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 3,
    name: 'Copper Branch',
    description: 'Vegan fast food restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 4,
    name: 'Burger King',
    description: 'Fast food restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 5,
    name: 'St-Hubert',
    description: 'BBQ restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 6,
    name: 'Cage Aux Sport',
    description: 'Sports Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 7,
    name: 'Paccini',
    description: 'Italian Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 8,
    name: 'Villa Massimo',
    description: 'Italian Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 9,
    name: 'Sushi Shop',
    description: 'Sushi Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 10,
    name: 'Subway',
    description: 'Sandwich fast food Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 11,
    name: 'KFC',
    description: 'Chicken fast food Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 12,
    name: 'Restaurant 1',
    description: 'Restaurant Description',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 13,
    name: 'Restaurant 2',
    description: 'Restaurant Description',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 14,
    name: 'Restaurant 3',
    description: 'Restaurant Description',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 15,
    name: 'Restaurant 4',
    description: 'Restaurant Description',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }, {
    id: 16,
    name: 'Restaurant 5',
    description: 'Restaurant Description',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'},
      {open: '12:00 pm', close: '12:00pm'}
    ]
  }
];

//GET /restaurant
function getAll(req, res, next) {
  res.json({ restaurants: restaurants });
}

//POST /restaurant
function save(req, res, next) {
  //res.json({success: db.save(req.body), description: "Movie added to the list!"});
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
