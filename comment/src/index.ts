import express, { Request, Response } from "express";

import { randomBytes } from "crypto";

import bodyParser from "body-parser";

interface ReqBody {
  id: string;
  content: string;
}

const app = express();
app.use(bodyParser.json());

console.log("Hi mom");

interface Comments {
  [key: string]: ReqBody[];
}

const commentsByPostId: Comments = {};

app.get("/posts/:id/comments", (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params?.id as string]);
});

app.post("/posts/:id/comments", (req: Request, res: Response) => {
  const id = randomBytes(4).toString("hex");

  const content: string = req.body?.content;

  const postID: string = req.params?.id;

  const comments = commentsByPostId[postID];

  comments.push({ id, content });

  commentsByPostId[postID] = comments;

  res.status(201).send(comments);
});

const port = 4001;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
