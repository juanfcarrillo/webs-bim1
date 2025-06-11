import { useState, useEffect } from 'react';

interface IUser {
  _id: string;
  username: string;
  email: string;
  role: 'client' | 'veterinarian' | 'admin';
}

interface Appointment {
  petName: string;
  appointmentDate: string;
  ownerName: string;
  reason: string;
  veterinarian: string;
}

const Appointments = () => {
  const [formData, setFormData] = useState<Appointment>({
    petName: '',
    appointmentDate: '',
    ownerName: '',
    reason: '',
    veterinarian: ''
  });

  const [veterinarians, setVeterinarians] = useState<IUser[]>([]);
  const [loadingVets, setLoadingVets] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/users?role=veterinarian')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const veterinarios = (data.data as IUser[]).filter(user => user.role === 'veterinarian');
          setVeterinarians(veterinarios);
        }
      })
      .catch(err => console.error('Error cargando veterinarios:', err))
      .finally(() => setLoadingVets(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)  // aquí envías todo el objeto con 'veterinarian' incluido
    });

    const result = await response.json();

    if (result.success) {
      alert('Cita creada con éxito');
      setFormData({
        petName: '',
        appointmentDate: '',
        ownerName: '',
        reason: '',
        veterinarian: ''
      });
    } else {
      alert('Error al crear la cita: ' + result.message);
    }
  } catch (error) {
    alert('Error de conexión con el servidor');
    console.error(error);
  }
};


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Schedule an Appointment</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Nombre de la mascota */}
        <div className="mb-4">
          <label htmlFor="petName" className="block text-gray-700 font-medium mb-2">
            Pet Name
          </label>
          <input
            type="text"
            id="petName"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Nombre del dueño */}
        <div className="mb-4">
          <label htmlFor="ownerName" className="block text-gray-700 font-medium mb-2">
            Owner Name
          </label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Fecha y hora de la cita */}
        <div className="mb-4">
          <label htmlFor="appointmentDate" className="block text-gray-700 font-medium mb-2">
            Appointment Date & Time
          </label>
          <input
            type="datetime-local"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Motivo de la cita */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">
            Reason for Appointment
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        {/* Seleccionar veterinario */}
        <div className="mb-4">
          <label htmlFor="veterinarian" className="block text-gray-700 font-medium mb-2">
            Select Veterinarian
          </label>
          {loadingVets ? (
            <p>Cargando veterinarios...</p>
          ) : (
            <select
              id="veterinarian"
              name="veterinarian"
              value={formData.veterinarian}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                -- Select a Veterinarian --
              </option>
              {veterinarians.map(vet => (
                <option key={vet._id} value={vet._id}>
                  {vet.username} ({vet.email})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointments;
