import { useState, useRef, useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

/**
 * Barra superior de navegación y acciones de usuario.
 *
 * @param {Object} props
 * @param {Function} props.onOpenSidebar - Abre el menú lateral en pantallas móviles
 */
export function Topbar({ onOpenSidebar }) {
  const { usuario, logout } = useAuth();
  const { show } = useToast();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú al hacer clic afuera o presionar Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape' && menuAbierto) {
        setMenuAbierto(false);
      }
    }

    if (menuAbierto) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuAbierto]);

  const handleCerrarSesion = () => {
    setMenuAbierto(false);
    logout();
    show('Has cerrado sesión correctamente.', 'info');
  };

  return (
    <header className="h-16 bg-white border-b border-line sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Sección izquierda: Botón móvil + Marca + Vigencia */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Abrir menú de navegación"
          className="lg:hidden p-2 rounded-lg text-ink-2 hover:text-ink hover:bg-brand-50 transition-colors"
        >
          <Icon name="menu" size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-900 text-white flex items-center justify-center shrink-0">
            <Icon name="graduation-cap" size={18} />
          </div>
          <span className="font-semibold text-ink text-sm hidden sm:inline">
            IED La Victoria • Identidad Escolar
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-700">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span>Vigencia: 2025 (Activa)</span>
        </div>
      </div>

      {/* Sección derecha: Perfil de usuario con menú desplegable */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-expanded={menuAbierto}
          aria-haspopup="true"
          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-brand-50 transition-colors focus-visible:outline-2 focus-visible:outline-brand-600"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-ink leading-snug">
              {usuario?.nombre || 'Edgar Rivera'}
            </p>
            <p className="text-[12px] text-ink-3 leading-none">
              {usuario?.cargo || 'Administrador General'}
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-brand-900 text-white flex items-center justify-center font-medium shadow-subtle shrink-0">
            <Icon name="user" size={18} />
          </div>
          <Icon
            name="chevron-down"
            size={16}
            className={`text-ink-3 transition-transform duration-200 hidden sm:block ${
              menuAbierto ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown accesible */}
        {menuAbierto && (
          <div
            role="menu"
            aria-orientation="vertical"
            className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-line shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
          >
            <div className="px-4 py-2 border-b border-line sm:hidden">
              <p className="text-xs font-semibold text-ink">{usuario?.nombre || 'Edgar Rivera'}</p>
              <p className="text-[11px] text-ink-3">{usuario?.cargo || 'Administrador General'}</p>
            </div>

            <div className="px-1.5 py-1">
              <button
                type="button"
                role="menuitem"
                onClick={handleCerrarSesion}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-danger-fg hover:bg-danger-bg rounded-[10px] transition-colors text-left"
              >
                <Icon name="log-out" size={16} className="text-danger-fg shrink-0" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
