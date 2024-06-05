import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./config/db.js";
import { app } from "./app.js";
dotenv.config();

app.use(express.json());


const PORT = process.env.PORT || 3001;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Connection to MongoDB failed:', error.message);
})