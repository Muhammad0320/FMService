"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
console.log("Hi mom");
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
    var _a;
    res.send(commentsByPostId[(_a = req.params) === null || _a === void 0 ? void 0 : _a.id]);
});
app.post("/posts/:id/comments", (req, res) => {
    var _a, _b;
    const id = (0, crypto_1.randomBytes)(4).toString("hex");
    const content = (_a = req.body) === null || _a === void 0 ? void 0 : _a.content;
    const postID = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
    const comments = commentsByPostId[postID] || [];
    comments.push({ id, content });
    commentsByPostId[postID] = comments;
    res.status(201).send(comments);
});
const port = 4001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
