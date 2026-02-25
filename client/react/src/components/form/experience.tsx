import { useState } from 'react';
import { useResume } from '../../context/resumeContext';
import type { Experience } from '../../types';
import api from '../../api/axios';

export default function ExperienceForm() {
  const { resume, addExperience } = useResume();
  const [form, setForm] = useState<Omit<Experience, 'id'>>({
    company:     '',
    position:    '',
    startDate:   '',
    endDate:     '',
    current:     false,
    description: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const generateBullets = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.post<{ bullets: string }>('/ai/experience', {
        position:        form.position || 'Developer',
        company:         form.company  || 'Company',
        responsibilities: 'General development tasks',
      });
      setForm(prev => ({ ...prev, description: res.data.bullets }));
    } catch {
      alert('AI failed. Check your Gemini API key.');
    }
    setLoading(false);
  };

  const handleAdd = (): void => {
    if (!form.company || !form.position) {
      alert('Please fill in company and position');
      return;
    }
    addExperience({ ...form, id: Date.now().toString() });
    setForm({ company: '', position: '', startDate: '', endDate: '', current: false, description: '' });
  };

  const inputClass = 'w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 text-sm';

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold text-gray-800'>Work Experience</h2>

      <div className='grid grid-cols-2 gap-3'>
        <input name='company' value={form.company} onChange={handleChange}
          placeholder='Company Name' className={inputClass} />
        <input name='position' value={form.position} onChange={handleChange}
          placeholder='Job Title' className={inputClass} />
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <input name='startDate' value={form.startDate} onChange={handleChange}
          placeholder='Start (e.g. Jan 2022)' className={inputClass} />
        <input name='endDate' value={form.endDate} onChange={handleChange}
          placeholder='End (e.g. Dec 2023)' className={inputClass}
          disabled={form.current} />
      </div>

      <label className='flex items-center gap-2 text-sm text-gray-600'>
        <input type='checkbox' name='current' checked={form.current} onChange={handleChange} />
        I currently work here
      </label>

      <div>
        <div className='flex justify-between items-center mb-2'>
          <label className='font-semibold text-gray-700 text-sm'>Description</label>
          <button onClick={generateBullets} disabled={loading}
            className='bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-3 py-1 rounded-lg text-xs font-bold'>
            {loading ? 'Generating...' : '✨ AI Bullets'}
          </button>
        </div>
        <textarea name='description' value={form.description} onChange={handleChange}
          placeholder='Click AI Bullets to auto-generate!' rows={4} className={inputClass} />
      </div>

      <button onClick={handleAdd}
        className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold text-sm'>
        + Add Experience
      </button>

      {/* Added experience list */}
      {resume.experience.map((exp) => (
        <div key={exp.id} className='border border-gray-200 p-3 rounded-lg bg-gray-50'>
          <p className='font-bold text-sm'>{exp.position}</p>
          <p className='text-gray-500 text-xs'>{exp.company} · {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
        </div>
      ))}
    </div>
  );
}