require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dynamicChat");

const app = express();
app.use(express.json());
app.use(cors());

const http = require("http").Server(app);

const userRoute = require('./routes/userRoute')

app.use('/', userRoute)

http.listen(8080, () => {
  console.log("server is running");
});
