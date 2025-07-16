import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id:string};
        req.authorId = decoded.id;
        next();
    } catch (e) {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
}