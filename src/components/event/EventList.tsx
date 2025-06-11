import React from 'react';
import { PlusCircle, Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  time: string;
  organizer: string;
  image?: string;
}

interface EventListProps {
  onCreateEvent: () => void;
  onViewDetails: (event: Event) => void;
}

export const EventList: React.FC<EventListProps> = ({ onCreateEvent, onViewDetails }) => {
  // Lista de eventos de ejemplo
  const events: Event[] = [
    {
      id: '1',
      title: 'Clase de español',
      date: '15 de mayo, 2025',
      location: 'Centro Cultural',
      time: '18:00 - 20:00',
      organizer: 'Academia Española',
      image: 'https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg'
    },
    {
      id: '2',
      title: 'Noche de cine',
      date: '20 de mayo, 2025',
      location: 'Parque Central',
      time: '19:30 - 22:00',
      organizer: 'Club de Cine',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'
    },
    {
      id: '3',
      title: 'Mercado artesanal',
      date: '23 de mayo, 2025',
      location: 'Plaza Mayor',
      time: '10:00 - 18:00',
      organizer: 'Asociación de Artesanos',
      image: 'https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Eventos</h1>
        <button
          onClick={onCreateEvent}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          <span>Crear</span>
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay eventos disponibles</p>
          <button
            onClick={onCreateEvent}
            className="mt-4 text-indigo-600 hover:text-indigo-800"
          >
            Crear tu primer evento
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => onViewDetails(event)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            >
              {event.image && (
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{event.title}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-200" />
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-300">
                  Organizado por: {event.organizer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};