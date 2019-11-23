// collection自体を削除した方がよい場合が多い。
// また、default 値は new のタイミングでオブジェクトに積まれます。

const bcrypt = require("bcryptjs");
// var mongoose = require("mongoose");

// // make a connection
// mongoose
//   .connect(
//     "mongodb+srv://ty7575au:ty7575aa" +
//       "@cluster0-8mh34.mongodb.net/node-angular?retryWrites=true&w=majority",
//     // "mongodb+srv://auty:auty@cluster0-8mh34.mongodb.net/node-angular?retryWrites=true&w=majority",
//     // archmapp:ty7575aa$

//     // "mongodb+srv://ty7575au:ty7575aa@cluster0-8mh34.mongodb.net/node-angular?retryWrites=true&w=majority",
//     // "mongodb+srv://auty:auty@cluster0-8mh34.mongodb.net/node-angular?retryWrites=true&w=majority",
//     // archmapp:ty7575aa$
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

// // get reference to database
// var db = mongoose.connection;

let p0 = "abc";
bcrypt.hash(p0, 10).then(hash => {
  console.log(hash);
  // process.exit(1);
});
bcrypt.hash(p0, 10).then(hash => {
  console.log(hash);
  process.exit(1);
});
