// Definición de tipos para la aplicación

// Modelo de Usuario
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  interests?: string[];
  joinedDate?: string;
}

// Modelo de Evento
export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration?: string;
  location: string;
  organizer: string;
  organizerId: string;
  maxAttendees?: number;
  attendees?: string[];
}

// Modelo de Chat
export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
}

// Modelo de Mensaje
export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isMe: boolean;
}

// Modelo para items de Exploración
export interface ExploreItem {
  id: string;
  title: string;
  category: string;
  location: string;
  participants: number;
  description?: string;
}