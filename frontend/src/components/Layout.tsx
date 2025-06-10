import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            PetVet
          </Link>
          <div className="space-x-4">
            <Link 
              to="/" 
              className={`text-white px-3 py-2 rounded-md ${isActive('/')}`}
            >
              Home
            </Link>
            <Link 
              to="/appointments" 
              className={`text-white px-3 py-2 rounded-md ${isActive('/appointments')}`}
            >
              Appointments
            </Link>
            <Link 
              to="/chat" 
              className={`text-white px-3 py-2 rounded-md ${isActive('/chat')}`}
            >
              Chat
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;