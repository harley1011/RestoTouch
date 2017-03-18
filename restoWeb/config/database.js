/*
Connection parameters to connect to the dev DB. If you have a local postgres db and want to use that instead then
simply change the variable belows to your dbs info
*/

var host = "restotouch.ctjlsabjnpsa.us-east-1.rds.amazonaws.com";
var port = "5432";
var database = "testDb1";
var dbtype = "postgres";
var user = "restotouch";
var password = "soen490resto";

module.exports = {
  'url' : dbtype + "://" + user + ":" + password + "@" + host + ":" + port + "/" + database
}
