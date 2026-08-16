import {prisma} from "../lib/prisma.js";
import { Request, Response, NextFunction } from "express";
import { createExperienceSchema } from "../validators/experience.js";

export const createExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const result = createExperienceSchema.safeParse(req.body);
        
        if(!result.success){
            res.status(400).send("Missing/invalid input.");
            return;
        }

        const {company, role, status, content} = result.data;

        const experience = await prisma.experience.create({
            data:{
                userId: req.user?.id,
                company,
                role,
                status,
                content
            }
        });

        res.status(201).json(experience);
    }

    catch(error){
        next(error);
    }
}

export const getExperiences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const result = await prisma.experience.findMany({
            select: {
                user: {
                    select: {
                        name: true
                    }
                },

                company: true,
                role: true,
                status: true,
                content: true
            }
        });

        if(result.length == 0){                                // if there are no experiences created yet, first i did !result which was wrong because prisma returns an empty array in this case
            res.json({message: "Nothing to see here."});
            return;
        }

        res.json(result);
    }

    catch(error){
        next(error);
    }
}

export const getExperienceById = async(req: Request, res:Response, next: NextFunction): Promise<void> => {
    try{
        const {blogId} = req.params;

        if(typeof blogId !== "string"){
            res.status(400).json({
                message: "Invalid BlogId"
            });
            return;
        }

        const result = await prisma.experience.findUnique({
            where: {
                blogId: blogId
            },

            select: {
                user: {
                    select: {
                        name: true
                    }
                },

                company: true,
                role: true,
                status: true,
                content: true
            }
        })

        if(!result){
            res.status(404).json({message:"Experience not found!"});
            return;
        }
        res.json(result);
    }

    catch(error){
        next(error);
    }
}

export const deleteExperience = async(req: Request, res:Response, next: NextFunction):Promise<void> => {
    try{
        const {blogId} = req.params;

        if(typeof blogId !== "string"){
            res.status(400).json({message: "Invalid BlogId"});
            return;
        }

        const experience = await prisma.experience.findUnique({
            where: {
                blogId: blogId
            }
        })

        if(!experience){
            res.status(404).json({message: "Experience not found!"});
            return;
        }

        if(req.user?.role === "SENIOR" && experience.userId !== req.user?.id){
            res.status(403).json({message: "You are not authorized to perform this action!"});
            return;
        }

        const result = await prisma.experience.delete({
            where: {
                blogId: blogId
            }
        })

        res.json({message: "Experience Blog deleted successfully!"});
    }

    catch(error){
        next(error);
    }
}