import React from 'react';
import { User, Settings, LogOut, MessageCircle, Calendar, Bell, Shield } from 'lucide-react';
import { signOut } from '../../services/auth';

interface ProfileViewProps {
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  // Datos del usuario de ejemplo
  const user = {
    name: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    joinedDate: 'Mayo 2025',
    interests: ['Idiomas', 'Arte', 'Tecnología'],
    eventsAttended: 12,
    connections: 24
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Perfil</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-800 dark:text-indigo-300 text-xl font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">Miembro desde {user.joinedDate}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-b border-gray-200 dark:border-gray-700 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">{user.eventsAttended}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Eventos asistidos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">{user.connections}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Conexiones</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Intereses</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li>
            <a className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-300 mr-3" />
              <span>Editar perfil</span>
            </a>
          </li>
          <li>
            <a className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-300 mr-3" />
              <span>Mis eventos</span>
            </a>
          </li>
          <li>
            <a className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <MessageCircle className="h-5 w-5 text-gray-500 dark:text-gray-300 mr-3" />
              <span>Mis mensajes</span>
            </a>
          </li>
          <li>
            <a className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <Bell className="h-5 w-5 text-gray-500 dark:text-gray-300 mr-3" />
              <span>Notificaciones</span>
            </a>
          </li>
          <li>
            <a className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <Shield className="h-5 w-5 text-gray-500 dark:text-gray-300 mr-3" />
              <span>Privacidad y seguridad</span>
            </a>
          </li>
          <li>
            <a className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <Settings className="h-5 w-5 text-gray-500 dark:text-gray-300 mr-3" />
              <span>Configuración</span>
            </a>
          </li>
          <li>
            <a 
              onClick={handleLogout}
              className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-red-600"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Cerrar sesión</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};