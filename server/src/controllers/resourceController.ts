import { prisma } from "../lib/prisma.js";
import { redis } from "../lib/redis.js"
import { Request, Response, NextFunction } from "express";
import { createResourceSchema } from "../validators/resource.js";

export const createResource = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const result = createResourceSchema.safeParse(req.body)

        if(!result.success){
            res.status(400).send("Missing/invalid input.")
            return
        }

        const {title, description, URL, domain} = result.data

        const makeresource = await prisma.resource.create({
            data:{
                userId: req.user?.id,
                title,
                description,
                URL,
                domain
            }
        })

        res.status(201).json(makeresource)
    }

    catch(error){
        next(error)
    }
}

export const getResource = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const cacheKey = req.query.domain ? `resources:${req.query.domain}` : "resources"

        const cached = await redis.get(cacheKey)

        if(cached){
            res.json(cached)
            return
        }

        const resources = await prisma.resource.findMany({
            where:{
                ...(req.query.domain && {domain: req.query.domain as string})
            }
        })
        
        await redis.set(cacheKey, JSON.stringify(resources), {ex: 3600})
        res.json(resources)
        
    }
    catch(error){
        next(error)
    }
}

export const deleteResource = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const {resourceId} = req.params
        if(typeof resourceId !== "string"){
            res.status(400).json({message: "Invalid ResourceId"})
            return
        }

        const r = await prisma.resource.findUnique({
            where:{
                resourceId
            }
        })

        if(!r){
            res.status(404).json({message: "Resource not found!"})
            return
        }

        if(req.user?.role !== "ADMIN" && r.userId !== req.user?.id){
            res.status(403).json({message: "You are not authorized to perform this action!"})
            return
        }

        const result = await prisma.resource.delete({
            where:{
                resourceId
            }
        })

        await redis.del("resources")

        res.json({message: "Resource deleted successfully!"})
    }
    catch(error){
        next(error)
    }
}