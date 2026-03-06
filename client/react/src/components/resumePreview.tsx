import { useState } from 'react';
import { useResume } from '../context/resumeContext';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResumePreview() {
  const { resume } = useResume();
  const info = resume.personalInfo;
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async (): Promise<void> => {
    if (downloading) return;
    setDownloading(true);

    try {
      const el = document.getElementById('resume-preview');
      if (!el) throw new Error('Element not found');

      // Inject temp style to override oklch colors
      const tempStyle = document.createElement('style');
      tempStyle.textContent = `
        *, *::before, *::after {
          color: inherit !important;
          background-color: inherit !important;
          border-color: #e5e7eb !important;
        }
        #resume-preview { background-color: #ffffff !important; color: #111111 !important; }
        #resume-preview h1 { color: #111111 !important; }
        #resume-preview h2 { color: #2563eb !important; }
        #resume-preview p { color: #374151 !important; }
        #resume-preview span { color: #374151 !important; }
        #resume-preview .text-gray-500 { color: #6b7280 !important; }
        #resume-preview .text-gray-400 { color: #9ca3af !important; }
        #resume-preview .text-blue-600 { color: #2563eb !important; }
        #resume-preview .bg-blue-100 { background-color: #dbeafe !important; }
        #resume-preview .text-blue-700 { color: #1d4ed8 !important; }
        #resume-preview .border-blue-600 { border-color: #2563eb !important; }
      `;
      document.head.appendChild(tempStyle);

      // Wait for styles to apply
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: el.scrollWidth,
        height: el.scrollHeight,
      });

      // Remove temp style after capture
      document.head.removeChild(tempStyle);

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${info.fullName || 'resume'}.pdf`);

    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <button
        onClick={downloadPDF}
        disabled={downloading}
        className='mb-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-2 rounded-lg font-bold text-sm transition-colors'
      >
        {downloading ? '⏳ Generating PDF...' : '📄 Download PDF'}
      </button>

      <div id='resume-preview' className='bg-white p-6 shadow text-xs font-sans'>

        {/* Header */}
        <div className='border-b-2 border-blue-600 pb-3 mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>
            {info.fullName || 'Your Name'}
          </h1>
          <div className='flex flex-wrap gap-3 mt-1 text-gray-600'>
            {info.email       && <span>{info.email}</span>}
            {info.phoneNumber && <span>{info.phoneNumber}</span>}
            {info.location    && <span>{info.location}</span>}
            {info.linkedIn    && <a href={info.linkedIn} className='text-blue-600'>LinkedIn</a>}
            {info.github      && <a href={info.github} className='text-blue-600'>GitHub</a>}
          </div>
        </div>

        {/* Summary */}
        {info.summary && (
          <div className='mb-4'>
            <h2 className='text-sm font-bold text-blue-600 uppercase tracking-wider mb-1'>
              Summary
            </h2>
            <div className='text-gray-700 leading-relaxed'>
              <ReactMarkdown>{info.summary}</ReactMarkdown>
            </div>
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
                <div className='mt-1 text-gray-700'>
                  <ReactMarkdown>{exp.description}</ReactMarkdown>
                </div>
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
                <span className='text-gray-400'>{edu.startDate} - {edu.endDate}</span>
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