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
const db_1 = require("../db");
const common_app_1 = require("@manas33179/common-app");
const middleware_1 = require("../middleware");
const blogRouter = express_1.default.Router();
blogRouter.use(middleware_1.authMiddleware);
blogRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = common_app_1.createPostInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Inputs not correct"
        });
    }
    try {
        const blog = yield db_1.prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: req.authorId
            }
        });
        res.json({
            message: "Blog created successfully",
            blog
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Error while creating blog"
        });
    }
}));
blogRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = common_app_1.updatePostInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Inputs not correct"
        });
    }
    try {
        const blog = yield db_1.prisma.post.update({
            where: {
                id: req.body.id
            },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });
        res.json({
            message: "Blog updated successfully",
            blog
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Error while updating blog"
        });
    }
}));
blogRouter.get('/bulk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield db_1.prisma.post.findMany({
            where: {
                authorId: req.authorId
            }
        });
        res.json({
            blogs
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Error while fetching blogs"
        });
    }
}));
blogRouter.get('/bulk/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield db_1.prisma.post.findMany();
        res.json({
            blogs
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Error while fetching all blogs"
        });
    }
}));
blogRouter.get('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        where: {
            id: req.authorId
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });
    return res.json({
        user: user
    });
}));
blogRouter.get('/user/:authorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        where: {
            id: req.params.authorId
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });
    return res.json({
        user: user
    });
}));
blogRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield db_1.prisma.post.delete({
            where: {
                id: req.params.id
            }
        });
        res.json({
            message: "Blog deleted successfully",
            blog
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Error while deleting blog"
        });
    }
}));
blogRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield db_1.prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        });
        res.json({
            blog
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Error while fetching blog"
        });
    }
}));
exports.default = blogRouter;
