import { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';

/**
 * Menú contextual de fila (botón kebab con menú desplegable).
 * Cierra con tecla Escape y clic afuera. Cumple con estándares ARIA.
 *
 * @param {Object} props
 * @param {Object} [props.item] - Elemento asociado a la fila para pasar al callback
 * @param {Function} [props.onAction] - Callback invocado al seleccionar una acción: (actionKey: string, item: any) => void
 */
export function RowMenu({ item, onAction }) {
  const [abierto, setAbierto] = useState(false);
  const containerRef = useRef(null);

  // Cerrar al hacer clic afuera o pulsar Escape
  useEffect(() => {
    function handleClickAfuera(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setAbierto(false);
      }
    }

    function handleEscape(e) {
      if (e.key === 'Escape' && abierto) {
        setAbierto(false);
      }
    }

    if (abierto) {
      document.addEventListener('mousedown', handleClickAfuera);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickAfuera);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [abierto]);

  const handleSelect = (actionKey) => {
    setAbierto(false);
    if (onAction) {
      onAction(actionKey, item);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-haspopup="true"
        aria-expanded={abierto}
        aria-label="Más opciones"
        className="w-8 h-8 rounded-[10px] flex items-center justify-center text-ink-3 hover:text-ink hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-brand-600"
      >
        <Icon name="more-vertical" size={16} />
      </button>

      {abierto && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-1 w-48 bg-white rounded-xl border border-line shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => handleSelect('perfil')}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-ink hover:bg-brand-50 hover:text-brand-700 transition-colors text-left"
          >
            <Icon name="user" size={15} className="text-ink-3 shrink-0" />
            <span>Ver perfil</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => handleSelect('password')}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-ink hover:bg-brand-50 hover:text-brand-700 transition-colors text-left"
          >
            <Icon name="lock" size={15} className="text-ink-3 shrink-0" />
            <span>Restablecer contraseña</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => handleSelect('rol')}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-ink hover:bg-brand-50 hover:text-brand-700 transition-colors text-left"
          >
            <Icon name="sliders" size={15} className="text-ink-3 shrink-0" />
            <span>Cambiar rol</span>
          </button>
        </div>
      )}
    </div>
  );
}
