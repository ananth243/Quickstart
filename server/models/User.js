const { Schema, model } = require("mongoose");

const userModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    default: 0,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  food: {
    type: Number,
    default: 0,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  delivery: {
    type: Number,
    default: 0,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  comments: {
    type: String,
    default: null,
  },
});

const User = model("user", userModel);
module.exports = User;
