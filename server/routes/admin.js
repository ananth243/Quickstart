const router = require('express').Router();
const Admin = require('../models/adminUser');
const { createAdminToken, authCheck, verify } = require('../config/oauth');
const Order = require('../models/order');

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (user) {
      const val = await verify(password, user.password);
      if (val) {
        const jwt = await createAdminToken(user, next);
        res.json({ jwt });
      } else {
        res.status(401).json({ name: null, password: 'Invalid password' });
      }
    } else {
      res.status(401).json({ name: 'Invalid username', password: null });
    }
  } catch (err) {
    next(err);
  }
});

router.use(authCheck);

router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Order.find({ delivered: 0 });
    res.json({ orders });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.post('/update', async (req, res, next) => {
  try {
    for (let i = 0; i < req.body.body.length; i += 1) {
      const order = req.body.body[i];
      if (order.delivered === 1) {
        Order.findByIdAndUpdate(order._id, { delivered: 1 }, (err, doc) => {
          if (err) {
            next(err);
          } else {
            console.log(doc);
          }
        });
      }
    }
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get('/delivered', async (req, res, next) => {
  try {
    const orders = await Order.find({ delivered: 1 }).sort({ updatedAt: -1 });
    res.json({ orders });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    res.json({ message: 'User Saved succesfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
