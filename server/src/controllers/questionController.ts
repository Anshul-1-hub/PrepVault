import { prisma } from "../lib/prisma.js";
import { Request, Response, NextFunction } from "express";
import { createQuestionSchema } from "../validators/question.js";

export const createQuestion = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const result = createQuestionSchema.safeParse(req.body)

        if(!result.success){
            res.status(400).send("Missing/invalid input.")
            return
        }

        const {company, role, difficulty, topic, question, round} = result.data

        const makequestion = await prisma.question.create({
            data:{
                userId: req.user?.id,
                company,
                role,
                difficulty,
                topic,
                question,
                round
            }
        })

        res.status(201).json(makequestion)
    }

    catch(error){
        next(error)
    }
}

export const getQuestions = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const result = await prisma.question.findMany({
            where: {
                ...(req.query.company && { company: req.query.company as string }),
                ...(req.query.difficulty && { difficulty: req.query.difficulty as "EASY" | "MODERATE" | "HARD" }),
                ...(req.query.topic && { topic: req.query.topic as string }),
            },

            select:{
                user:{
                    select:{
                        name:true
                    }
                },

                company: true,
                role: true,
                difficulty: true,
                topic: true,
                question: true,
                round: true
            }
        })

        if(result.length === 0){
            res.send("No such questions found!")
            return
        }

        res.json(result)
    }

    catch(error){
        next(error)
    }
}

export const deleteQuestion = async (req: Request, res:Response, next: NextFunction):Promise<void> => {
    try{
        const {questionId} = req.params
        if(typeof questionId !== "string"){
            res.status(400).json({message: "Invalid QuestionId"})
            return
        }

        const q = await prisma.question.findUnique({
            where:{
                questionId: questionId,
            }
        })

        if(!q){
            res.status(404).json({message: "Question not found!"})
            return
        }

        if(req.user?.role !== "ADMIN" && q.userId !== req.user?.id){
            res.status(403).json({message: "You are not authorized to perform this action!"})
            return
        }

        const result = await prisma.question.delete({
            where:{
                questionId: questionId
            }
        })

        res.json({message: "Question deleted successfully!"})
    }

    catch(error){
        next(error)
    }
}