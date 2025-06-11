// frontend/src/pages/VeterinarianDashboard.tsx
import { useAuth } from '../context/AuthContext';

const VeterinarianDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Panel de Veterinario
        </h1>
        <p className="text-green-700">Bienvenido, Dr. {user?.username}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Citas Pendientes</h2>
          <p className="text-gray-600 mb-4">
            Revisa y gestiona las citas programadas para hoy.
          </p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Ver Citas
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Mensajes de Clientes</h2>
          <p className="text-gray-600 mb-4">
            Responde a las consultas de los clientes.
          </p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Ver Mensajes
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Historial de Pacientes</h2>
          <p className="text-gray-600 mb-4">
            Consulta el historial médico de las mascotas.
          </p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Ver Historial
          </button>
        </div>
      </div>
    </div>
  );
};

// frontend/src/pages/AdminDashboard.tsx
const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          Panel de Administrador
        </h1>
        <p className="text-purple-700">Bienvenido, {user?.username}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Estadísticas Generales</h2>
          <div className="space-y-2">
            <p className="text-gray-600">• Total de citas: 45</p>
            <p className="text-gray-600">• Clientes activos: 23</p>
            <p className="text-gray-600">• Veterinarios: 3</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Gestión de Usuarios</h2>
          <p className="text-gray-600 mb-4">
            Administra clientes y veterinarios.
          </p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Gestionar Usuarios
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Reportes</h2>
          <p className="text-gray-600 mb-4">
            Genera reportes de actividad y rendimiento.
          </p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Ver Reportes
          </button>
        </div>
      </div>
    </div>
  );
};

export { VeterinarianDashboard, AdminDashboard };