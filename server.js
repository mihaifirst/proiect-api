// 1. Creeaza server
// const express = require("express"); // Importa libraria express , o vom folosi pentru API-uri
// const PORT = 3333; // scrie o constanta unde sa pastrezi portul
// const app = express(); // Invoci libraria express
// app.listen(PORT, function () { // PORNESTE SERVERUL

// }

// 2. Conecteaza-te la baza de date
// const mongoose = require("mongoose"); // Importi libraria mongoose
// mongoose.Promise = global.Promise; // setezi promise system pe mongoose (NU VA EXPLIC)
// const url = "mongodb://localhost:27017/cavelizer"; // URL-ul trebuie sa fie de forma asta
// mongoose.connect(url, function (err) { // Conecteaza-te la baza de date
//   if (err) {
    //     console.log("Mongo error!", err);
    //   }
    // })
    const chalk = require("chalk");
    const express = require("express");
    const PORT = 3333;
    const app = express(); 
    const { request } = require("express");
    const { StatusCodes } = require("http-status-codes");
    const mongoose = require("mongoose");
    app.use(express.json({ limit: "50mb" }));
    mongoose.Promise = global.Promise;
    const url = "mongodb://localhost:27017/proiect-api"; 
    mongoose.connect(url, function (err) {
        if (err) {
          console.log("Mongo error!", err);
        }
      
        console.log(chalk.red("Database is ready!"));
      
        app.listen(PORT, function () {
          console.log(
            chalk.bgBlue("Server started: "),
            chalk.blue(`Listening to port ${PORT}`)
          );
        });
      });

// name, noOfSpeeds, price, color, weight, typeOfBreaks

app.post("/tema/bike", async function (request, response) {
        /* CE PRIMESC DE LA INSOMNIA */
        const { name, noOfSpeeds, price, color, weight, typeOfBreaks, isActive } = request.body;
      
        /* Importam colectia pe care vrem sa o manipulam / accesam */
        const bikeCollection = require("./bike/bike.schema");
      
        /* VOM ADAUGA IN BAZA DE DATE ACEST USER */
      
        const newBike = await new bikeCollection({
          name,
          noOfSpeeds,
          price,
          color,
          weight,
          typeOfBreaks,
          isActive
        }).save();
      
        console.log(newBike);
      
        /* CE II DAU LA INSOMNIA */
        response.writeHead(StatusCodes.OK);
        response.write(JSON.stringify(newBike));
        response.end();
      });
    
      const bikeCollection = require("./bike/bike.schema.js");

app.get("/tema/bike", async function (request, response) {
        // const bikeCollection = require("./bike/bike.schema.js");

        const bikes = await bikeCollection.find();

  response.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });
  response.write(JSON.stringify(bikes));
  response.end();
});
app.get("/tema/bike/:id", async function (request, response) {
    const id = request.params.id;

    const bikes = await bikeCollection.findById(id);

response.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });
response.write(JSON.stringify(bikes));
response.end();
});

app.delete("/tema/bike/:id", async function (request, response) {
    const id = request.params.id;

  await bikeCollection.findByIdAndRemove(id);

  response.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });
  response.end();
});


app.patch("/tema/bike/:id/toggleIsActive", async function (request, response) {
    const id = request.params.id;
    const bikeFound = await bikeCollection.findById(id);

  await bikeCollection.findByIdAndUpdate(id, {
    isActive: !bikeFound.isActive
  });

  response.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });
  response.end();
});

// {
// 	"name" : "Alex",
// 	"noOfSpeeds" : 34,
// 	"price": 12,
//   "color": "rosie",
//   "weight": 250,
//   "typeOfBreaks": "bengoase"
// }