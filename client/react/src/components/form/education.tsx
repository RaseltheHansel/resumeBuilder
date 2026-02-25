import { useState } from 'react';
import { useResume } from '../../context/resumeContext';
import type { Education } from '../../types';

export default function EducationForm() {
  const { resume, addEducation } = useResume();
  const [form, setForm] = useState<Omit<Education, 'id'>>({
    school:    '',
    degree:    '',
    field:     '',
    startDate: '',
    endDate:   '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = (): void => {
    if (!form.school || !form.degree) {
      alert('Please fill in school and degree');
      return;
    }
    addEducation({ ...form, id: Date.now().toString() });
    setForm({ school: '', degree: '', field: '', startDate: '', endDate: '' });
  };

  const inputClass = 'w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 text-sm';

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold text-gray-800'>Education</h2>

      <input name='school' value={form.school} onChange={handleChange}
        placeholder='School / University' className={inputClass} />

      <div className='grid grid-cols-2 gap-3'>
        <input name='degree' value={form.degree} onChange={handleChange}
          placeholder='Degree (e.g. Bachelor)' className={inputClass} />
        <input name='field' value={form.field} onChange={handleChange}
          placeholder='Field of Study' className={inputClass} />
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <input name='startDate' value={form.startDate} onChange={handleChange}
          placeholder='Start (e.g. 2020)' className={inputClass} />
        <input name='endDate' value={form.endDate} onChange={handleChange}
          placeholder='End (e.g. 2024)' className={inputClass} />
      </div>

      <button onClick={handleAdd}
        className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold text-sm'>
        + Add Education
      </button>

      {/* Added education list */}
      {resume.education.map((edu) => (
        <div key={edu.id} className='border border-gray-200 p-3 rounded-lg bg-gray-50'>
          <p className='font-bold text-sm'>{edu.degree} in {edu.field}</p>
          <p className='text-gray-500 text-xs'>{edu.school} · {edu.startDate} - {edu.endDate}</p>
        </div>
      ))}
    </div>
  );
}