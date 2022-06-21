require("dotenv").config();

const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const bikeRoutes = require("./bike/bike.routes");
app.use("/tema/bike", bikeRoutes);

// const url = "mongodb://localhost:27017/proiect-api";
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log("Mongo error!", err);
  }
  console.log(chalk.red("Database is ready!"));
  app.listen(process.env.PORT, () => {
    console.log(chalk.bgBlue(`Server started, on port ${process.env.PORT}`));
  });
});
