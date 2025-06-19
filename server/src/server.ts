import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db'; 
import authRoutes from '../routes/authRoutes'; 

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); 

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173' ||' http://localhost:5174', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


// Routes
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});