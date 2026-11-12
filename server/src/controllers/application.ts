import { ResourceWhereInput } from "../generated/prisma/models.js"
import {prisma} from "../lib/prisma.js"
import { Request, Response, NextFunction } from "express"
import { updateStatusSchema } from "../validators/updateStatus.js"

export const createApplication = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const {driveId} = req.params

        const alreadya = await prisma.studentDriveApplication.findUnique({
            where: {
                userId_driveId:{
                    userId: req.user?.id,
                    driveId: driveId as string
                }
            }
        })

        if(alreadya){
            res.status(409).json({message: "You have already applied!"})
            return
        }

        const a = await prisma.studentDriveApplication.create({
            data:{
                userId: req.user?.id,
                driveId: driveId as string,
                status: "APPLIED"
            }
        })

        res.status(201).json(a)
    }

    catch(error){
        next(error)
    }
}

export const getMyApplications = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const results = await prisma.studentDriveApplication.findMany({
            where:{
                userId: req.user?.id
            },

            include:{
                drive:{
                    select:{
                        company: true,
                        offertype: true,
                        role: true
                    }
                }
            }
        })

        res.json(results)
    }
    catch(error){
        next(error)
    }
}

export const updateStatus = async (req: Request, res:Response, next: NextFunction):Promise<void> => {
    try{
        const {applicationId} = req.params

        const result = updateStatusSchema.safeParse(req.body)
        if(!result.success){
            res.status(400).json({message: "Invalid status value."})
            return
        }

        const {updStatus} = result.data

        const check = await prisma.studentDriveApplication.findUnique({
            where:{
                applicationId: applicationId as string,
            }
        })

        if(!check){
            res.status(404).json({message: "Application does not exist!"})
            return
        }

        await prisma.studentDriveApplication.update({
            where: {
                applicationId: applicationId as string
            },
            data:{
                status: updStatus
            }
        })

        res.status(200).json({message: "Status updated successfully!"})
    }
    catch(error){
        next(error)
    }
}

export const deleteApplication = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const {applicationId} = req.params

        const a = await prisma.studentDriveApplication.findUnique({
            where:{
                applicationId: applicationId as string
            }
        })

        if(!a){
            res.status(404).json({message: "Application not found!"})
            return
        }

        if(a.userId !== req.user?.id){
            res.status(403).json({message: "This application does not belong to you."})
            return
        }

        await prisma.studentDriveApplication.delete({
            where:{
                applicationId: applicationId as string
            }
        })

        res.json({message: "Application deleted successfully!"})
    }
    catch(error){
        next(error)
    }
}