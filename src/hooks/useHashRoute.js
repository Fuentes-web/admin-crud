import { useState, useEffect, useCallback } from 'react';

export const RUTAS_VALIDAS = [
  '#/login',
  '#/panel',
  '#/usuarios',
  '#/carga-masiva',
  '#/cursos',
];

export const RUTA_POR_DEFECTO = '#/login';

/**
 * Hook para navegación basada en el hash de la URL sin dependencias externas.
 * Soporta las rutas del proyecto y sincroniza el estado con el evento hashchange.
 *
 * @returns {[string, (nuevaRuta: string) => void]} Tupla con la ruta actual y la función para navegar.
 */
export function useHashRoute() {
  const obtenerRutaActual = () => {
    const hash = window.location.hash;
    return RUTAS_VALIDAS.includes(hash) ? hash : RUTA_POR_DEFECTO;
  };

  const [ruta, setRuta] = useState(obtenerRutaActual);

  useEffect(() => {
    // Si la URL inicial no tiene un hash válido, aseguramos la ruta por defecto
    if (!RUTAS_VALIDAS.includes(window.location.hash)) {
      window.location.hash = RUTA_POR_DEFECTO;
    }

    const manejarCambioHash = () => {
      const hashActual = window.location.hash;
      if (RUTAS_VALIDAS.includes(hashActual)) {
        setRuta(hashActual);
      } else {
        window.location.hash = RUTA_POR_DEFECTO;
        setRuta(RUTA_POR_DEFECTO);
      }
    };

    window.addEventListener('hashchange', manejarCambioHash);
    return () => window.removeEventListener('hashchange', manejarCambioHash);
  }, []);

  const navegar = useCallback((nuevaRuta) => {
    const hashNormalizado = nuevaRuta.startsWith('#') ? nuevaRuta : `#${nuevaRuta}`;
    if (window.location.hash === hashNormalizado) {
      setRuta(hashNormalizado);
    } else {
      window.location.hash = hashNormalizado;
    }
  }, []);

  return [ruta, navegar];
}
