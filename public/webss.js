let socket;

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        console.log('WebSocket connection established.');
    };
    socket.onclose = (event) => {
        console.log('WebSocket connection closed.');
    };
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    socket.onmessage = async (event) => {
        try {
            if (event.data instanceof Blob) {
                const blobText = await event.data.text();
                console.log('Received Blob data:', blobText);
                const data = JSON.parse(blobText);
                displayEditingMessage(data);
                return;
            } else {
                const data = JSON.parse(event.data);
                const message = `User ${data.username} updated ${data.maxType} to ${data.newValue}`;
                displayEditingMessage(message);
            }
        } catch (error) {
            console.error('Error parsing or processing message:', error);
        }
    };
}

function sendMessage(message) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not open.');
    }
}

function displayEditingMessage(data) {
    try {
        const { username, maxType, newValue } = data;
        const message = `${username} updated ${maxType} to ${newValue}`;
        const container = document.getElementById('editing-messages-container');
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        container.appendChild(messageElement);
    } catch (error) {
        console.error('Error parsing or processing message:', error);
    }
}
