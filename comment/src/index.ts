import express from "express";

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

const port = 4001;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
