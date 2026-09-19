import { useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { cn } from '../../utils/cn';

const MENU_ITEMS = [
  { label: 'Panel Principal', icon: 'grid', href: '#/panel' },
  { label: 'Gestión de Usuarios', icon: 'users', href: '#/usuarios' },
  { label: 'Carga Masiva CSV', icon: 'file-up', href: '#/carga-masiva' },
  { label: 'Cursos y Vigencia', icon: 'calendar', href: '#/cursos' },
];

/**
 * Barra lateral de navegación (Sidebar / Drawer en pantallas menores a 1024px).
 *
 * @param {Object} props
 * @param {string} props.currentRoute - Ruta actual (ej: '#/panel')
 * @param {Function} props.onNavigate - Función de navegación
 * @param {boolean} props.isOpen - Estado de visibilidad en vista móvil/tablet
 * @param {Function} props.onClose - Manejador para cerrar en móvil
 */
export function Sidebar({ currentRoute, onNavigate, isOpen, onClose }) {
  // Manejo de la tecla Escape para cerrar el drawer en móvil
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const contenidoSidebar = (
    <aside
      className={cn(
        'w-64 bg-white border-r border-line flex flex-col h-full shrink-0 select-none',
        'transition-transform duration-200 ease-in-out',
      )}
    >
      {/* Encabezado institucional */}
      <div className="p-5 border-b border-line flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Icon name="graduation-cap" size={22} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-ink text-sm leading-tight">
              IED La Victoria
            </span>
            <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-ink-3">
              PROYECTO C
            </span>
          </div>
        </div>

        {/* Botón de cierre en vista móvil */}
        {isOpen && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú lateral"
            className="lg:hidden p-1.5 rounded-lg text-ink-3 hover:text-ink hover:bg-brand-50"
          >
            <Icon name="x" size={20} />
          </button>
        )}
      </div>

      {/* Menú de navegación */}
      <nav className="flex-1 px-3.5 py-6 overflow-y-auto space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-ink-3 px-3 mb-2">
            MENÚ PRINCIPAL
          </p>
          <ul className="space-y-1">
            {MENU_ITEMS.map((item) => {
              const esActivo = currentRoute === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.href);
                      if (onClose) onClose();
                    }}
                    aria-current={esActivo ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-sm transition-colors',
                      esActivo
                        ? 'bg-brand-200 text-brand-900 font-semibold shadow-sm'
                        : 'text-ink-2 font-medium hover:bg-brand-50 hover:text-brand-700',
                    )}
                  >
                    <Icon
                      name={item.icon}
                      size={18}
                      className={cn(
                        'shrink-0',
                        esActivo ? 'text-brand-900' : 'text-ink-3',
                      )}
                    />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Pie institucional de la barra lateral */}
      <div className="p-4 border-t border-line text-ink-3 text-xs flex items-center gap-2.5 bg-slate-50/50">
        <Icon name="map-pin" size={16} className="text-brand-600 shrink-0" />
        <span className="truncate">Sede Oficial 2025 - Barranquilla, CO</span>
      </div>
    </aside>
  );

  return (
    <>
      {/* Versión fija para pantallas desktop (>=1024px) */}
      <div className="hidden lg:block h-screen sticky top-0">
        {contenidoSidebar}
      </div>

      {/* Drawer flotante con overlay para pantallas menores a 1024px */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          {/* Backdrop con desenfoque suave */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel del Drawer */}
          <div className="relative z-50 flex h-full max-w-xs w-full shadow-xl">
            {contenidoSidebar}
          </div>
        </div>
      )}
    </>
  );
}
