const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../server");

require("dotenv").config();

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
  });
});
