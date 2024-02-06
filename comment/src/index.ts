import express, { Request, Response } from "express";

import { randomBytes } from "crypto";

import cors from "cors";

import bodyParser from "body-parser";
import axios from "axios";

interface ReqBody {
  id: string;
  content: string;
  postId: string;
  status: string;
}

// postId?: string;

interface ReqEventBus {
  type: string;
  data: ReqBody;
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

console.log("Hi mom");

type CommentType = ReqBody & { status: string };

interface Comments {
  [key: string]: CommentType[];
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

    comments.push({ id, content, status: "pending", postId });

    commentsByPostId[postId] = comments;

    res.status(201).send(comments);

    try {
      await axios.post("http://localhost:4005/events", {
        type: "commentCreated",
        data: {
          id,
          content,
          postId,
          status: "pending",
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
);

app.post("/event", async (req: Request, res: Response): Promise<void> => {
  const result: ReqEventBus = req.body;

  console.log("Event Recieved", result.type);

  const { type, data } = result;

  if (type === "commentModerated") {
    console.log(data);

    const comment = commentsByPostId[data.postId].find(
      (comment) => comment.id === data.id
    );

    console.log(comment, "shittttttttttttttttttttttttt");

    if (comment) {
      comment.status = status;
    } else {
      console.log("There is no commnet...................................... ");
      return;
    }

    console.log("It did reached here 55");

    await axios.post("http://localhost:4005/events", {
      type: "commentUpdated",
      data: comment,
    });
  }

  res.send({});
});

const port = 4001;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
