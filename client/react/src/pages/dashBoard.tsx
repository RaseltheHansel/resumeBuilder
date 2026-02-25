import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='max-w-4xl mx-auto p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>My Resumes</h1>
          <button onClick={() => navigate('/builder')}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm'>
            + Create New Resume
          </button>
        </div>
        <div className='bg-white rounded-2xl shadow p-8 text-center text-gray-400'>
          <p className='text-4xl mb-3'>📄</p>
          <p className='font-semibold'>No resumes yet</p>
          <p className='text-sm mt-1'>Click Create New Resume to get started</p>
        </div>
      </div>
    </div>
  );
}