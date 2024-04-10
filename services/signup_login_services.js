const Student = require("../models/student");
const { createToken } = require("./createToken");

const handalError = (err) => {
  let errors = {};
  if (err.message.includes("student validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  } else if (err.code == 11000) {
    errors["uid"] = "user id is already registered.";
  } else if (err.message.includes("user")) {
    errors["uid"] = "Invalid user";
  } else if (err.message.includes("password")) {
    errors["password"] = "Invalid password";
  }
  return errors;
};

const maxAge = 24 * 60 * 60;
module.exports.signUp = async (req, res) => {
  try {
    const studentSignupDetails = req.body;
    const student = await Student.create(studentSignupDetails);
    const token = createToken(student._id, maxAge);

    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(201).json({ student: student._id });
  } catch (err) {
    let errors = handalError(err);
    res.status(400).json({ errors });
  }
};

module.exports.logIn = async (req, res) => {
  try {
    const { uid, password } = req.body;
    const user = await Student.login(uid, password);
    const token = createToken(user._id, maxAge);
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,

      // sameSite: "none",
      // secure: true,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handalError(err);
    res.status(400).json({ errors });
  }
};
