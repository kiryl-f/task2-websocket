const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    socket.on('message', (message) => {
        const { login, password } = JSON.parse(message);

        if (login === 'myUsername' && password === 'myPassword') {
            socket.send(JSON.stringify({ token: 'sample-token-123' }));
        } else {
            socket.send(JSON.stringify({ error: 'Invalid credentials' }));
        }
    });
});

console.log('WebSocket server running on ws://localhost:8080');
