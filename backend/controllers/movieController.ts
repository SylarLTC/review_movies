import { Request, Response } from "express";
import mongoose from "mongoose";
import { IMovie, IMovieDb } from "../interfaces/movieInterface";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const Movie = require("../models/movieModel");

// get all movies
const getMovies = async (req: Request, res: Response) => {
  const user_id = req.user._id;

  const movies: IMovie[] = await Movie.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(movies);
};

// get one movie
const getMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such movie!" });
  }

  const movie: IMovie = await Movie.findById(id);

  if (!movie) {
    return res.status(404).json({ error: "No such movie!" });
  }

  res.status(200).json(movie);
};

// create a new movie
const createMovie = async (req: Request, res: Response) => {
  const { title, release, type, poster, review, imdbID } = req.body;

  // const emptyFields: string[] = [];

  // if (!title) {
  //   emptyFields.push("title");
  // }
  // if (!release) {
  //   emptyFields.push("release");
  // }
  // if (!type) {
  //   emptyFields.push("type");
  // }
  // if (!poster) {
  //   emptyFields.push("poster");
  // }
  // if (!imdbID) {
  //   emptyFields.push("imdbID");
  // }
  // if (!review) {
  //   emptyFields.push("review");
  // }
  // if (emptyFields.length > 0) {
  //   return res
  //     .status(400)
  //     .json({ error: "Please fill in all the fields", emptyFields });
  // }

  try {
    const user_id = req.user._id;
    const movie: IMovie = await Movie.create({
      title,
      release,
      type,
      poster,
      review,
      imdbID,
      user_id,
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// DELETE a movie
const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such movie!" });
  }

  const movie: IMovie = await Movie.findByIdAndDelete(id);

  if (!movie) {
    res.status(404).json({ error: "No such movie!" });
  }

  res.status(200).json(movie);
};

// UPDATE a movie
const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such movie!" });
  }

  const movie: IMovie = await Movie.findByIdAndUpdate(id, {
    ...req.body,
  });

  if (!movie) {
    res.status(404).json("No such movie!");
  }

  res.status(200).json(movie);
};

// SEARCH a movie by title
const searchMovieByTitle = async (req: Request, res: Response) => {
  const options = {
    method: "GET",
    url: process.env.MOVIEDB_URI,
    params: { s: req.params.title, r: "json", page: "1" },
    headers: {
      "X-RapidAPI-Key": process.env.MOVIE_API_KEY,
      "X-RapidAPI-Host": process.env.MOVIE_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);

    if (!response.data.Search) {
      return res.status(500).json("No such movie!");
    } else {
      const resMovie: string[] | string = response.data.Search.map(
        (movie: IMovieDb) => {
          return {
            title: movie.Title,
            release: movie.Year,
            type: movie.Type,
            poster: movie.Poster,
            imdbID: movie.imdbID,
          };
        }
      );
      res.status(200).json(resMovie);
    }
  } catch (error) {
    console.log(error);
  }
};

// SEARCH a movie by imdbID
const searchMovieByImdbId = async (req: Request, res: Response) => {
  const options = {
    method: "GET",
    url: process.env.MOVIEDB_URI,
    params: { i: req.params.imdbId, r: "json" },
    headers: {
      "X-RapidAPI-Key": process.env.MOVIE_API_KEY,
      "X-RapidAPI-Host": process.env.MOVIE_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);

    if (!response.data.imdbID) {
      console.log(req.params.imdbId);
      return res.status(500).json("No such movie!");
    } else {
      const resMovie: IMovieDb = {
        Title: response.data.Title,
        Year: response.data.Year,
        Type: response.data.Type,
        Poster: response.data.Poster,
        imdbID: response.data.imdbID,
      };
      res.status(200).json(resMovie);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie,
  searchMovieByTitle,
  searchMovieByImdbId,
};
