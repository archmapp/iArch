const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: false, unique: false },
  // email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pref: { type: String },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
