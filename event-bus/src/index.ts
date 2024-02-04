import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

console.log("Hi mom");

app.use(bodyParser.json());

app.post("/events", async (req: Request, res: Response) => {
  const event = req.body;

  await axios.post("http://localhost:4000/event", event);
  await axios.post("http://localhost:4001/event", event);
  await axios.post("http://localhost:4002/event", event);
});

const port = 4005;

app.listen(port, () => {
  console.log(`listening to port  ${port} `);
});
