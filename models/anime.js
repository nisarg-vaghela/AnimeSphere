const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AnimeSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "review" }],
  title: {
    type: String,
  },
  mal_id: {
    type: Number,
  },
  url: {
    type: String,
  },
  image_url: {
    type: String,
  },
  trailer_url: {
    type: String,
  },
  episodes: {
    type: String,
  },
  studios: {
    type: Array,
    default: [],
  },
  genres: {
    type: Array,
    default: [],
  },
  rating: {
    type: String,
  },
  synopsis: {
    type: String,
  },
  score: {
    type: Number,
    default: 5,
  },
});

const Anime = mongoose.model("anime", AnimeSchema);

module.exports = Anime;
