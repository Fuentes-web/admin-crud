import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

/**
 * Estructura base (Shell) de la aplicación administrativa.
 * Integra la barra lateral, la barra superior fija y el contenedor principal de contenido.
 *
 * @param {Object} props
 * @param {string} props.currentRoute - Ruta hash activa
 * @param {Function} props.onNavigate - Callback para cambiar de ruta
 * @param {React.ReactNode} props.children - Vista actual de la aplicación
 */
export function AppShell({ currentRoute, onNavigate, children }) {
  const [sidebarAbierta, setSidebarAbierta] = useState(false);

  return (
    <div className="min-h-screen bg-page flex flex-col lg:flex-row text-ink antialiased">
      {/* Barra lateral / Drawer responsive */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        isOpen={sidebarAbierta}
        onClose={() => setSidebarAbierta(false)}
      />

      {/* Contenedor derecho: Topbar + Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenSidebar={() => setSidebarAbierta(true)} />

        <main className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-10 space-y-6 md:space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
