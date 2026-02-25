import PersonalInfo  from '../components/form/personalInfo';
import ResumePreview from '../components/resumePreview';

export default function Builder() {
  return (
    <div className='flex h-screen bg-gray-100'>

      {/* LEFT — Form */}
      <div className='w-1/2 overflow-y-auto p-6 bg-gray-50'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>
          Build Your Resume
        </h1>
        <PersonalInfo />
      </div>

      {/* RIGHT — Live Preview */}
      <div className='w-1/2 overflow-y-auto p-6 bg-white shadow-inner'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          Live Preview
        </h1>
        <ResumePreview />
      </div>

    </div>
  );
}