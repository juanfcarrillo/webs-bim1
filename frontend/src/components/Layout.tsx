// frontend/src/components/Layout.tsx (actualizado)
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  const handleLogout = () => {
    logout();
  };

  // Si no hay usuario y no estamos en la página de login, no mostrar el layout completo
  if (!user && location.pathname !== '/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            PetVet
          </Link>
          
          {user && (
            <div className="flex items-center space-x-4">
              {/* Menú específico por rol */}
              {user.role === 'client' && (
                <>
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
                    Mis Citas
                  </Link>
                  <Link
                    to="/chat"
                    className={`text-white px-3 py-2 rounded-md ${isActive('/chat')}`}
                  >
                    Chat
                  </Link>
                </>
              )}

              {user.role === 'veterinarian' && (
                <>
                  <Link
                    to="/veterinarian"
                    className={`text-white px-3 py-2 rounded-md ${isActive('/chat')}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/chat"
                    className={`text-white px-3 py-2 rounded-md ${isActive('/chat')}`}
                  >
                    Chat
                  </Link>
                </>
              )}

              {user.role === 'admin' && (
                <>
                  <Link
                    to="/admin"
                    className={`text-white px-3 py-2 rounded-md ${isActive('/admin')}`}
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {/* Información del usuario y logout */}
              <span className="text-white text-sm">
                {user.username} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;