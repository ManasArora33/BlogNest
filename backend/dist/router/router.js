"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./userRouter"));
const blogRouter_1 = __importDefault(require("./blogRouter"));
const mainRouter = express_1.default.Router();
mainRouter.use('/user', userRouter_1.default);
mainRouter.use('/blog', blogRouter_1.default);
exports.default = mainRouter;
