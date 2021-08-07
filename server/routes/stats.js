const router = require("express").Router();
const Aggregate = require("../pipelines/average");
const Testament = require("../pipelines/testament");

router.get("/ratings", async (req, res) => {
  const ratings = await Aggregate();
  res.json({ ratings });
});

router.get("/testament", async (req, res, next) => {
  try {
    const testaments = await Testament();
    res.json({ testaments });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
