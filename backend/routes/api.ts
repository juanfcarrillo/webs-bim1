// backend/routes/api.ts

import express, { Router } from 'express';
import User from '../models/User';
import Message from '../models/Message';
import Appointment from '../models/Appointment';

const router: Router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos' });
    }

    const user = await User.findOne({ email: email.trim() });

    if (!user || user.password !== password.trim()) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.json({ success: true, message: 'Login exitoso', user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const role = req.query.role?.toString(); // <-- asegúrate que es string

    if (role) {
      const users = await User.find({ role });
      return res.json({ success: true, data: users });
    }

    const users = await User.find(); // Si no hay filtro, trae todo
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.get('/messages/:appointmentId', async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const messages = await Message.find({ appointmentId }).sort({ timestamp: 1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener mensajes' });
  }
});

router.post('/appointments', async (req, res) => {
  try {
    const { petName, appointmentDate, ownerName, reason, veterinarian } = req.body;

    if (!petName || !appointmentDate || !ownerName || !reason || !veterinarian) {
      return res.status(400).json({ success: false, message: 'Faltan datos requeridos' });
    }

    const newAppointment = new Appointment({
      petName,
      appointmentDate: new Date(appointmentDate),
      ownerName,
      reason,
      veterinarian  // aquí usamos 'veterinarian' en vez de 'veterinarianId'
    });

    await newAppointment.save();

    res.status(201).json({ success: true, message: 'Cita creada correctamente', appointment: newAppointment });
  } catch (error) {
    console.error('Error al crear cita:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

export default router;
