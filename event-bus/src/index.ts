import express from "express";
import bodyParser from "body-parser";

const app = express();

console.log("Hi mom");

app.use(bodyParser.json());
