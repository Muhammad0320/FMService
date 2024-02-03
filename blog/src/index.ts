import express, { Request, Response } from "express";
import { randomBytes } from "crypto";

import bodyParser from "body-parser";

const app = express();

console.log("Hi mom");

app.use(bodyParser.json());

export interface Body {
  id: string;
  content: string;
}

interface Posts {
  [key: string]: Body;
}

interface ReqWithBoody extends Request {
  body: { [key: string]: string };
}

const posts: Posts = {};

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post("/posts", (req: ReqWithBoody, res: Response) => {
  const id = randomBytes(4).toString("hex");

  const { content } = req.body;

  posts[id] = {
    id,
    content,
  };

  res.status(201).send(posts[id]);
});

const port = 4000;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});