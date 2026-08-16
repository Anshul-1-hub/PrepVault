import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),

    user: {
        additionalFields: {
            role: {
                type: "string",
                input: false
            }
        }
    },

    emailAndPassword: {
        enabled: true
    },

    trustedOrigins: ["http://localhost:5000", "http://localhost:5173"]
})