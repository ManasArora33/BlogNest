import express from "express";
import { signupInput, signinInput } from "@manas33179/common-app";
import {prisma} from "../db"
import jwt from "jsonwebtoken"
import { authMiddleware } from "../middleware";
const userRouter = express.Router();

userRouter.post('/signup', async(req, res) => {
    // validating the inputs using zod
    const { success } = signupInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Inputs not correct"
        })
    }
    // Logic to check if user with the same email already exists , if yes then return 
    const existingUser = await prisma.user.findUnique({
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
        const user = await prisma.user.create({
            data: req.body
        });
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET as string)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
            sameSite: 'lax' // Helps mitigate CSRF attacks
        });
        res.json({
            message: "User created successfully",
            token
        });
    } catch (e) {
        res.status(411).json({ message: "Error while signing up" });
    }

})

userRouter.post('/signin',async (req, res) => {
    const { success } = signinInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Inputs not correct"
        })
    }
    try{
        const user = await prisma.user.findUnique({
            where:{
                email:req.body.email,
                password:req.body.password
            }
        })
        if(!user){
            return res.status(403).json({
                message:"Invalid credentials"
            })
        }
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET as string)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
            sameSite: 'lax' // Helps mitigate CSRF attacks
        });
        res.json({
            message:"Signed in successfully",
            token
        })
    }catch(e){
        res.status(411).json({
            message:"Error while signing in"
        })
    }
})

userRouter.get('/signout', authMiddleware, async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/", // MUST be explicitly set to match how the cookie was created
    });

    res.json({
        message: "Signed out successfully"
    });
});


export default userRouter;
