require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongo = async (req, res, next) => {
  try {
    mongoose.set("strictQuery", true);

    const dbState = mongoose.connection.readyState;
    if (dbState !== 1) {
      mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB ");
    } else console.log("Re-using existing DB connection");

    return next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = connectToMongo;
