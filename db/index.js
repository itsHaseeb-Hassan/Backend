import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config()

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection to MongoDB failed:', error.message);
    }
};

