module.exports = {
  register: register
};


function register(req, res) {
  var params = req.swagger.params;
console.log("hkh")
  // this sends back a JSON response which is a single string
  res.json({success: true});
}
