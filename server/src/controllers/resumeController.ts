import { Response } from 'express';
import Resume from '../models/Resume';
import { AuthRequest } from '../types';

//get all resumes for logged in user 
export const getAllResumes = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const resumes = await Resume.find({user : req.userId});
        res.json(resumes);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }  
};

//get one resume by id
export const getResumeById = async (req: AuthRequest, res: Response): Promise<void> => { 
    try{
        const resume = await Resume.findById(req.params.id);
        if(!resume) {
            res.status(404).json({message: 'Resume not found'});
            return;
        }
        res.json(resume)

    } catch(error: unknown){
        if(error instanceof Error) res.status(500).json({message: error.message});
    }
};

//post - create new resume
export const createResume = async (req: AuthRequest, res: Response): Promise<void> => {
    try {   
        const resume = new Resume({user: req.userId, ...req.body});
        await resume.save();

        res.status(201).json(resume);

    } catch(error: unknown) {
        if(error instanceof Error) res.status(500).json({message: error.message});

    }
};

//put - update resume
export const updateResume = async (req: AuthRequest, res: Response): Promise<void> => { 
    try{
        const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(resume);

    } catch(error: unknown) {
        if(error instanceof Error) res.status(500).json({message: error.message});
    }
};

//delete - delete resume
export const deleteResume = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        await Resume.findByIdAndDelete(req.params.id);
        res.json({message: 'Resume deleted'});
    } catch(error: unknown) {
        if(error instanceof Error) res.status(500).json({message: error.message});
    }
};