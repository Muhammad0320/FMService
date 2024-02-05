"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
console.log("Hi mom");
const post = {};
app.get("/posts", (req, res) => {
    res.send(post);
});
app.post("/event", (req, res) => {
    const { data, type } = req.body;
    if (type === "postsCreated") {
        console.log("I ocured");
        post[data.id] = { id: data.id, content: data.content, comments: [] };
    }
    if (type === "commentCreated") {
        post[data.postId].comments.push({ id: data.id, content: data.content });
    }
    res.send({});
});
const port = 4002;
app.listen(port, () => {
    console.log(`App running on port ${port} `);
});
