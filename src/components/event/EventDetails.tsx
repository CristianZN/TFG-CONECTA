import React from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, MessageCircle } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  time: string;
  organizer: string;
  description?: string;
  attendees?: string[];
  image?: string;
}

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack }) => {
  // Datos adicionales de ejemplo
  const fullEvent = {
    ...event,
    description: event.description || 'Un evento emocionante donde podrás conocer gente nueva y disfrutar de actividades divertidas. ¡No te lo pierdas!',
    attendees: event.attendees || ['María García', 'Carlos Rodríguez', 'Ana Martínez', 'Pedro López'],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {fullEvent.image && (
          <div className="w-full h-64 relative">
            <img 
              src={fullEvent.image}
              alt={fullEvent.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{fullEvent.title}</h1>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-3 text-indigo-600" />
              <span>{fullEvent.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-3 text-indigo-600" />
              <span>{fullEvent.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-3 text-indigo-600" />
              <span>{fullEvent.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-3 text-indigo-600" />
              <span>Organizado por: {fullEvent.organizer}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold mb-2">Acerca del evento</h2>
            <p className="text-gray-700">{fullEvent.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-2">Asistentes ({fullEvent.attendees.length})</h2>
            <div className="space-y-1">
              {fullEvent.attendees.map((attendee, index) => (
                <div key={index} className="flex items-center py-1">
                  <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-medium">
                    {attendee.charAt(0)}
                  </div>
                  <span className="ml-3 text-gray-700">{attendee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Unirse al evento
            </button>
            <button className="flex items-center text-indigo-600 px-4 py-2 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
              <MessageCircle className="h-5 w-5 mr-1" />
              <span>Mensaje</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};