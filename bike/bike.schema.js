const { mongoose } = require("mongoose");

const bikeSchema = mongoose.Schema({
  name: String,
  noOfSpeeds: Number,
  price: Number,
  color: String,
  weight: Number,
  typeOfBreaks: String,
  isActive: Boolean,
});

const bikesCollection = mongoose.model("Bike", bikeSchema);
module.exports = bikesCollection;
