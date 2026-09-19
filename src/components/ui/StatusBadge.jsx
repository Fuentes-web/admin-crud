import { cn } from '../../utils/cn';

/**
 * Insignia de estado institucional con indicador circular de actividad.
 *
 * @param {Object} props
 * @param {'Activo'|'Inactivo'|string} props.status - Estado del usuario o registro
 * @param {string} [props.className] - Clases adicionales
 */
export function StatusBadge({ status, className = '' }) {
  const esActivo = status === 'Activo';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium select-none',
        esActivo ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500',
        className,
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full shrink-0',
          esActivo ? 'bg-brand-500' : 'bg-slate-400',
        )}
        aria-hidden="true"
      />
      <span>{status}</span>
    </span>
  );
}
