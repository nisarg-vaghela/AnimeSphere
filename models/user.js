const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://i.pinimg.com/736x/d0/11/dc/d011dc9df86ed7d17ab14a836d752b73.jpg",
  },
  about: {
    type: String,
    default: "Otaku Sama",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  watched: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
