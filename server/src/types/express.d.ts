import { Request } from "express";

export {}

declare global {
    namespace Express{
        interface Request{
            user?: Record<string, any>
            session?: Record<string, any>
        }
    }
}