import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db/index.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(`Error: ${error.message}`);
});

