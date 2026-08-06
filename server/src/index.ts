import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app = express();

app.all("/api/auth/{*any}", toNodeHandler(auth))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})