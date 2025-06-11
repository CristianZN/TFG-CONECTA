import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  organizer: string;
  participants?: string[];
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Clase de español',
      date: '15 de mayo, 2025',
      time: '18:00 - 20:00',
      location: 'Centro Cultural',
      description: 'Practica español con hablantes nativos en un ambiente amigable y divertido.',
      organizer: 'Academia Española',
      participants: ['María García', 'Carlos Rodríguez', 'Ana Martínez']
    },
    {
      id: '2',
      title: 'Noche de cine',
      date: '20 de mayo, 2025',
      time: '19:30 - 22:00',
      location: 'Parque Central',
      description: 'Proyección al aire libre de películas en español con subtítulos.',
      organizer: 'Club de Cine',
      participants: ['Pedro López', 'Laura Fernández']
    }
  ]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, updatedFields: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updatedFields } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const getEvent = (id: string) => {
    return events.find(event => event.id === id);
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};