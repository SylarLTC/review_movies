import express from "express";
const {
  getMovies,
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movieController");

const router = express.Router();

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

module.exports = router;
