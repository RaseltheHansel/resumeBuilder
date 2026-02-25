import type { Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai'; 
import type { AuthRequest } from '../types';

// lazy initialization — runs AFTER dotenv has loaded
const getModel = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('[AI] API Key:', apiKey ? '✅ Loaded' : '❌ Missing');
    
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};

// generate summary
export const generateSummary = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const model = getModel(); // ← initialized here, not at import time

        const { name, position, experience, skills } = req.body as Record<string, string>;

        if (!name || !position || !experience || !skills) {
            res.status(400).json({ message: 'Missing required fields.' });
            return;
        }

        const prompt = `Write a professional 3-sentence resume summary for ${name}, who is a ${position} with experience in ${experience} and skills: ${skills}. Make it ATS-friendly and impressive.`;

        const result = await model.generateContent(prompt);
        const summary: string = result.response.text();

        res.json({ summary });
    } catch (error: unknown) {
        console.error('[generateSummary]', error); // ← you'll now see this in nodemon
        if (error instanceof Error) res.status(500).json({ message: error.message });
    }
};

// generate experience bullet points
export const generateExperience = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const model = getModel();

        const { position, company, responsibilities } = req.body as Record<string, string>;

        if (!position || !company || !responsibilities) {
            res.status(400).json({ message: 'Missing required fields.' });
            return;
        }

        const prompt = `Write 4 ATS-friendly resume bullet points for a ${position} at ${company}. Responsibilities: ${responsibilities}. Start each with a strong action verb.`;

        const result = await model.generateContent(prompt);
        const bullets: string = result.response.text();

        res.json({ bullets });
    } catch (error: unknown) {
        console.error('[generateExperience]', error);
        if (error instanceof Error) res.status(500).json({ message: error.message });
    }
};

// generate cover letter
export const generateCoverLetter = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const model = getModel();

        const { name, position, company, experience, skills } = req.body as Record<string, string>;

        if (!name || !position || !company || !experience || !skills) {
            res.status(400).json({ message: 'Missing required fields.' });
            return;
        }

        const prompt = `Write a professional cover letter for ${name} applying to ${position} at ${company}. Experience: ${experience}. Skills: ${skills}.`;

        const result = await model.generateContent(prompt);
        const coverLetter: string = result.response.text();

        res.json({ coverLetter });
    } catch (error: unknown) {
        console.error('[generateCoverLetter]', error);
        if (error instanceof Error) res.status(500).json({ message: error.message });
    }
};

// check ATS score
export const checkATSScore = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const model = getModel();

        const { resumeText, jobDescription } = req.body as Record<string, string>;

        if (!resumeText || !jobDescription) {
            res.status(400).json({ message: 'Missing required fields.' });
            return;
        }

        const prompt = `Rate this resume 0-100 for this job. Resume: ${resumeText} Job Description: ${jobDescription}. Return ONLY valid JSON: {"score": number, "feedback": string, "missingKeywords": string[]}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const clean = text.replace(/```json|```/g, '').trim();

        let parsed: { score: number; feedback: string; missingKeywords: string[] };
        try {
            parsed = JSON.parse(clean);
        } catch {
            res.status(500).json({ message: 'Failed to parse AI response. Please try again.' });
            return;
        }

        res.json(parsed);
    } catch (error: unknown) {
        console.error('[checkATSScore]', error);
        if (error instanceof Error) res.status(500).json({ message: error.message });
    }
};