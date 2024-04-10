const jwt = require("jsonwebtoken");
const Student = require("../models/student");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "suhag", (err, decodeData) => {
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

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodeData = jwt.verify(token, "suhag");
      let student = Student.findById(decodeData);
      res.locals.student = student;
    } catch (err) {
      res.locals.student = null;
    }
  } else {
    res.locals.student = null;
  }
  next();
};

module.exports = { requireAuth, checkUser };
