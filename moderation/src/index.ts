import express, { Request, Response } from "express";

import axios from "axios";

import bodyParser from "body-parser";

interface ReqBody {
  id: string;
  content: string;
}

interface ReqEventBus {
  type: string;
  data: ReqBody;
}

const app = express();

app.use(bodyParser.json());

console.log("Hi mom");

app.post("/event", async (req: Request, res: Response): Promise<void> => {
  const result: ReqEventBus = req.body;

  const { type, data } = result;

  console.log(data);

  const status = data.content.includes("orange") ? "rejected" : "approved";

  console.log(status);

  await axios.post("http://localhost:4005/events", {
    type: "commentModerated",
    data: { ...data, status },
  });

  res.send({});
});

const port = 4003;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
