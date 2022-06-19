const { default: mongoose } = require("mongoose");

const bikeSchema = mongoose.Schema({
  name: String,
  noOfSpeeds: Number,
  price: Number,
  color: String,
  weight: Number,
  typeOfBreaks: String,
  isActive: Boolean
});

const bikeCollection = mongoose.model("Bike", bikeSchema);
module.exports = bikeCollection;


// name, noOfSpeeds, price, color, weight, typeOfBreaks