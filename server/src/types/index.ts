import { Request } from "express";
import { Document, Types } from "mongoose";

//extends express request to include userId added by auth middleware
export interface authRequest extends Request {
    userId?: string;
}

//interface for personal info section of resume
export interface IPersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    github?: string;
    summary?: string;  
}

//interface for a single work experience entry
export interface IWorkExperience {
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date; //optional for current job
    current: boolean;
    description?: string;
}

//interface for a single education entry
export interface IEducation {
    school?: string;
    degree?: string;
    field?: string;
    startDate?: Date;
    endDate?: Date;
}

//interface for skills section
export interface ISkills {
    technical: string[];
    soft: string[];
}

//full resume interface - extends mongoose dodument
export interface IResume extends Document { 
    user: Types.ObjectId; //reference to user
    title: string;
    personalInfo: IPersonalInfo;
    experience: IWorkExperience[];
    education: IEducation[];    
    skills: ISkills;
    atsScore: number;
}

//user interface - extends mongoose document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}