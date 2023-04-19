import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log(`listening on *:${server.address().port}`);
});