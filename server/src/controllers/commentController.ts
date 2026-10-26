import {prisma} from "../lib/prisma.js";
import { Request, Response, NextFunction } from "express";
import { createCommentSchema } from "../validators/comment.js";

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const result = createCommentSchema.safeParse(req.body)

        if(!result.success){
            res.status(400).send("Missing/invalid input")
            return
        }

        const {content} = result.data

        const comment = await prisma.comment.create({
            data:{
                userId: req.user?.id,
                blogId: req.params.blogId as string,
                content,
            }
        })

        res.status(201).json(comment)
    }

    catch(error){
        next(error)
    }
}

export const getComments = async(req: Request, res:Response, next: NextFunction): Promise<void> => {
    try{
        const result = await prisma.comment.findMany({
            where:{
                blogId: req.params?.blogId as string
            },

            select:{
                user:{
                    select:{
                        name:true
                    }
                },
                content:true
            }
        })

        if(result.length == 0){
            res.json({message: "No comments yet!"})
            return
        }

        res.json(result)
    }

    catch(error){
        next(error)
    }
}

export const deleteComment = async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    try{
        const {commentId} = req.params;
        if(typeof commentId !== "string"){
            res.status(400).json({message: "Invalid CommentId"})
            return 
        }

        const comment = await prisma.comment.findUnique({
            where:{
                commentId: commentId as string,
            }
        })

        if(!comment){
            res.status(404).json({message: "Comment not found!"})
            return
        }

        if(req.user?.role !== "ADMIN" && comment.userId !== req.user?.id){
            res.status(403).json({message: "You are not authorized to preform this action!"})
            return
        }

        const result = await prisma.comment.delete({
            where: {
                commentId: commentId as string
            }
        })

        res.json({message: "Comment deleted successfully!"})
    }

    catch(error){
        next(error)
    }
}