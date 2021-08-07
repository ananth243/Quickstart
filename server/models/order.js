const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    ref: "menu",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const orderModel = new Schema(
  {
    delivered: {
      //1 if delivered
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      ref: "user",
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rest_name: {
      type: String,
      ref: "restaurant",
      required: true,
    },
    items: [itemSchema],
  },
  { timestamps: true }
);

const Order = model("order", orderModel);
module.exports = Order;
