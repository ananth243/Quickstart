const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const AuserModel = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = model("admin", AuserModel);
module.exports = Admin;