import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';

interface CreateEventFormProps {
  onBack: () => void;
  lat?: number;
  lng?: number;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onBack, lat, lng }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState(() => (lat && lng ? `${lat.toFixed(5)}, ${lng.toFixed(5)}` : ''));
  const [description, setDescription] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [error, setError] = useState('');

  // Si se pasa lat/lng, mostrarlo en el campo de ubicación (solo como texto informativo)
  const locationInfo = lat && lng ? `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}` : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación simple
    if (!title || !date || !time || !location) {
      setError('Por favor, completa los campos obligatorios');
      return;
    }

    // En una aplicación real, aquí se guardaría el evento
    // Para esta demo, simplemente volver atrás
    setError('');
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 ml-4">Crear Evento</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Título del evento *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
            placeholder="Ej. Clase de español"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              <Calendar className="inline h-4 w-4 mr-1" />
              Fecha *
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              <Clock className="inline h-4 w-4 mr-1" />
              Hora de inicio *
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Duración (horas)
            </label>
            <input
              id="duration"
              type="number"
              min="0.5"
              step="0.5"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
              placeholder="Ej. 2"
            />
          </div>

          <div>
            <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              <Users className="inline h-4 w-4 mr-1" />
              Número máximo de asistentes
            </label>
            <input
              id="maxAttendees"
              type="number"
              min="1"
              value={maxAttendees}
              onChange={(e) => setMaxAttendees(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
              placeholder="Ej. 20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            <MapPin className="inline h-4 w-4 mr-1" />
            Ubicación *
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
            placeholder="Ej. Centro Cultural, Calle Principal 123"
          />
          {locationInfo && (
            <div className="text-xs text-gray-500 mt-1">Coordenadas seleccionadas: {locationInfo}</div>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
            placeholder="Describe tu evento..."
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear Evento
          </button>
        </div>
      </form>
    </div>
  );
};