import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';
import authRoutes from './routes/auth';
import resumeRoutes from './routes/resume'; 
import aiRoutes from './routes/ai';

const app: Application = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.get('/', (_req, res) => res.send('Resume Builder API!'));

const PORT = parseInt(process.env.PORT ?? '5000', 10);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

