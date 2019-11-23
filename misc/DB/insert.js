var mongoose = require("mongoose");

// make a connection
mongoose.connect("mongodb://localhost:27017/node-angular");

// get reference to database
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");

  // define Schema
  var BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
  });

  // compile schema to model
  var Book = mongoose.model("Book", BookSchema); // books collection
  // var Book = mongoose.model("Book", BookSchema, "bookstore");

  // documents array
  var books = [
    { name: "Mongoose Tutorial", price: 10, quantity: 25 },
    { name: "NodeJS tutorial", price: 15, quantity: 5 },
    { name: "MongoDB Tutorial", price: 20, quantity: 2 }
  ];

  // save multiple documents to the collection referenced by Book Model
  Book.collection.insert(books, function(err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
      console.log(docs);
      return;
    }
  });
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
