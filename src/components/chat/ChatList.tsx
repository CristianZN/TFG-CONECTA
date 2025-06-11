import React from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface ChatListProps {
  onSelectChat: (chat: Chat) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ onSelectChat }) => {
  // Lista de chats de ejemplo
  const chats: Chat[] = [
    {
      id: '1',
      name: 'Grupo Clase de Español',
      lastMessage: '¿Alguien tiene los apuntes de la clase de ayer?',
      time: '11:30',
      unread: 3
    },
    {
      id: '2',
      name: 'María García',
      lastMessage: 'Nos vemos mañana en el evento',
      time: 'Ayer',
      unread: 0
    },
    {
      id: '3',
      name: 'Carlos Rodríguez',
      lastMessage: 'Gracias por la información',
      time: 'Ayer',
      unread: 0
    },
    {
      id: '4',
      name: 'Grupo Noche de Cine',
      lastMessage: 'Vamos a ver "El Laberinto del Fauno"',
      time: 'Lun',
      unread: 1
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Mensajes</h1>
      </div>

      {chats.length === 0 ? (
        <div className="text-center py-10">
          <MessageCircle className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="mt-2 text-gray-500">No tienes conversaciones activas</p>
        </div>
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-800 dark:text-indigo-300 font-medium">
                    {chat.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-300">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {chat.unread > 0 && (
                    <span className="inline-flex items-center justify-center h-5 w-5 text-xs bg-indigo-600 text-white rounded-full mr-2">
                      {chat.unread}
                    </span>
                  )}
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};