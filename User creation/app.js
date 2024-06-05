import express from 'express'
import router from './routes/userRoute.js'
import createHttpError from 'http-errors';
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', router);

// Error handling
app.use((req, res, next) => {
    next(createHttpError(404, 'Not Found'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: err
    });
});

export {app}