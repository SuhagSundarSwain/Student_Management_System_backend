const jwt = require("jsonwebtoken");
const Student = require("../models/student");

const authenticated = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodeData) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodeData);
        next();
      }
    });
  } else {
    res.status(401).json({ errors: "session expired.Please login again." });
  }
};

const checkLoggedInStatus = (req, res) => {
  let loggedInStatus = false;
  var token = req.cookies.jwt;
  if (token) {
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      loggedInStatus = true;
    } catch (err) {
      console.error(err);
    }
  } /*else {
    res.locals.student = null;
  }*/
  res.send({ loggedInStatus });
};

module.exports = { authenticated, checkLoggedInStatus };
