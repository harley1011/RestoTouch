var crypto = require('crypto');

module.exports = {
  saltHashPassword : saltHashPassword,
  comparePassword: comparePassword
}

function comparePassword(password, salt, hashPassword) {
  password = sha512(password, salt);
  return password == hashPassword;
}

function sha512(password, salt){
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt:salt,
    passwordHash:value
  };
};

function genRandomString(length){
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

function saltHashPassword(userpassword) {
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  var passwordData = sha512(userpassword, salt);
  return passwordData;

}
