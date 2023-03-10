import mongoose from "mongoose";

// import supertest from "supertest";
// const app = require("../server");
// const request = supertest(app);

const { connectDB, dropDB, dropCollections } = require("./setuptestdb");
const Movie = require("../models/movieModel");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await dropDB();
});

afterEach(async () => {
  await dropCollections();
});

describe("Movie Model", () => {
  it("should create a movie item successfully", async () => {
    let validMovie = {
      title: "Scary Movie",
      release: "2001",
      type: "Movie",
      poster: "img.img",
      review: "Good",
    };
    const newMovie = await Movie(validMovie);
    await newMovie.save();
    expect(newMovie._id).toBeDefined();
    expect(newMovie.title).toBe(validMovie.title);
    expect(newMovie.release).toBe(validMovie.release);
    expect(newMovie.type).toBe(validMovie.type);
    expect(newMovie.poster).toBe(validMovie.poster);
    expect(newMovie.review).toBe("Good");
  });
});
