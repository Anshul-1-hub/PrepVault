import {redis} from "../lib/redis.js"
import { Request, Response, NextFunction } from "express"

export const rateLimiter = (limit: number, windowSeconds: number) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id
        const route = req.originalUrl

        const key = `ratelimit:${userId}:${route}`

        const current = await redis.incr(key)

        if(current === 1){
            await redis.expire(key, windowSeconds)
        }

        if(current > limit){
            res.status(429).json({message: "Too many requests. Try again later."})
            return
        }

        next()
    }
}