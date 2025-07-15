import React, { useState, useRef, useEffect } from 'react';
import { Send, Check, X, Minus } from 'lucide-react';
import './Chat.css'; // Importar el archivo CSS

const ChatWindow = ({ isOpen, onClose, onMinimize }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      content: 'Hola, buenas tardes ¿Las bandanas son ajustables para perros pequeños?',
      timestamp: '4:08 p.m.',
      isRead: true
    },
    {
      id: 2,
      type: 'assistant',
      content: 'Hola! 🐕 Sí, nuestras bandanas tienen broche ajustable o cintas, según el modelo, y contamos con tallas especiales para razas pequeñas. ¿Te gustaría que te ayudemos a elegir la talla ideal para tu perrito?',
      timestamp: '4:13 p.m.',
      isRead: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        type: 'user',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        isRead: false
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simular respuesta del asistente
      setIsTyping(true);
      setTimeout(() => {
        const assistantMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: 'Gracias por tu mensaje. Te responderemos pronto.',
          timestamp: new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
          isRead: false
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-overlay">
      <div className="chat-window">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-title">
            <div className="chat-logo">🐕</div>
            <span>BANDOGGIE</span>
          </div>
          <div className="chat-controls">
            <button 
              className="chat-control-btn minimize-btn"
              onClick={onMinimize}
              aria-label="Minimizar"
            >
              <div className="minimize-btn"></div>
            </button>
            <button 
              className="chat-control-btn close-btn"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="chat-content">
          <div className="chat-info">
            !! Los mensajes se guardarán en un historial !!
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-bubble">
                  {message.content}
                </div>
                <div className="message-time">
                  <span>{message.timestamp}</span>
                  {message.type === 'user' && message.isRead && (
                    <Check className="message-check" size={12} />
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message assistant">
                <div className="message-bubble">
                  <span>Escribiendo...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <input
              type="text"
              className="chat-input"
              placeholder="Mensaje"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isTyping}
              aria-label="Enviar mensaje"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;