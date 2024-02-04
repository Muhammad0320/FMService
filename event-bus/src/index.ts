import axios from "axios";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const app = express();

console.log("Hi mom");

app.use(bodyParser.json());

app.post("/events", async (req: Request, res: Response) => {
  const event = req.body;

  await axios.post("http://localhost:4000/event", event).catch(console.log);

  await axios.post("http://localhost:4001/event", event).catch(console.log);
  //   await axios.post("http://localhost:4002/event", event);

  res.send("OK");
});

const port = 4005;

app.listen(port, () => {
  console.log(`listening to port  ${port} `);
});
