import express, { Request, Response } from "express";
import cors from "cors";

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(cors());

console.log("Hi mom");

interface Body {
  id: string;
  content: string;
  postId?: string;
  status?: string;
}

interface BodyofPost extends Request {
  body: {
    type: "postsCreated";
    data: Body;
  };
}

interface BodyofComment extends Request {
  body: {
    type: "commentCreated";
    data: Body & { postId: string; status: string };
  };
}

interface BodyofCommentUpdated extends Request {
  body: {
    type: "commentUpdated";
    data: Body & { postId: string; status: string };
  };
}

interface Post {
  [key: string]: Body & { comments: Body[] };
}

const post: Post = {};

app.get("/posts", (req: Request, res: Response) => {
  res.send(post);
});

app.post(
  "/event",
  (req: BodyofComment | BodyofPost | BodyofCommentUpdated, res: Response) => {
    const { data, type } = req.body;

    if (type === "postsCreated") {
      post[data.id] = { id: data.id, content: data.content, comments: [] };
    }

    if (type === "commentCreated") {
      post[data.postId].comments.push({
        id: data.id,
        content: data.content,
        status: data.status,
      });
    }

    if (type === "commentUpdated") {
      const comments = post[data.postId].comments.find(
        (comment) => comment.id === data.id
      );

      if (comments) {
        comments.content = data.content;
        comments.status = data.status;
      }
    }

    res.send({});
  }
);

const port = 4002;

app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
