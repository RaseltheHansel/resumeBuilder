export interface PersonalInfo {
    fullName: string;
    email: string;
    phoneNumber: string;
    location: string;
    linkedIn: string;
    github: string;
    summary: string;
}

export interface Experience { 
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
}

export interface Skills  {
    technical: string[];
    soft: string[];
}

export interface ResumeData {
    title: string;
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: Skills;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}