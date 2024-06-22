import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db/index.js";
import userRouter from "./routes/userRoutes.js";
import globalErrorHandler from "./midelwares/globalErrorHandler.js";

import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(globalErrorHandler);

// Routes
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`Error: ${error.message}`);
    });