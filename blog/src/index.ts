import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();

console.log("Hi mom");

app.use(bodyParser.json());
app.use(cors());

interface ReqBody {
  id: string;
  content: string;
}

interface ReqEventBus {
  type: string;
  data: ReqBody;
}

interface Posts {
  [key: string]: ReqBody;
}

interface ReqWithBoody extends Request {
  body: { [key: string]: string };
}

const posts: Posts = {};

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post(
  "/posts/create",
  async (req: ReqWithBoody, res: Response): Promise<void> => {
    const id = randomBytes(4).toString("hex");

    const { content } = req.body;

    posts[id] = {
      id,
      content,
    };

    console.log("I was logged");

    res.status(201).send(posts[id]);

    await axios.post("http://events-bus-serv:4005/events", {
      type: "postsCreated",
      data: { id, content },
    });
  }
);

app.post("/event", (req: Request, res: Response) => {
  const result: ReqEventBus = req.body;

  console.log("Event Recieved", result.type);

  res.send({});
});

const port = 4000;
console.log("Hi mom 2");

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  console.log("V12");
});
