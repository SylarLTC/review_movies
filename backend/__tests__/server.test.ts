import supertest from "supertest";
const app = require("../server");
const request = supertest(app);

describe("Test the root path", () => {
  it("It should response the GET method", async () => {
    const res = await request.get("/api/movies");

    expect(res.statusCode).toBe(200);
  });
});
