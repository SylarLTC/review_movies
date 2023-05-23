import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const movieRoute = require("./routes/movieRoutes");
const userRoute = require("./routes/userRoutes");

dotenv.config();

const app: Application = express();
const port: string | undefined = process.env.PORT;

// middleware
app.use(express.json());

// routes
app.use("/api/movies", movieRoute);
app.use("/api/user", userRoute);

// connect to DB
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      app.listen(port, (): void => {
        console.log("listening port", port);
      });
    }
  })
  .catch((err) => {
    if (err instanceof Error) {
      console.log(`Error occured: (${err.message})`);
    }
  });

module.exports = app;
