import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface Message {
  _id?: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
}

const Chat = ({
  userId,
  receiverId
}: {
  userId: string;
  receiverId: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Si no hay userId válido, no hacemos nada
    if (!userId) {
      console.warn('No se puede unir al chat: userId inválido');
      return;
    }

    // Función para cargar mensajes previos
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/messages/${userId}/${receiverId}`);
        const data = await res.json();
        if (data.success) setMessages(data.messages);
      } catch (error) {
        console.error('Error al cargar mensajes:', error);
      }
    };

    fetchMessages();

    // Emitimos join solo si userId existe
    socket.emit('join', userId);

    // Escuchar mensajes nuevos
    const onNewMessage = (msg: Message) => {
      if (
        (msg.senderId === userId && msg.receiverId === receiverId) ||
        (msg.senderId === receiverId && msg.receiverId === userId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on('chat message', onNewMessage);

    // Limpieza al desmontar o cuando cambien userId o receiverId
    return () => {
      socket.off('chat message', onNewMessage);
    };
  }, [userId, receiverId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    if (!userId) {
      console.warn('No se puede enviar mensaje: userId inválido');
      return;
    }

    const msg: Message = {
      text: newMessage,
      senderId: userId,
      receiverId,
      timestamp: new Date().toISOString()
    };

    socket.emit('chat message', msg);
    setNewMessage('');
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Chat con Veterinario</h3>
      <div className="border rounded p-3 mb-3" style={{ height: '300px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 text-${msg.senderId === userId ? 'end' : 'start'}`}
          >
            <div className={`d-inline-block p-2 rounded ${msg.senderId === userId ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
              {msg.text}
            </div>
            <div className="small text-muted">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Escribe tu mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
        />
        <button className="btn btn-success" onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
