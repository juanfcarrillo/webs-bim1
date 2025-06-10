import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src','views', 'index.html'));
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
});