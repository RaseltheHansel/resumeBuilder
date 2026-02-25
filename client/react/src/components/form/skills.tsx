import { useState } from 'react';
import { useResume } from '../../context/resumeContext';

export default function SkillsForm() {
  const { resume, updateSkills } = useResume();
  const [techInput, setTechInput] = useState<string>('');
  const [softInput, setSoftInput] = useState<string>('');

  const addTechnical = (): void => {
    if (!techInput.trim()) return;
    updateSkills({
      ...resume.skills,
      technical: [...resume.skills.technical, techInput.trim()],
    });
    setTechInput('');
  };

  const addSoft = (): void => {
    if (!softInput.trim()) return;
    updateSkills({
      ...resume.skills,
      soft: [...resume.skills.soft, softInput.trim()],
    });
    setSoftInput('');
  };

  const removeTechnical = (index: number): void => {
    updateSkills({
      ...resume.skills,
      technical: resume.skills.technical.filter((_, i) => i !== index),
    });
  };

  const removeSoft = (index: number): void => {
    updateSkills({
      ...resume.skills,
      soft: resume.skills.soft.filter((_, i) => i !== index),
    });
  };

  const inputClass = 'flex-1 border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 text-sm';

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-bold text-gray-800'>Skills</h2>

      {/* Technical Skills */}
      <div>
        <label className='font-semibold text-gray-700 text-sm mb-2 block'>
          Technical Skills
        </label>
        <div className='flex gap-2'>
          <input value={techInput} onChange={e => setTechInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTechnical()}
            placeholder='e.g. React, TypeScript...' className={inputClass} />
          <button onClick={addTechnical}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold'>
            Add
          </button>
        </div>
        <div className='flex flex-wrap gap-2 mt-3'>
          {resume.skills.technical.map((skill, i) => (
            <span key={i}
              className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center gap-1'>
              {skill}
              <button onClick={() => removeTechnical(i)} className='hover:text-red-500 font-bold'>×</button>
            </span>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <label className='font-semibold text-gray-700 text-sm mb-2 block'>
          Soft Skills
        </label>
        <div className='flex gap-2'>
          <input value={softInput} onChange={e => setSoftInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSoft()}
            placeholder='e.g. Leadership, Teamwork...' className={inputClass} />
          <button onClick={addSoft}
            className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold'>
            Add
          </button>
        </div>
        <div className='flex flex-wrap gap-2 mt-3'>
          {resume.skills.soft.map((skill, i) => (
            <span key={i}
              className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-1'>
              {skill}
              <button onClick={() => removeSoft(i)} className='hover:text-red-500 font-bold'>×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}