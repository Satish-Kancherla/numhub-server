// imports
import dotenv from "dotenv";
import express from "express";
import { mainRouter } from "./api/mainRouter.js";
import cookiParser from "cookie-parser";
import cors from "cors";
// variables
dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cookiParser());
app.use(
    cors({
        origin: "*",
        // origin: "http://localhost:5173",
        // credentials: true,
    })
);
app.get("/", (req, res) => {
    res.send("Welcome to Clean Express 🚅...");
});
app.use("/api", mainRouter);

app.listen(PORT, () => {
    console.log("Server is Started on port " + PORT);
});
