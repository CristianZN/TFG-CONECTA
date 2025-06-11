import { supabase } from './supabase';

export const testSupabaseConnection = async () => {
  try {
    // Intentar obtener la fecha y hora del servidor
    const { data, error } = await supabase.rpc('now');
    if (error) throw error;
    console.log('¡Conexión exitosa a Supabase! Fecha y hora del servidor:', data);
    return true;
  } catch (err) {
    console.error('Error al conectar con Supabase:', err);
    return false;
  }
};

// Ejecutar la prueba si este archivo se ejecuta directamente
if (import.meta.vitest) {
  testSupabaseConnection();
} 