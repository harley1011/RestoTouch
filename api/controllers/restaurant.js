var getUserModel = require('../../database/models');

module.exports = {
  getAll: getAll,
  save: save,
  get: get,
  update: update,
  del: del
};

var test = {
  id: 1,
  name: 'McDonald',
  description: 'Fast food restaurant',
  address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6'
}

//GET /restaurant
function getAll(req, res, next) {
  //var userModel = getUserModel();
  //console.log('LOLOLOLOL');
  res.json({ restaurants: [test] });
  //res.json({ movies: db.find()});
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
