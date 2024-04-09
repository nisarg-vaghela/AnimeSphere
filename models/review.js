const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    mal_id: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user_rating: {
      type: Number,
      default: null,
    },
    comment: {
      type: String,
      default: "No comment",
    },
  },
  // schema options: Don't forget this option
  // if you declare foreign keys for this schema afterwards.
  {
    toObject: { virtuals: true },
    // use if your results might be retrieved as JSON
    // see http://stackoverflow.com/q/13133911/488666
    toJSON: { virtuals: true },
  }
);

ReviewSchema.virtual("anime", {
  //review.anime will be populated
  ref: "anime", // The model to use
  localField: "mal_id", // what to use in ReviewSchema
  foreignField: "mal_id", // what to use in AnimeSchema
  justOne: true, // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  // options: { select: 'image_url title' } // Query options, see http://bit.ly/mongoose-query-options
});

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;
