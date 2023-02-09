import { Request, Response } from "express";
import mongoose from "mongoose";
import { IMovie } from "../interfaces/movieInterface";

const Movie = require("../models/movieModel");

// get all movies
const getMovies = async (req: Request, res: Response) => {
  const movies: IMovie[] = await Movie.find({}).sort({ createdAt: -1 });

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
  const { title, release, type, poster, review } = req.body;

  const emptyFields: string[] = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!release) {
    emptyFields.push("release");
  }
  if (!type) {
    emptyFields.push("type");
  }
  if (!poster) {
    emptyFields.push("poster");
  }
  if (!review) {
    emptyFields.push("review");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const movie: IMovie = await Movie.create({
      title,
      release,
      type,
      poster,
      review,
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

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie,
};
