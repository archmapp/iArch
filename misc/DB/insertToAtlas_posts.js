// iArch>node misc\DB\insertToAtlas_posts.js


// collection自体を削除した方がよい場合が多い。
// また、default 値は new のタイミングでオブジェクトに積まれます。

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
  var PostSchema = mongoose.Schema({
    title: { type: String },
    content: { type: String },
    tanto: { type: String },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

  // compile schema to model
  var Post = mongoose.model("Post", PostSchema); // books collection

  var posts_DATA = [
    {
      title: "First Post",
      content: "This is the first post's content",
      tanto: "吉村",
      date: new Date()
    },
    {
      title: "Second Post",
      content: "This is the second post's content",
      tanto: "長田",
      date: new Date()
    },
    {
      title: "Third Post",
      content: "This is the third post's content",
      tanto: "藤川",
      date: new Date()
    }
  ];

  // Post.collection.insert(posts_DATA, function(err, posts) {
  Post.collection.insertMany(posts_DATA, function(err, posts) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
      console.log(posts);
    }
  });
});
