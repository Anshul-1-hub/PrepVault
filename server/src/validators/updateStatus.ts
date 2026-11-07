import z from "zod";

export const updateStatusSchema = z.object({
    updStatus: z.enum(["APPLIED", "SHORTLISTED", "UNDER_PROCESS", "REJECTED", "ACCEPTED"])
})