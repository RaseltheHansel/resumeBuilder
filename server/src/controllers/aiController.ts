import { Response    } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai'; 
import { authRequest } from '../types';


//initialize gemini with your free api key
const apiKey = process.env.GEMINI_API_KEY?? '';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

//generate summary
export const generateSummary = async (req: authRequest, res: Response): Promise<void> => {
    try {
        const { name, position, experience, skills }: {
            name: string;
            position: string;
            experience: string;
            skills: string;
        } = req.body;

        const prompt = ' Write a professional 3-sentence resume summary for ' + name +
        'who is a ' + position + 'with experience in ' + experience + 
        'and skills ' + skills + '. Make it ATS-friendly and impressive. ';

        const result = await model.generateContent(prompt);
        const  summary: string = result.response.text();

        res.json({ summary });
    } catch (error: unknown) {
        if(error instanceof Error)res.status(500).json({ message: error.message });
    }
};

//generate experience bullet points
export const generateExperience = async (req: authRequest, res: Response): Promise<void> => {
    try {
        const { position, company, responsibilities, }: {
            position: string;
            company: string;
            responsibilities: string;
        } = req.body;

        const prompt = 'Write 4 ATS-Friendly resume bullet points for a ' + position + ' at ' + company +
        '. Responsibilities: ' + responsibilities + '. Start each with a strong action verb.';

        const result = await model.generateContent(prompt);
        const bullets: string = result.response.text();

        res.json({bullets});

    }catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });

        }
    }
};

//geenerate cover letter 
export const generateCoverLetter = async (req: authRequest, res: Response): Promise<void> => { 
    try {
        const { name, position, company, experience, skills, }: {
            name: string;
            position: string;
            company: string;
            experience: string;
            skills: string;
        } = req.body;
        const prompt = 'Write a professional cover letter for ' + name + ' applying to ' + position + ' at ' + company +
        '. Experience: ' + experience + '. Skills: ' + skills + '.';

        const result = await model.generateContent(prompt);    
        const coverLetter: string = result.response.text();

        res.json({coverLetter});

    }catch (error: unknown) {
        if(error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

//check ats score
export const checkATSScore = async (req: authRequest, res: Response): Promise<void> => { 
    try { 
        const { resumeText, jobDescription, }: {
            resumeText: string;
            jobDescription: string;
        } = req.body;
        const prompt = 'Rate this resume 0-100 for this job. Resume: ' + resumeText + ' Job Description: ' + jobDescription +
        'Return ONLY Vaid JSON: {score : number, feedback: string, missingKeywords: string[] }';
    
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const clean = text.replace(/```json|```/g, '').trim(); //remove code block markers if present

        //parse and types the JSON response 
        const parsed: { score: number; feedback: string; missingKeywords: string[] } = JSON.parse(clean);
        
        res.json(parsed);
    } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        }
     }
};