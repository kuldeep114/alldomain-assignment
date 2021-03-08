const mongoose = require("mongoose");

const schema = mongoose.Schema({
  postId: Number,
  id: Number,
  name: String,
  email: String,
  body: String
});


module.exports = mongoose.model("Post", schema);
