import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDb } from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});


const PORT = process.env.PORT || 3001;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Connection to MongoDB failed:', error.message);
})