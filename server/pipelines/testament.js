// The averge experience
const User = require('../models/User');

async function Testament() {
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
        _id: '$username',
        image: {
          $first: '$image',
        },
        experience: {
          $first: '$experience',
        },
        food: {
          $first: '$food',
        },
        delivery: {
          $first: '$delivery',
        },
        comments: {
          $first: '$comments',
        },
      },
    },
  ]);
  return aggregate;
}

module.exports = Testament;
