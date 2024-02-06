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
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
console.log("Hi mom");
app.post("/event", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = req.body;
    const { type, data } = result;
    const status = data.content.includes("orange") ? "rejected" : "approved";
    yield axios_1.default.post("http://localhost:4005/event", {
        type: "commentModerated",
        data: Object.assign(Object.assign({}, data), { status }),
    });
    res.send({});
}));
const port = 4003;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
