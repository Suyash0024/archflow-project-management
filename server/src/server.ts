// archflow-backend/src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db'; // Corrected path
import authRoutes from '../routes/authRoutes'; // Corrected path

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173' ||' http://localhost:5174', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


// Routes
app.use('/api/auth', authRoutes); // All auth routes will start with /api/auth

// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});