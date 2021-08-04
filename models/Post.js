const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  text: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updated: { type: Date, default: Date.now },
  comments: [
    {
      text: String,
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("posts", postSchema);
