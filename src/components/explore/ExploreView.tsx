import React, { useState } from 'react';
import { Search, Filter, Users, MapPin } from 'lucide-react';

interface ExploreCategory {
  id: string;
  name: string;
}

interface ExploreItem {
  id: string;
  title: string;
  category: string;
  location: string;
  participants: number;
}

export const ExploreView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Categorías de ejemplo
  const categories: ExploreCategory[] = [
    { id: 'all', name: 'Todos' },
    { id: 'idiomas', name: 'Idiomas' },
    { id: 'deportes', name: 'Deportes' },
    { id: 'arte', name: 'Arte y Cultura' },
    { id: 'tecnologia', name: 'Tecnología' },
    { id: 'comida', name: 'Gastronomía' }
  ];

  // Elementos de exploración de ejemplo
  const exploreItems: ExploreItem[] = [
    { 
      id: '1',
      title: 'Grupo de conversación en español',
      category: 'idiomas',
      location: 'Centro Cultural',
      participants: 15
    },
    { 
      id: '2',
      title: 'Club de fútbol amateur',
      category: 'deportes',
      location: 'Parque Deportivo',
      participants: 22
    },
    { 
      id: '3',
      title: 'Taller de pintura',
      category: 'arte',
      location: 'Galería Municipal',
      participants: 8
    },
    { 
      id: '4',
      title: 'Grupo de desarrollo web',
      category: 'tecnologia',
      location: 'Espacio Coworking',
      participants: 12
    },
    { 
      id: '5',
      title: 'Club de cocina internacional',
      category: 'comida',
      location: 'Escuela de Cocina',
      participants: 10
    }
  ];

  // Filtrar items basados en la búsqueda y categoría
  const filteredItems = exploreItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Explorar</h1>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
          placeholder="Buscar grupos, eventos, actividades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-10">
          <Filter className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="mt-2 text-gray-500">No se encontraron resultados para tu búsqueda</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{item.title}</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Users className="h-4 w-4 mr-2 text-indigo-500" />
                  <span>{item.participants} participantes</span>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300">
                  {categories.find(cat => cat.id === item.category)?.name}
                </span>
                <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 text-sm font-medium">
                  Unirse
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};