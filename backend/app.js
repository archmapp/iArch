const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://ty7575au:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-8mh34.mongodb.net/node-angular?retryWrites=true&w=majority",
    // "mongodb+srv://auty:auty@cluster0-8mh34.mongodb.net/node-angular?retryWrites=true&w=majority",
    // archmapp:ty7575aa$

    // "mongodb+srv://ty7575au:ty7575aa@cluster0-8mh34.mongodb.net/node-angular?retryWrites=true&w=majority",
    // "mongodb+srv://auty:auty@cluster0-8mh34.mongodb.net/node-angular?retryWrites=true&w=majority",
    // archmapp:ty7575aa$
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use((req, res, next) => {
  console.log("ending app ... ", req);
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});


module.exports = app;
