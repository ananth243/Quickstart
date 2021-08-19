const { Schema, model } = require('mongoose');
const { hashPWD } = require('../config/oauth');

const AuserModel = new Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true,
  },
  password: {
    type: String,
    minLength: [8, 'Minimum password length should be 8 characters'],
    required: [true, 'Password required'],
  },
});

AuserModel.pre('save', async function hash(next) {
  this.password = await hashPWD(this.password);
  next();
});

const Admin = model('admin', AuserModel);
module.exports = Admin;
