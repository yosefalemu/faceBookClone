const mongoose = require("mongoose");

const connectDb = (uri) => {
  return mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to DB...");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectDb;
