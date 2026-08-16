import {z} from "zod";

export const createExperienceSchema = z.object({
    company: z.string(),
    role: z.string(),
    status: z.enum(["ACCEPTED", "REJECTED"]),
    content: z.string()
})