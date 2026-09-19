import { cn } from '../../utils/cn';

/**
 * Barra de progreso lineal accesible con roles ARIA.
 * Se colorea en brand-500 de forma estándar y en brand-900 al alcanzar el 100% de ocupación.
 *
 * @param {Object} props
 * @param {number} props.value - Valor numérico actual
 * @param {number} [props.max=100] - Capacidad máxima
 * @param {string} [props.label='Progreso de ocupación'] - Etiqueta accesible para lectores de pantalla
 * @param {string} [props.className] - Clases adicionales de Tailwind
 */
export function ProgressBar({
  value,
  max = 100,
  label = 'Progreso de ocupación',
  className = '',
}) {
  const porcentaje = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const estaLlena = porcentaje >= 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn('w-full h-2 rounded-full overflow-hidden bg-slate-100', className)}
    >
      <div
        style={{ width: `${porcentaje}%` }}
        className={cn(
          'h-full rounded-full transition-all duration-300',
          estaLlena ? 'bg-brand-900' : 'bg-brand-500',
        )}
      />
    </div>
  );
}
