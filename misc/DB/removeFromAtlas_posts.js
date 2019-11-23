var mongoose = require("mongoose");

// make a connection
mongoose
  .connect(
    "mongodb+srv://ty7575au:ty7575aa" +
      "@cluster0-8mh34.mongodb.net/node-angular?retryWrites=true&w=majority",
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
  var PostSchema = mongoose.Schema({
    email: { type: String },
    name: { type: String, unique: true },
    password: { type: String, required: true },
    pref: { type: String },
    date: {
      type: Date,
      default: Date.now
    }
  });

  // compile schema to model
  var Post = mongoose.model("Post", PostSchema);

  Post.remove({}, function(err, users) {
    if (err) {
      return console.error(err);
    } else {
      console.log(users);
    }
  });
});
