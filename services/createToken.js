const JWT = require("jsonwebtoken");

module.exports.createToken = (id, maxAge) => {
  return JWT.sign({ id }, "suhag", { expiresIn: maxAge });
};
