const { Schema, model } = require('mongoose');

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sort: {
    // 0 is vegetarian, 1 is non-vegetarian
    type: Number,
    default: 0,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const restModel = new Schema({
  rest_name: {
    type: String,
    required: true,
  },
  details: {
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  menu: [menuSchema],
});

const Restaurant = model('restaurant', restModel);
const Menu = model('menu', menuSchema);

module.exports = { Menu, Restaurant };
