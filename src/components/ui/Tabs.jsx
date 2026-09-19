import { useRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * Componente de pestañas (Tabs) accesible con rol tablist/tab, navegación por teclado y píldoras de conteo.
 *
 * @param {Object} props
 * @param {Array<{id: string, label: string, count?: number|string}>} props.tabs - Lista de pestañas
 * @param {string} props.activeTab - ID de la pestaña actualmente activa
 * @param {Function} props.onChange - Callback invocado al seleccionar una pestaña (id: string) => void
 * @param {string} [props.className] - Clases adicionales para el contenedor
 */
export function Tabs({ tabs, activeTab, onChange, className = '' }) {
  const tabRefs = useRef({});

  const handleKeyDown = (e, index) => {
    let proximoIndex = null;

    if (e.key === 'ArrowRight') {
      proximoIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      proximoIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      proximoIndex = 0;
    } else if (e.key === 'End') {
      proximoIndex = tabs.length - 1;
    }

    if (proximoIndex !== null) {
      e.preventDefault();
      const proximoTab = tabs[proximoIndex];
      onChange(proximoTab.id);
      if (tabRefs.current[proximoTab.id]) {
        tabRefs.current[proximoTab.id].focus();
      }
    }
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn('flex items-center gap-2 border-b border-line overflow-x-auto', className)}
    >
      {tabs.map((tab, index) => {
        const esActiva = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current[tab.id] = el;
            }}
            type="button"
            role="tab"
            aria-selected={esActiva}
            tabIndex={esActiva ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'flex items-center gap-2 pb-3 px-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap select-none',
              'focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:rounded-t',
              esActiva
                ? 'border-brand-700 text-brand-700 font-semibold -mb-[2px]'
                : 'border-transparent text-ink-2 hover:text-ink hover:border-slate-300',
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-xs transition-colors',
                  esActiva
                    ? 'bg-brand-100 text-brand-700 font-bold'
                    : 'bg-slate-100 text-slate-500 font-medium',
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
