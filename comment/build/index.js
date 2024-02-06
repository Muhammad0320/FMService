"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
console.log("Hi mom");
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
    var _a;
    res.send(commentsByPostId[(_a = req.params) === null || _a === void 0 ? void 0 : _a.id]);
});
app.post("/posts/:id/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (0, crypto_1.randomBytes)(4).toString("hex");
    const content = (_a = req.body) === null || _a === void 0 ? void 0 : _a.content;
    const postId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
    const comments = commentsByPostId[postId] || [];
    comments.push({ id, content, status: "pending" });
    commentsByPostId[postId] = comments;
    res.status(201).send(comments);
    try {
        yield axios_1.default.post("http://localhost:4005/events", {
            type: "commentCreated",
            data: {
                id,
                content,
                postId,
                status: "pending",
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}));
app.post("/event", (req, res) => {
    const result = req.body;
    console.log("Event Recieved", result.type);
    res.send({});
});
const port = 4001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
