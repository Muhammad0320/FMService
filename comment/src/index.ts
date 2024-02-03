import express from "express";

import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

console.log("Hi mom");

const port = 4001;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
