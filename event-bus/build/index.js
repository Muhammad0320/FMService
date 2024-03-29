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
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
console.log("Hi mom");
app.use(body_parser_1.default.json());
let events = [];
app.post("/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = req.body;
    events.push(event);
    yield axios_1.default
        .post("http://post-clusterip-serv:4000/event", event)
        .catch(console.log);
    yield axios_1.default.post("http://comments-serv:4001/event", event).catch(console.log);
    yield axios_1.default.post("http://query-serv:4002/event", event).catch(console.log);
    yield axios_1.default
        .post("http://moderation-serv:4003/event", event)
        .catch(console.log);
    res.send("OK");
}));
app.get("/events", (req, res) => {
    res.send(events);
});
// localhost:30607/posts
const port = 4005;
console.log("Hi mom 2");
app.listen(port, () => {
    console.log("Just to check if it woks");
    console.log(`listening to port  ${port} `);
});
