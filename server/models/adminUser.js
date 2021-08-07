const { Schema, model } = require("mongoose");
const AuserModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = model("admin", AuserModel);
module.exports = Admin;
