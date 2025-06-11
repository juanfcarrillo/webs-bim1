import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import connectDB from './config/database';
// In your backend/index.ts
import apiRoutes from './routes/api';


// Connect to MongoDB
dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
// app.use('/api/appointments', /* your appointment routes */);

app.use('/api', apiRoutes);

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  });
}

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? false 
      : ["http://localhost:5173"], // Vite's default port
    methods: ["GET", "POST"]
  }
});

// Keep track of connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle user joining
  socket.on('join', (userId) => {
    connectedUsers.set(socket.id, userId);
    console.log(`User ${userId} joined`);
  });

  // Handle chat messages
  socket.on('chat message', (message) => {
    const sender = connectedUsers.get(socket.id);
    const messageData = {
      text: message,
      sender,
      timestamp: new Date()
    };
    
    // Broadcast the message to all connected clients except sender
    socket.broadcast.emit('chat message', messageData);
  });

  // Handle typing indicator
  socket.on('typing', () => {
    const sender = connectedUsers.get(socket.id);
    socket.broadcast.emit('user typing', sender);
  });

  // Handle when user stops typing
  socket.on('stop typing', () => {
    const sender = connectedUsers.get(socket.id);
    socket.broadcast.emit('user stop typing', sender);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const userId = connectedUsers.get(socket.id);
    connectedUsers.delete(socket.id);
    console.log(`User ${userId} disconnected`);
  });
});

app.use('/api', apiRoutes);