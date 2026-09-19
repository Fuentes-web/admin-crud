import { Icon } from './Icon';

/**
 * Contenedor de notificaciones tipo Toast flotantes.
 * Accesible con aria-live="polite".
 */
export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const { id, mensaje, tipo } = toast;

  const configTipos = {
    success: {
      bg: 'bg-brand-50 border-brand-300 text-brand-900',
      iconName: 'check-circle',
      iconColor: 'text-brand-600',
    },
    error: {
      bg: 'bg-danger-bg border-danger-line text-danger-fg',
      iconName: 'alert-circle',
      iconColor: 'text-danger-fg',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      iconName: 'alert-circle',
      iconColor: 'text-amber-600',
    },
    info: {
      bg: 'bg-brand-50 border-brand-200 text-brand-900',
      iconName: 'info',
      iconColor: 'text-brand-600',
    },
  };

  const estilo = configTipos[tipo] || configTipos.info;

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-subtle transition-all duration-200 ${estilo.bg}`}
    >
      <Icon
        name={estilo.iconName}
        size={18}
        className={`shrink-0 mt-0.5 ${estilo.iconColor}`}
      />
      <div className="flex-1 text-xs font-medium leading-relaxed">{mensaje}</div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="shrink-0 p-1 -mr-1 -mt-1 rounded-md text-ink-3 hover:text-ink hover:bg-black/5 transition-colors focus-visible:outline-2 focus-visible:outline-brand-600"
        aria-label="Cerrar notificación"
      >
        <Icon name="x" size={14} />
      </button>
    </div>
  );
}
