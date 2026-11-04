import z from "zod";

export const createResourceSchema = z.object({
    title: z.string(),
    description: z.string(),
    URL: z.string(),
    domain: z.string(),
})