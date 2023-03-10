import supertest from "supertest";
const app = require("../server");
const request = supertest(app);

const {
  getMovies,
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movieController");

describe("Testing CRUD", () => {
  // POST a new movie
  it("should create a new movie and then delete", async () => {
    const newMovie = {
      title: "Scary Movie",
      release: "2001",
      type: "Movie",
      poster: "img.img",
      review: "Good",
    };
    const resCreate = await request.post("/api/movies").send(newMovie);

    console.log(resCreate.body);

    expect(resCreate.statusCode).toBe(200);
    expect(resCreate.body.title).toBe("Scary Movie");

    const resDelete = await request.delete(`/api/movies/${resCreate.body._id}`);

    expect(resDelete.statusCode).toBe(200);
    expect(resDelete.body.title).toBe("Scary Movie");
  });

  // GET all movies
  it("should return all movies", async () => {
    const res = await request.get("/api/movies");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // GET a movie
  it("should return the one movie", async () => {
    const res = await request.get("/api/movies/63e108fad10c33594eb9c1ff");

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Kot v sapogah 5");
  });

  // UPDATE the current movie
  it("should update the current movie", async () => {
    const updateMovieTitle = {
      title: "Scary Movie 2",
      release: "2001",
      type: "Movie",
      poster: "img.img",
      review: "Good",
    };
    const res = await request
      .patch("/api/movies/63e108c0cae7e79808ac3402")
      .send(updateMovieTitle);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Scary Movie 2");
  });

  // DELETE the current movie
  //   it("should delete the current movie", async () => {
  //     const res = await request.delete(`/api/movies/${id}`);

  //     expect(res.statusCode).toBe(200);
  //     expect(res.body.title).toBe("Scary Movie 2");
  //   });
});
