import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <nav className='bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex justify-between items-center'>
      <h1 className='text-xl font-bold text-blue-600'>AI Resume Builder</h1>
      <div className='flex items-center gap-4'>
        {user && <span className='text-gray-600 text-sm'>👋 {user.name}</span>}
        <button onClick={handleLogout}
          className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold'>
          Logout
        </button>
      </div>
    </nav>
  );
}