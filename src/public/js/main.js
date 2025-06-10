document.addEventListener('DOMContentLoaded', () => {
    // Connect to Socket.io
    const socket = io();

    // DOM Elements
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const appointmentForm = document.getElementById('appointmentForm');

    // Handle chat form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            // Send message to server
            socket.emit('chat message', message);
            
            // Add message to chat
            addMessageToChat(message, 'user');
            
            // Clear input
            messageInput.value = '';
        }
    });

    // Handle appointment form submission
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const petName = document.getElementById('petName').value;
        const appointmentDate = document.getElementById('appointmentDate').value;

        // Send appointment request to server
        socket.emit('new appointment', { petName, appointmentDate });

        // Clear form
        appointmentForm.reset();
        alert('Cita agendada correctamente');
    });

    // Socket.io event listeners
    socket.on('chat message', (msg) => {
        addMessageToChat(msg, 'vet');
    });

    // Helper function to add messages to chat
    function addMessageToChat(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});