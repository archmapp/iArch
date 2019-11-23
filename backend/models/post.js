const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tanto: { type: String, required: false },
  kouji: { type: String, required: false },
  kouki: { type: String, required: false },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
