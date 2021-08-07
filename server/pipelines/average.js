//The averge experience
const User = require("../models/User");

async function Aggregate() {
  const aggregate = await User.aggregate([
    {
      $match: {
        experience: {
          $gte: 1,
        },
        food: {
          $gte: 1,
        },
        delivery: {
          $gte: 1,
        },
      },
    },
    {
      $group: {
        _id: null,
        avgExperience: {
          $avg: "$experience",
        },
        avgFood: {
          $avg: "$food",
        },
        avgDelivery: {
          $avg: "$delivery",
        },
      },
    },
  ]);
  delete aggregate[0]._id;
  return aggregate;
}

module.exports = Aggregate;
