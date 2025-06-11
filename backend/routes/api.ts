import express, { Router } from 'express';
import User from '../models/User';

const router: Router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación de campos
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email y contraseña son requeridos' 
      });
    }

    // Buscar usuario
    const user = await User.findOne({ email: email.trim() });
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Credenciales inválidas' 
      });
    }

    // Comparar contraseñas (en texto plano por ahora)
    if (user.password !== password.trim()) {
      return res.status(401).json({ 
        success: false,
        message: 'Credenciales inválidas' 
      });
    }

    // Crear respuesta sin password
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.json({
      success: true,
      message: 'Login exitoso',
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

// Otras rutas...
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

export default router;