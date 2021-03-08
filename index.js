const express = require("express");
var cors = require('cors');
const mongoose = require("mongoose");
const routes = require("./routes");
const seed = require("./seed")

mongoose
  .connect("mongodb://localhost:27017/assignment", { useNewUrlParser: true })
  .then(() => {
    var corsOptions = {
      origin: 'http://localhost:8080',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    const app = express(corsOptions);
    app.use(cors());
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use(express.json());
    app.use("/api", routes);
    app.listen(8080, () => {
      console.log("Server has started!");
    });
});