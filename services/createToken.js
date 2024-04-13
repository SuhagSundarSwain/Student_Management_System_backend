const JWT = require("jsonwebtoken");

module.exports.createToken = (id, maxAge) => {
  return JWT.sign({ id },process.env.SECRET_KEY , { expiresIn: maxAge });
};
