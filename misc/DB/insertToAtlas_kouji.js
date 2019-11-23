// iArch>node misc\DB\insertToAtlas_kouji.js

const bcrypt = require("bcryptjs");
var mongoose = require("mongoose");

// make a connection
mongoose
  .connect(
    "mongodb+srv://ty7575au:ty7575aa" +
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

// get reference to database
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");

  // define Schema
  var UserSchema = mongoose.Schema({
    model: { type: String },
    name: { type: String, unique: true },
    yoteikakaku: { type: Number },
    kouki: { type: Number },
    pref: { type: String },
    date: {
      type: Date,
      default: Date.now
    }
  });

  // compile schema to model
  var User = mongoose.model("User", UserSchema); // books collection
  // var Book = mongoose.model("Book", BookSchema, "bookstore");

  var users = [
    {
      email: "ty7575au@yahoo.co.jp",
      name: "ty7575au",
      password: "ty7575aa",
      pref: "福岡県"
    },
    {
      email: "archmapp@i.softbank.jp",
      name: "archmapp",
      password: "ty7575aa",
      pref: "福岡県"
    },
    {
      email: "tharch77@gmail.com",
      name: "tharch77",
      password: "ty7575aa",
      pref: "福岡県"
    },
    { email: "test@test.com", name: "test", password: "ttest", pref: "北海道" },
    {
      email: "test@gmail.com",
      name: "ttest",
      password: "ttest",
      pref: "北海道"
    }
  ];

  users.map(user => {
    bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash;
      console.log("TCL: user.password", user.password);
    });
  });
  setTimeout(() => {
    console.log(users);
    User.collection.insert(users, function(err, users) {
      if (err) {
        return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
  }, 2000);
  // console.log(users);

  // save multiple documents to the collection referenced by Book Model
  // User.collection.insert(users, function(err, users) {
  //   if (err) {
  //     return console.error(err);
  //   } else {
  //     console.log("Multiple documents inserted to Collection");
  //   }
  // });
});

// mongo "mongodb://localhost:27017/node-angular"
//   > use node-angular
//   switched to db node-angular
//   > show collections
//   bookstore
//   > db.bookstore.find()
//   { "_id" : ObjectId("5d9724e09298a03570dbcfa4"), "name" : "Mongoose Tutorial", "price" : 10, "quantity" : 25 }
//   { "_id" : ObjectId("5d9724e09298a03570dbcfa5"), "name" : "NodeJS tutorial", "price" : 15, "quantity" : 5 }
//   { "_id" : ObjectId("5d9724e09298a03570dbcfa6"), "name" : "MongoDB Tutorial", "price" : 20, "quantity" : 2 }
//   >
