const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  photo: String,
  email: String,
  favoritePlayers: [String],
});

mongoose.model("users", userSchema);
