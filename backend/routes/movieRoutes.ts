import express from "express";
import { requireAuth } from "../middleware/requireAuth";
const {
  getMovies,
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie,
  searchMovieByTitle,
  searchMovieByImdbId,
} = require("../controllers/movieController");

const router = express.Router();

// require auth for all movie routes
router.use(requireAuth);

// GET all movies
router.get("/", getMovies);

// GET a movie
router.get("/:id", getMovie);

// POST a new Movie
router.post("/", createMovie);

// DELETE a Movie
router.delete("/:id", deleteMovie);

// UPDATE a Movie
router.patch("/:id", updateMovie);

// SEARCH a Movie by Title
router.get("/search/:title", searchMovieByTitle);

// SEARCH a Movie by imdbId
router.get("/searchid/:imdbId", searchMovieByImdbId);

module.exports = router;
