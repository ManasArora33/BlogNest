import express from "express";
import { prisma } from "../db";
import { createPostInput, updatePostInput } from "@manas33179/common-app";
import { authMiddleware } from "../middleware";

const blogRouter = express.Router();

blogRouter.use(authMiddleware);

blogRouter.post('/', async (req, res) => {
    const { success } = createPostInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Inputs not correct"
        })
    }
    try {
        const blog = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: req.authorId as string
            }
        })
        res.json({
            message: "Blog created successfully",
            blog
        })
    } catch (e) {
        res.status(411).json({
            message: "Error while creating blog"
        })
    }
})

blogRouter.put('/', async (req, res) => {
    const { success } = updatePostInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Inputs not correct"
        })
    }
    try {
        const blog = await prisma.post.update({
            where: {
                id: req.body.id
            },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        })
        res.json({
            message: "Blog updated successfully",
            blog
        })
    } catch (e) {
        res.status(411).json({
            message: "Error while updating blog"
        })
    }
})

blogRouter.get('/bulk', async (req, res) => {
    try {
        const blogs = await prisma.post.findMany({
            where: {
                authorId: req.authorId
            }
        })
        res.json({
            blogs
        })
    } catch (e) {
        res.status(411).json({
            message: "Error while fetching blogs"
        })
    }
})

blogRouter.get('/bulk/all', async (req, res) => {
    try {
        const blogs = await prisma.post.findMany();
        res.json({
            blogs
        })
    } catch (e) {
        res.status(411).json({
            message: "Error while fetching all blogs"
        })
    }
})


blogRouter.get('/me', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.authorId
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })
    return res.json({
        user: user
    })
})

blogRouter.get('/user/:authorId',async(req,res) => {
    const user = await prisma.user.findUnique({
        where:{
            id:req.params.authorId
        },
        select:{
            id: true,
            name:true,
            email:true
        }
    })
    return res.json({
        user:user
    })
})

blogRouter.delete('/:id', async (req, res) => {
    try {
        const blog = await prisma.post.delete({
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: "Blog deleted successfully",
            blog
    })
} catch (e) {
        res.status(411).json({
            message: "Error while deleting blog"
        })
    }
})

blogRouter.get('/:id', async (req, res) => {
    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        })
        res.json({
            blog
        })
    } catch (e) {
        res.status(411).json({
            message: "Error while fetching blog"
        })
    }
})




export default blogRouter;
