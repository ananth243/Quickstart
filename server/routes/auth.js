const router = require('express').Router();
const { oauth, createOauthToken } = require('../config/oauth');
const User = require('../models/User');

router.get('/google', async (req, res, next) => {
  let jwt;
  try {
    const token = await oauth(req, next);
    const { name, sub, picture } = token;
    const user = await User.findOne({ googleId: sub });
    if (user) {
      jwt = await createOauthToken(user, next);
    } else {
      const newUser = new User({
        username: name,
        googleId: sub,
        image: picture,
      });
      const result = await newUser.save();
      jwt = await createOauthToken(result);
    }
    res.json({ jwt });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
