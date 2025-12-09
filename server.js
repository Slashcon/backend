const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: [
        'http://localhost:3000',    // React dev server
        'http://localhost:5173',    // Vite dev server
        'app://./',                 // Electron app
        'file://',                  // File protocol for Electron
        'https://localhost:3000',
        'https://localhost:5173'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,   // 15 минут
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const { sequelize } = require('./models');

const io = socketIo(server, {
    cors: {
        origin: corsOptions.origin,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const serverRoutes = require('./routes/servers');
const channelRoutes = require('./routes/channels');
const messageRoutes = require('./routes/messages');
const voiceRoutes = require('./routes/voice');
const inviteRoutes = require('./routes/invites');
const moderationRoutes = require('./routes/moderation');
const { error } = require('console');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/servers', serverRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/invites', inviteRoutes);
app.use('/api/moderation', moderationRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

io.use(require('./middleware/socketAuth').authenticateSocket);

io.on('connection', (socket) => {
    console.log('User connected:', socket.user.id);

    socket.on('join-server', (serverId) => {
        socket.join(`server-${serverId}`);
        console.log(`User ${socket.user.id} joined server ${serverId}`);
    });

    socket.on('leave-server', (serverId) => {
        socket.leave(`server-${serverId}`);
        console.log(`User ${socket.user.id} left server ${serverId}`);
    });

    socket.on('disconnect', (reason) => {
        console.log(`User disconnected:`, socket.uset.id, 'reason:', reason);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT;

const startServer = async() => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        await sequelize.sync({ alter: true });
        console.log('Database synchronized');

        server.listen(PORT, () => {
            console.log(`Slashcon backend server running on port ${PORT}`);
        });
    }   catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit();
    }
};

startServer();

module.exports = { app, io };