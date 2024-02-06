import express from "express";

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

console.log("Hi mom");

app.post("/event", () => {});

const port = 4003;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
