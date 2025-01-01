function authenticateViaWebSocket(url, login, password) {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            const payload = JSON.stringify({ login, password });
            socket.send(payload);
        };

        socket.onmessage = (event) => {
            try {
                const response = JSON.parse(event.data);

                if (response.token) {
                    localStorage.setItem('authToken', response.token);
                    resolve('Token stored successfully');
                } else {
                    reject('No token received');
                }
            } catch (error) {
                reject('Error parsing server response');
            } finally {
                socket.close();
            }
        };

        socket.onerror = (error) => {
            reject(`WebSocket error: ${error.message}`);
        };

        socket.onclose = (event) => {
            if (!event.wasClean) {
                reject(`WebSocket closed unexpectedly: ${event.reason}`);
            }
        };
    });
}
