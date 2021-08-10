const router = require("express").Router();
const Admin = require("../models/adminUser");
const { Restaurant } = require("../models/restaurants");
const {
  createAdminToken,
  authCheck,
  verify,
  hashPWD,
} = require("../config/oauth");
const Order = require("../models/order");

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (user) {
      const val = await verify(password, user.password);
      if (val) {
        const jwt = await createAdminToken(user);
        res.json({ jwt });
      } else {
        res.status(401).json({ name: null, password: "Invalid password" });
      }
    } else {
      res.status(401).json({ name: "Invalid username", password: null });
    }
  } catch (err) {
    next(err);
  }
});

router.use(authCheck);

router.get("/orders", async (req, res, next) => {
  try {
    const orders = await Order.find({ delivered: 0 });
    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    for (let i = 0; i < req.body.body.length; i++) {
      let order = req.body.body[i];
      if (order.delivered === 1) {
        Order.findByIdAndUpdate(order._id, { delivered: 1 }, (err, doc) => {
          if (err) console.log(err.message);
        });
      }
    }
    res.json({ message: "Updated successfully" });
  } catch (error) {
    next(error);
  }
});

router.get("/delivered", async (req, res) => {
  const orders = await Order.find({ delivered: 1 }).sort({ updatedAt: -1 });
  res.json({ orders });
});

router.post("/create", async (req, res) => {
  try {
    let { username, password } = req.body;
    password = await hashPWD(password);
    const admin = new Admin({ username, password });
    await admin.save();
    res.json({ message: "User Saved succesfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
