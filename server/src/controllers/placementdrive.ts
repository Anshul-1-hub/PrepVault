import {prisma} from "../lib/prisma.js"
import { Request, Response, NextFunction } from "express"
import { createPlacementdriveSchema } from "../validators/placementdrive.js"

export const createDrive = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const result = createPlacementdriveSchema.safeParse(req.body)

        if(!result.success){
            res.status(400).send("Missing/invalid input.")
            return
        }

        const {company, offertype, role, dateStart, dateEnd, criteria, stipend, salary, branch, location} = result.data

        const drive = await prisma.placementDrive.create({
            data:{
                company,
                offertype,
                role,
                dateStart,
                dateEnd,
                criteria,
                stipend,
                salary,
                branch,
                location
            }
        })

        res.status(201).json(drive)
    }
    catch(error){
        next(error)
    }
}

export const getDrives = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const result = await prisma.placementDrive.findMany({
            select:{
                id:true,
                company: true,
                offertype: true,
                role: true,
                dateStart: true,
                dateEnd: true,
                criteria: true,
                stipend: true,
                salary: true
            }
        })

        res.json(result)
    }
    catch(error){
        next(error)
    }
}

export const getDriveById = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const {driveId} = req.params

        const result = await prisma.placementDrive.findUnique({
            where:{
                id: driveId as string
            },

            select:{
                id:true,
                company: true,
                offertype: true,
                role: true,
                dateStart: true,
                dateEnd: true,
                criteria: true,
                stipend: true,
                salary: true,
                branch: true,
                location: true
            }
        })

        if(!result){
            res.status(404).json({message: "Drive not found!"})
            return
        }

        res.json(result)
    }
    catch(error){
        next(error)
    }
}

export const deleteDrive = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const {driveId} = req.params

        const drive = await prisma.placementDrive.findUnique({
            where: {
                id: driveId as string
            }
        })

        if(!drive){
            res.status(404).json({message: "Drive not found!"})
            return
        }

        await prisma.placementDrive.delete({
            where: {
                id: driveId as string
            }
        })

        res.json({message: "Drive deleted successfully!"})
    }
    catch(error){
        next(error)
    }
}