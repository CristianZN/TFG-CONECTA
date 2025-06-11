import React, { useEffect, useState } from 'react';
import { TabNavigation } from './components/layout/TabNavigation';
import { Header } from './components/layout/Header';
import { AuthForm } from './components/auth/AuthForm';
import { EventList } from './components/event/EventList';
import { CreateEventForm } from './components/event/CreateEventForm';
import { EventDetails } from './components/event/EventDetails';
import { ProfileView } from './components/profile/ProfileView';
import { ChatList } from './components/chat/ChatList';
import { ChatView } from './components/chat/ChatView';
import { MapView } from './components/map/MapView';
import { ExploreView } from './components/explore/ExploreView';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EventProvider } from './context/EventContext';
import { ChatProvider } from './context/ChatContext';
import { Moon, Sun } from 'lucide-react';

function MainApp() {
  const [activeTab, setActiveTab] = React.useState<string>('eventos');
  const [selectedView, setSelectedView] = React.useState<string>('');
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [selectedLatLng, setSelectedLatLng] = React.useState<{ lat: number; lng: number } | null>(null);
  const { user, loading } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogout = () => {
    window.location.reload(); // Forzar recarga para limpiar el estado
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedView('');
    setSelectedItem(null);
    setSelectedLatLng(null);
  };

  const handleViewSelect = (view: string, item: any = null) => {
    setSelectedView(view);
    setSelectedItem(item);
    setSelectedLatLng(null);
  };

  // Nuevo: abrir formulario de evento desde el mapa
  const handleMapLocationSelect = (lat: number, lng: number) => {
    setSelectedLatLng({ lat, lng });
    setSelectedView('crear-evento');
  };

  const renderContent = () => {
    if (loading) return <div>Cargando...</div>;
    if (!user) return <AuthForm onLogin={() => {}} />;

    // Mostrar vistas secundarias si están seleccionadas
    if (selectedView) {
      switch (selectedView) {
        case 'crear-evento':
          return <CreateEventForm onBack={() => setSelectedView('')} lat={selectedLatLng?.lat} lng={selectedLatLng?.lng} />;
        case 'detalles-evento':
          return <EventDetails event={selectedItem} onBack={() => setSelectedView('')} />;
        case 'chat':
          return <ChatView chat={selectedItem} onBack={() => setSelectedView('')} />;
      }
    }

    // Mostrar contenido principal basado en la pestaña activa
    switch (activeTab) {
      case 'eventos':
        return (
          <EventList 
            onCreateEvent={() => handleViewSelect('crear-evento')}
            onViewDetails={(event) => handleViewSelect('detalles-evento', event)}
          />
        );
      case 'chats':
        return <ChatList onSelectChat={(chat) => handleViewSelect('chat', chat)} />;
      case 'mapa':
        return <MapView onLocationSelect={handleMapLocationSelect} />;
      case 'explorar':
        return <ExploreView />;
      case 'perfil':
        return <ProfileView onLogout={handleLogout} />;
      default:
        return <div>Selecciona una pestaña</div>;
    }
  };

  return (
    <div className={`flex flex-col h-screen bg-gray-50 dark:bg-gray-900`}>
      <Header isLoggedIn={!!user} onLogout={handleLogout} />
      <main className="flex-1 overflow-auto p-4">
        {renderContent()}
        {/* Botón flotante de modo oscuro */}
        <button
          onClick={() => setDarkMode((v: boolean) => !v)}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Alternar modo oscuro"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </main>
      {user && (
        <footer className="border-t border-gray-200 dark:border-gray-700">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <ChatProvider>
          <MainApp />
        </ChatProvider>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;