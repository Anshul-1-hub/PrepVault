import z from "zod";

export const createPlacementdriveSchema = z.object({
    company: z.string(),
    offertype: z.string(),
    role: z.string(),
    dateStart: z.string(),
    dateEnd: z.string(),
    criteria: z.number().optional(),
    stipend: z.number().optional(),
    salary: z.number().optional(),
    branch: z.array(z.string()),
    location: z.string()
})