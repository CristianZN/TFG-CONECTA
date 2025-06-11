import React from 'react';
import { Calendar, MessageSquare, Map, Compass, User } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'eventos', label: 'Eventos', icon: Calendar },
    { id: 'chats', label: 'Chats', icon: MessageSquare },
    { id: 'mapa', label: 'Mapa', icon: Map },
    { id: 'explorar', label: 'Explorar', icon: Compass },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-5 items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center h-full text-xs ${
                  isActive 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};