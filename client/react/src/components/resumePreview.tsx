import { useResume } from '../context/resumeContext';

export default function ResumePreview() {
  const { resume } = useResume();
  const info = resume.personalInfo;

  const downloadPDF = (): void => {
    import('html2pdf.js').then((m) => {
      const el = document.getElementById('resume-preview');
      if (el) m.default().from(el).save('my-resume.pdf');
    });
  };

  return (
    <div>
      <button
        onClick={downloadPDF}
        className='mb-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold text-sm'
      >
        📄 Download PDF
      </button>

      <div id='resume-preview' className='bg-white p-6 shadow text-xs font-sans'>

        {/* Header */}
        <div className='border-b-2 border-blue-600 pb-3 mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>
            {info.fullName || 'Your Name'}
          </h1>
          <div className='flex flex-wrap gap-3 mt-1 text-gray-600'>
            {info.email    && <span>📧 {info.email}</span>}
            {info.phoneNumber  && <span>📞 {info.phoneNumber}</span>}
            {info.location && <span>📍 {info.location}</span>}
            {info.linkedIn && <span>🔗 LinkedIn</span>}
            {info.github   && <span>💻 GitHub</span>}
          </div>
        </div>

        {/* Summary */}
        {info.summary && (
          <div className='mb-4'>
            <h2 className='text-sm font-bold text-blue-600 uppercase tracking-wider mb-1'>
              Summary
            </h2>
            <p className='text-gray-700 leading-relaxed'>{info.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-sm font-bold text-blue-600 uppercase tracking-wider mb-2'>
              Experience
            </h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} className='mb-3'>
                <div className='flex justify-between'>
                  <div>
                    <p className='font-bold'>{exp.position}</p>
                    <p className='text-gray-500 italic'>{exp.company}</p>
                  </div>
                  <span className='text-gray-400'>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className='mt-1 text-gray-700 whitespace-pre-line'>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-sm font-bold text-blue-600 uppercase tracking-wider mb-2'>
              Education
            </h2>
            {resume.education.map((edu) => (
              <div key={edu.id} className='flex justify-between mb-2'>
                <div>
                  <p className='font-bold'>{edu.degree} in {edu.field}</p>
                  <p className='text-gray-500'>{edu.school}</p>
                </div>
                <span className='text-gray-400'>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume.skills.technical.length > 0 && (
          <div>
            <h2 className='text-sm font-bold text-blue-600 uppercase tracking-wider mb-2'>
              Skills
            </h2>
            <div className='flex flex-wrap gap-2'>
              {resume.skills.technical.map((skill, i) => (
                <span key={i} className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs'>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}