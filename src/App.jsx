import { useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useHashRoute } from './hooks/useHashRoute';
import { AppShell } from './components/layout/AppShell';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { BulkUploadPage } from './pages/BulkUploadPage';
import { CoursesPage } from './pages/CoursesPage';

/**
 * Componente interno que maneja el enrutamiento y los guards de autenticación.
 */
function AppRoutes() {
  const [ruta, navegar] = useHashRoute();
  const { estaAutenticado } = useAuth();

  // Guard de rutas: protección de acceso según el estado de sesión
  useEffect(() => {
    if (!estaAutenticado && ruta !== '#/login') {
      navegar('#/login');
    } else if (estaAutenticado && ruta === '#/login') {
      navegar('#/panel');
    }
  }, [estaAutenticado, ruta, navegar]);

  // Si no está autenticado, renderizamos la pantalla de Login sin AppShell
  if (!estaAutenticado || ruta === '#/login') {
    return <LoginPage onNavigate={navegar} />;
  }

  // Mapeo de vistas para usuarios autenticados dentro del AppShell
  const renderContenido = () => {
    switch (ruta) {
      case '#/panel':
        return <DashboardPage />;
      case '#/usuarios':
        return <UsersPage />;
      case '#/carga-masiva':
        return <BulkUploadPage />;
      case '#/cursos':
        return <CoursesPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppShell currentRoute={ruta} onNavigate={navegar}>
      {renderContenido()}
    </AppShell>
  );
}

/**
 * Componente raíz con los proveedores globales.
 */
export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ToastProvider>
  );
}
