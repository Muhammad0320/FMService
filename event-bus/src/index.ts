import axios from "axios";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const app = express();

console.log("Hi mom");

app.use(bodyParser.json());

interface EventBody {
  type: string;
  data: {
    id: string;
    content?: string;
    status: string;
    postId?: string;
  };
}

let events: EventBody[] = [];

app.post("/events", async (req: Request, res: Response) => {
  const event = req.body;

  events.push(event);

  await axios.post("http://posts-serv:4000/event", event).catch(console.log);
  // await axios.post("http://localhost:4001/event", event).catch(console.log);
  // await axios.post("http://localhost:4002/event", event).catch(console.log);
  // await axios.post("http://localhost:4003/event", event).catch(console.log);

  res.send("OK");
});

app.get("/events", (req: Request, res: Response) => {
  res.send(events);
});

// localhost:30607/posts
const port = 4005;

app.listen(port, () => {
  console.log("Just to check if it woks");
  console.log(`listening to port  ${port} `);
});
