import React from 'react';
import { MessageCircle } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-2 px-6 flex items-center border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <span className="text-indigo-500 dark:text-indigo-400 mr-2">
          <MessageCircle className="h-6 w-6" />
        </span>
        <span className="font-bold text-lg text-gray-800 dark:text-gray-100">Conecta</span>
      </div>
      <div className="flex-1" />
      {isLoggedIn && (
        <button
          onClick={onLogout}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ml-auto"
        >
          Cerrar Sesión
        </button>
      )}
    </header>
  );
};