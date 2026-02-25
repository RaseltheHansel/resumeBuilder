import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ResumeProvider } from './context/resumeContext';
import Login    from './pages/login';
import Register from './pages/register';
import Builder  from './pages/builder';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to='/login' replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <Routes>
          <Route path='/login'    element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/builder'
            element={
              <ProtectedRoute>
                <Builder />
              </ProtectedRoute>
            }
          />
          <Route path='/' element={<Navigate to='/login' replace />} />
        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}