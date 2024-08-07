const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log("WebSocket connected");
    socket.on('disconnect', () => {
        console.log("WebSocket disconnected");
    });
});

// Middleware setup
const corsOptions = {
    origin: 'http://localhost:5173', // Adjust this to match your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authorization headers
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser
app.use('/api', apiRoutes);

// Start server and WebSocket
const setUpAndStartServer = () => {
    server.listen(3000, () => {
        console.log("Server running on port 3000");
    });
};

setUpAndStartServer();

module.exports = {
    io,
    server // Export the server if you need it for testing or other purposes
};
