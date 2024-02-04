import express, { Request, Response } from "express";

import { randomBytes } from "crypto";

import cors from "cors";

import bodyParser from "body-parser";
import axios from "axios";

interface ReqBody {
  id: string;
  content: string;
  postId?: string;
}

interface ReqEventBus {
  type: string;
  data: ReqBody;
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

console.log("Hi mom");

interface Comments {
  [key: string]: ReqBody[];
}

const commentsByPostId: Comments = {};

app.get("/posts/:id/comments", (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params?.id as string]);
});

app.post(
  "/posts/:id/comments",
  async (req: Request, res: Response): Promise<void> => {
    const id = randomBytes(4).toString("hex");

    const content: string = req.body?.content;

    const postId: string = req.params?.id;

    const comments = commentsByPostId[postId] || [];

    comments.push({ id, content });

    commentsByPostId[postId] = comments;

    res.status(201).send(comments);

    await axios.post("http://localhost:4005", {
      type: "commentCreated",
      data: {
        id,
        content,
        postId,
      },
    });
  }
);

app.post("/event", (req: Request, res: Response) => {
  const result: ReqEventBus = req.body;

  console.log("Event Recieved", result.type);

  res.send({});
});

const port = 4001;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
