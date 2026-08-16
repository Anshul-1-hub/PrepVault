import { Request, Response, NextFunction } from "express";

export const requireRole = (role: string[]) => {
    return(req: Request, res:Response, next:NextFunction) => {
        if(!req.user) return res.status(401).json({ message: "Not Authorized." });

        // console.log(req.user);                     // using for resolving the issue

        if(!role.includes(req.user.role)){
            return res.status(403).json({ message: "Not Authorized to create a blog." });
        }

        next();
    }
}