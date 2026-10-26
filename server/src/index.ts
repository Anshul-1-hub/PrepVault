import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import experienceRouter from "./routes/experience.js";
import commentRouter from "./routes/comment.js"
import "dotenv/config"

const app = express();

app.all("/api/auth/{*any}", toNodeHandler(auth))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/experiences", experienceRouter);
app.use("/api/experiences/:blogId/comments", commentRouter)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})