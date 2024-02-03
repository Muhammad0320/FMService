"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
console.log("Hi mom");
app.use(body_parser_1.default.json());
const posts = {};
app.get("/posts", (req, res) => {
    res.send(posts);
});
app.post("/posts", (req, res) => {
    const id = (0, crypto_1.randomBytes)(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
        id,
        title,
    };
    res.status(201).send();
});
const port = 4000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
