import express, { Request, Response } from "express";
import cors from "cors";

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(cors());

console.log("Hi mom");

app.get("/posts", (req: Request, res: Response) => {});

app.post("/events", (req: Request, res: Response) => {});

const port = 4002;

app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
