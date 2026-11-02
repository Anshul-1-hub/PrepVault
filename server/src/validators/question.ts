import {z} from "zod";

export const createQuestionSchema = z.object({
    company: z.string(),
    role: z.string(),
    difficulty: z.enum(["EASY", "MODERATE", "HARD"]),
    topic: z.string(),
    question: z.string(),
    round: z.string()
})