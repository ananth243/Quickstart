const router = require('express').Router();
const Aggregate = require('../pipelines/average');
const Testament = require('../pipelines/testament');
const Serve = require('../util/serve');

router.get('/', (req, res, next) => {
  Serve(res, 'static', 'index.html');
});

router.get('/favicon.ico', (req, res, next) => {
  Serve(res, 'static', 'favicon.ico');
});

router.get('/ratings', async (req, res, next) => {
  try {
    const ratings = await Aggregate();
    res.json({ ratings });
  } catch (error) {
    next(error);
  }
});

router.get('/testament', async (req, res, next) => {
  try {
    const testaments = await Testament();
    res.json({ testaments });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
