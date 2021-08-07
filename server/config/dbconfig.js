const mongoose = require("mongoose");

mongoose.connect(
  process.env.dbURI,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  () => {
    console.log("connected to mongodb");
  }
);
