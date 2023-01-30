import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      app.listen(port, () => {
        console.log("listening port", port);
      });
    }
  })
  .catch((err) => console.log(err));

module.exports = app;
