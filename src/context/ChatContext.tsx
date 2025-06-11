import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  participants: string[];
  name?: string;
  isGroupChat: boolean;
  lastMessage?: {
    content: string;
    timestamp: string;
    senderId: string;
  };
}

interface ChatContextType {
  chats: Chat[];
  messages: Record<string, Message[]>;
  createChat: (participants: string[], name?: string) => string;
  sendMessage: (chatId: string, content: string, senderId: string) => void;
  getChatMessages: (chatId: string) => Message[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      participants: ['user1', 'user2', 'user3'],
      name: 'Grupo Clase de Español',
      isGroupChat: true,
      lastMessage: {
        content: '¿Alguien tiene los apuntes de la clase de ayer?',
        timestamp: '11:30',
        senderId: 'user2'
      }
    },
    {
      id: '2',
      participants: ['user1', 'user4'],
      name: 'María García',
      isGroupChat: false,
      lastMessage: {
        content: 'Nos vemos mañana en el evento',
        timestamp: 'Ayer',
        senderId: 'user4'
      }
    }
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '101',
        chatId: '1',
        senderId: 'user2',
        content: 'Hola a todos, ¿alguien tiene los apuntes de la clase de ayer?',
        timestamp: '11:30'
      },
      {
        id: '102',
        chatId: '1',
        senderId: 'user3',
        content: 'Yo los tengo, puedo compartirlos más tarde',
        timestamp: '11:32'
      }
    ],
    '2': [
      {
        id: '201',
        chatId: '2',
        senderId: 'user1',
        content: 'Hola María, ¿cómo estás?',
        timestamp: '10:15'
      },
      {
        id: '202',
        chatId: '2',
        senderId: 'user4',
        content: 'Hola, muy bien gracias. ¿Irás al evento mañana?',
        timestamp: '10:20'
      },
      {
        id: '203',
        chatId: '2',
        senderId: 'user1',
        content: 'Sí, tengo planeado ir. ¿A qué hora llegarás?',
        timestamp: '10:25'
      },
      {
        id: '204',
        chatId: '2',
        senderId: 'user4',
        content: 'Nos vemos mañana en el evento',
        timestamp: 'Ayer'
      }
    ]
  });

  const createChat = (participants: string[], name?: string) => {
    const chatId = Date.now().toString();
    const isGroupChat = participants.length > 2;
    
    const newChat: Chat = {
      id: chatId,
      participants,
      name: isGroupChat ? name : undefined,
      isGroupChat
    };
    
    setChats([...chats, newChat]);
    setMessages({ ...messages, [chatId]: [] });
    
    return chatId;
  };

  const sendMessage = (chatId: string, content: string, senderId: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      chatId,
      senderId,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prevMessages => ({
      ...prevMessages,
      [chatId]: [...(prevMessages[chatId] || []), newMessage]
    }));
    
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? {
              ...chat,
              lastMessage: {
                content,
                timestamp: newMessage.timestamp,
                senderId
              }
            }
          : chat
      )
    );
  };

  const getChatMessages = (chatId: string) => {
    return messages[chatId] || [];
  };

  const value = {
    chats,
    messages,
    createChat,
    sendMessage,
    getChatMessages
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChats = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChats must be used within a ChatProvider');
  }
  return context;
};