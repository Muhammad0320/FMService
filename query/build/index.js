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
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
console.log("Hi mom");
const post = {};
app.get("/posts", (req, res) => {
    res.send(post);
});
const handleEvent = (data, type) => {
    if (type === "postsCreated") {
        post[data.id] = { id: data.id, content: data.content, comments: [] };
    }
    if (type === "commentCreated") {
        console.log("I created comment");
        if (data.postId)
            post[data.postId].comments.push({
                id: data.id,
                content: data.content,
                status: data.status,
            });
    }
    if (type === "commentUpdated") {
        console.log("I update comment");
        let comments;
        if (data.postId)
            comments = post[data.postId].comments.find((comment) => comment.id === data.id);
        if (comments) {
            comments.content = data.content;
            comments.status = data.status;
        }
    }
};
app.post("/event", (req, res) => {
    const { data, type } = req.body;
    handleEvent(data, type);
    res.send({});
});
const port = 4002;
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`App running on port ${port} `);
    try {
        const res = yield axios_1.default.get("http://localhost:4005/events");
        for (const event of res.data) {
            console.log(event.type, "Emitted");
            console.log(event);
            handleEvent(event.data, event.type);
        }
    }
    catch (error) {
        if (error instanceof Error)
            console.log(error.message);
    }
}));
