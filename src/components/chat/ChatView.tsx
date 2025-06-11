import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isMe: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface ChatViewProps {
  chat: Chat;
  onBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ chat, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  
  // Mensajes de ejemplo
  const messages: Message[] = [
    {
      id: '1',
      content: 'Hola, ¿cómo estás?',
      sender: chat.name,
      timestamp: '11:15',
      isMe: false
    },
    {
      id: '2',
      content: '¡Hola! Muy bien, gracias. ¿Y tú?',
      sender: 'Yo',
      timestamp: '11:18',
      isMe: true
    },
    {
      id: '3',
      content: 'Bien también. ¿Estás emocionado por el evento de mañana?',
      sender: chat.name,
      timestamp: '11:20',
      isMe: false
    },
    {
      id: '4',
      content: 'Sí, tengo muchas ganas de asistir. Será genial conocer a otros participantes.',
      sender: 'Yo',
      timestamp: '11:22',
      isMe: true
    },
    {
      id: '5',
      content: chat.lastMessage,
      sender: chat.name,
      timestamp: chat.time,
      isMe: false
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // En una aplicación real, aquí se enviaría el mensaje
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center p-4 bg-white dark:bg-gray-800 shadow-sm">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center ml-4">
          <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-medium">
            {chat.name.charAt(0)}
          </div>
          <span className="ml-2 font-medium">{chat.name}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs sm:max-w-sm md:max-w-md rounded-lg px-4 py-2 ${
                  message.isMe 
                    ? 'bg-indigo-600 dark:bg-indigo-700 text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none shadow'
                }`}
              >
                <p className="break-words">{message.content}</p>
                <div className={`text-xs mt-1 ${message.isMe ? 'text-indigo-200 dark:text-indigo-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
            placeholder="Escribe un mensaje..."
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};