// frontend/src/App.tsx (actualizado)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Chat from './pages/Chat';
import { VeterinarianDashboard, AdminDashboard } from './pages/VeterinarianDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Ruta pública */}
            <Route path="/login" element={<Login />} />
            
            {/* Rutas para clientes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/appointments" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <Appointments />
                </ProtectedRoute>
              } 
            />
            
            {/* Ruta para veterinarios */}
            <Route 
              path="/veterinarian" 
              element={
                <ProtectedRoute allowedRoles={['veterinarian']}>
                  <VeterinarianDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Ruta para admin */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Chat disponible para clientes y veterinarios */}
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute allowedRoles={['client', 'veterinarian']}>
                  <Chat />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;