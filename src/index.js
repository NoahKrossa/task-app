// Dependencies
const express = require("express");
const morgan = require("morgan");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Enable CORS for front development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Routing
app.use("/api", require("./router"));

// Server settings
app.set("port", process.env.PORT || 8080);

// Connecting to dabase
require("./mongodb")();

// Start server
app.listen(app.get("port"), () =>
  console.log(`Server running on port ${app.get("port")}`)
);
