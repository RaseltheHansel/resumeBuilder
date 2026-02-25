import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useResume } from '../../context/resumeContext';
import api from '../../api/axios';

export default function PersonalInfo() {
  const { resume, updatePersonalInfo } = useResume();
  const [loading, setLoading] = useState<boolean>(false);
  const info = resume.personalInfo;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    updatePersonalInfo({ [e.target.name]: e.target.value });
  };

  const generateSummary = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.post<{ summary: string }>('/ai/summary', {
        name:       info.fullName || 'Professional',
        position:   'Software Developer',
        experience: 'React, Node.js, TypeScript, MongoDB',
        skills:     'React, TypeScript, Node.js, TailwindCSS',
      });
      updatePersonalInfo({ summary: res.data.summary });
    } catch {
      alert('AI failed. Check your Gemini API key.');
    }
    setLoading(false);
  };

  const inputClass = 'w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 text-sm';

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold text-gray-800'>Personal Information</h2>

      <input
        name='fullName'
        value={info.fullName}
        onChange={handleChange}
        placeholder='Full Name'
        className={inputClass}
      />

      <div className='grid grid-cols-2 gap-3'>
        <input
          name='email'
          value={info.email}
          onChange={handleChange}
          placeholder='Email'
          className={inputClass}
        />
        <input
          name='phoneNumber'
          value={info.phoneNumber}
          onChange={handleChange}
          placeholder='Phone'
          className={inputClass}
        />
      </div>

      <input
        name='location'
        value={info.location}
        onChange={handleChange}
        placeholder='Location (City, Country)'
        className={inputClass}
      />

      <div className='grid grid-cols-2 gap-3'>
        <input
          name='linkedin'
          value={info.linkedIn}
          onChange={handleChange}
          placeholder='LinkedIn URL'
          className={inputClass}
        />
        <input
          name='github'
          value={info.github}
          onChange={handleChange}
          placeholder='GitHub URL'
          className={inputClass}
        />
      </div>

      <div>
        <div className='flex justify-between items-center mb-2'>
          <label className='font-semibold text-gray-700 text-sm'>
            Professional Summary
          </label>
          <button
            onClick={generateSummary}
            disabled={loading}
            className='bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-3 py-1 rounded-lg text-xs font-bold'
          >
            {loading ? 'Generating...' : '✨ AI Generate'}
          </button>
        </div>
        <textarea
          name='summary'
          value={info.summary}
          onChange={handleChange}
          placeholder='Click AI Generate to auto-write this!'
          rows={4}
          className={inputClass}
        />
      </div>
    </div>
  );
}