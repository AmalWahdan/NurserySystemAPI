const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const teacherRoute = require("./Routes/teacherRoute");
const childRoute = require("./Routes/childRouter");
const classRoute = require("./Routes/classRouter");
const authenticationRoute = require("./Routes/athenticationRoute");
const authorization = require("./core/Authroization/authorization");
const server = express();
let port = process.env.PORT || 8080;

mongoose.get("strictQuery", true);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("conenct");
    server.listen(port, () => {});
  })
  .catch((error) => {
    console.log("Connection Error" + error);
  });

server.use(morgan("endPoint  :url :method :response-time ms"));
server.use(express.json());

server.use(authenticationRoute);
server.use(authorization);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);
server.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found" });
});

server.use((error, request, response, next) => {
  let status = error.status || 500;
  response.status(status).json({ message: error + "" });
});
