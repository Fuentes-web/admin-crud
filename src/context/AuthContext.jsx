/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const CLAVE_SESION = 'ied_usuario_sesion';

export const USUARIO_PREDETERMINADO = {
  nombre: 'Edgar Rivera',
  cargo: 'Administrador General',
  rol: 'Administrador',
};

/**
 * Proveedor del contexto de autenticación.
 * Gestiona el estado de sesión persistido en sessionStorage.
 */
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const sesionGuardada = sessionStorage.getItem(CLAVE_SESION);
      return sesionGuardada ? JSON.parse(sesionGuardada) : null;
    } catch (error) {
      console.error('Error al recuperar la sesión de sessionStorage:', error);
      return null;
    }
  });

  const login = (datosUsuario = USUARIO_PREDETERMINADO) => {
    try {
      sessionStorage.setItem(CLAVE_SESION, JSON.stringify(datosUsuario));
      setUsuario(datosUsuario);
      return true;
    } catch (error) {
      console.error('Error al guardar la sesión en sessionStorage:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(CLAVE_SESION);
      setUsuario(null);
    } catch (error) {
      console.error('Error al cerrar la sesión en sessionStorage:', error);
    }
  };

  const estaAutenticado = Boolean(usuario);

  return (
    <AuthContext.Provider value={{ usuario, estaAutenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para acceder a los datos y métodos de autenticación.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
