import express, { Request, Response } from "express";
import { randomBytes } from "crypto";

import bodyParser from "body-parser";

const app = express();

console.log("Hi mom");

app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post("/posts", () => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;
});
