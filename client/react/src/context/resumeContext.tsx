/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ResumeData, PersonalInfo, Experience, Education, Skills } from '../types';

interface ResumeContextType {
  resume:             ResumeData;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  addExperience:      (exp: Experience) => void;
  updateExperience:   (id: string, exp: Partial<Experience>) => void;
  addEducation:       (edu: Education) => void;
  updateSkills:       (skills: Skills) => void;
  resetResume:        () => void;
}

const defaultResume: ResumeData = {
  title: 'My Resume',
  personalInfo: {
    fullName: '', email: '', phoneNumber: '',
    location: '', linkedIn: '', github: '', summary: ''
  },
  experience: [],
  education:  [],
  skills:     { technical: [], soft: [] },
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(defaultResume);

  const updatePersonalInfo = (data: Partial<PersonalInfo>) =>
    setResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));

  const addExperience = (exp: Experience) =>
    setResume(prev => ({ ...prev, experience: [...prev.experience, exp] }));

  const updateExperience = (id: string, exp: Partial<Experience>) =>
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, ...exp } : e)
    }));

  const addEducation = (edu: Education) =>
    setResume(prev => ({ ...prev, education: [...prev.education, edu] }));

  const updateSkills = (skills: Skills) =>
    setResume(prev => ({ ...prev, skills }));

  const resetResume = () => setResume(defaultResume);

  return (
    <ResumeContext.Provider value={{ resume, updatePersonalInfo, addExperience, updateExperience, addEducation, updateSkills, resetResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used inside ResumeProvider');
  return context;
};