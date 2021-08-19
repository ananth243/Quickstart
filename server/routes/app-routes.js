const router = require('express').Router();
const { userInfo, appAuthCheck } = require('../config/oauth');
const { Restaurant } = require('../models/restaurants');
const Order = require('../models/order');
const User = require('../models/User');
const Serve = require('../util/serve');

router.get('/', (req, res) => {
  Serve(res, 'static', 'app.html');
});

router.use(appAuthCheck);

router.get('/restaurants', async (req, res, next) => {
  try {
    const data = await Restaurant.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/order/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Restaurant.findOne({ _id: id });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/order/:id', async (req, res, next) => {
  try {
    const { orderArray, user, address, rest_name, total, _id } = req.body.data;
    const newOrder = new Order({
      user_id: user,
      address,
      rest_name,
      items: orderArray,
      total,
      orderId: _id,
    });
    await newOrder.save();
    res.json({ message: 'Order saved successfully' });
  } catch (err) {
    next(err);
  }
});

router.get('/orders', async (req, res, next) => {
  const token = req.headers.jwt;
  try {
    const { id } = await userInfo(token, next);
    const orders = await Order.find({ orderId: id, delivered: 0 });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
});

router.get('/history', async (req, res, next) => {
  try {
    const { id } = await userInfo(req.headers.jwt, next);
    const orders = await Order.find({ orderId: id, delivered: 1 }).sort({
      updatedAt: -1,
    });
    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

router.delete('/delete/:ID', async (req, res, next) => {
  try {
    const { id } = await userInfo(req.headers.jwt, next);
    const { ID } = req.params;
    const order = await Order.findById(ID);
    if (order.orderId === id && order.delivered === 0) {
      await Order.findByIdAndDelete(ID);
      res.json({ message: 'The order was deleted' });
    } else {
      throw Error('You are not authorized to delete this order');
    }
  } catch (err) {
    next(err);
  }
});

router.post('/rating', async (req, res, next) => {
  try {
    const { rating, comment } = req.body.body;
    const { id } = await userInfo(req.body.headers.jwt, next);
    const user = await User.findByIdAndUpdate(id, {
      experience: rating[0],
      food: rating[1],
      delivery: rating[2],
      comments: comment,
    });
    await user.save();
    res.json({ message: 'Rating submitted successfully' });
  } catch (error) {
    error.status(400);
    next(error);
  }
});

module.exports = router;
