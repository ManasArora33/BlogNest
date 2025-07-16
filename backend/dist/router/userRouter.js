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
const common_app_1 = require("@manas33179/common-app");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware");
const userRouter = express_1.default.Router();
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validating the inputs using zod
    const { success } = common_app_1.signupInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Inputs not correct"
        });
    }
    // Logic to check if user with the same email already exists , if yes then return 
    const existingUser = yield db_1.prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });
    if (existingUser) {
        return res.status(409).json({
            message: "User with this email already exists"
        });
    }
    // Logic to create user in the database using prisma client
    try {
        const user = yield db_1.prisma.user.create({
            data: req.body
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
            sameSite: 'lax' // Helps mitigate CSRF attacks
        });
        res.json({
            message: "User created successfully",
            token
        });
    }
    catch (e) {
        res.status(411).json({ message: "Error while signing up" });
    }
}));
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = common_app_1.signinInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Inputs not correct"
        });
    }
    try {
        const user = yield db_1.prisma.user.findUnique({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        if (!user) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
            sameSite: 'lax' // Helps mitigate CSRF attacks
        });
        res.json({
            message: "Signed in successfully",
            token
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Error while signing in"
        });
    }
}));
userRouter.get('/signout', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/", // MUST be explicitly set to match how the cookie was created
    });
    res.json({
        message: "Signed out successfully"
    });
}));
exports.default = userRouter;
