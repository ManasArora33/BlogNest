import express from "express";
import userRouter from "./userRouter";
import blogRouter from "./blogRouter";

const mainRouter = express.Router();

mainRouter.use('/user',userRouter)
mainRouter.use('/blog',blogRouter)


export default mainRouter;