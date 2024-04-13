const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");
const bcrypt = require("bcrypt");
const studentSchemaMethod = require("./studentSchemaMethod");

//declaring entity schema
const studentSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please enter your name"] },
  uid: {
    type: String,
    required: [true, "Please enter your user id."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "User Id is not valid."],
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
    minLength: [6, "password should be minimum 6 characters."],
  },
  phone: {
    type: String,
    required: [true, "Please enter your contact details."],
    minLength: [10, "phone number should be 10 characters."],
  },
});

studentSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//defining schema methods
studentSchema.statics.login = studentSchemaMethod.login;

module.exports = studentSchema;

// //this middle ware run before save the data
// studentSchema.pre("save", function (next) {
//   console.log("data is going to save",this);
//   next();
// });

// //this middle ware run after save the data
// studentSchema.post("save",function(doc,next){
//   console.log("data saved..",doc);
//   next()
// });
