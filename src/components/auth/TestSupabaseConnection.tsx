import React, { useState } from 'react';
import { supabase } from '../../services/supabase';

export const TestSupabaseConnection: React.FC = () => {
  const [result, setResult] = useState<string>('');

  const testConnection = async () => {
    try {
      // Intentar obtener la fecha y hora del servidor
      const { error } = await supabase.from('profiles').select('*').limit(1);
      if (error) throw error;
      setResult('¡Conexión exitosa a Supabase!');
    } catch (err) {
      setResult('Error al conectar con Supabase: ' + (err instanceof Error ? err.message : err));
    }
  };

  return (
    <div>
      <button onClick={testConnection} className="px-4 py-2 bg-blue-600 text-white rounded">
        Probar conexión a Supabase
      </button>
      {result && <div className="mt-2">{result}</div>}
    </div>
  );
}; 