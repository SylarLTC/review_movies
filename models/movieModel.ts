import mongoose from "mongoose";
import { IMovie } from "../interfaces/movieInterface";

const Schema = mongoose.Schema;

const movieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
    },
    release: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model<IMovie>("Movie", movieSchema);
