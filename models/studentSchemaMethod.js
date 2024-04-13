const bcrypt = require("bcrypt");
const studentSchema = require("./studentSchema");

module.exports.login = async function (uid, password) {
  const user = await this.findOne({ uid });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Invalid password");
  }
  throw Error("Invalid user");
};
