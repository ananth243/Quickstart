const mongoose = require('mongoose');

mongoose.connect(
  process.env.dbURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('connected to mongodb');
  }
);
