// backend/routes/api.ts
import express, { Router } from 'express';
import User from '../models/User';

const router: Router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;