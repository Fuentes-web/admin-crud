import { Icon } from './Icon';
import { cn } from '../../utils/cn';

/**
 * Tarjeta de métrica/KPI institucional para paneles directivos.
 *
 * @param {Object} props
 * @param {string} props.label - Título superior en mayúsculas (eyebrow)
 * @param {string|number} props.value - Valor numérico principal (28px tabular-nums)
 * @param {string} props.icon - Nombre del icono institucional en Icon.jsx
 * @param {string} [props.footerHighlight] - Texto destacado al pie (en brand-700)
 * @param {string} [props.footerText] - Texto descriptivo complementario al pie
 * @param {string} [props.className] - Clases adicionales de Tailwind
 */
export function StatCard({
  label,
  value,
  icon,
  footerHighlight,
  footerText,
  className = '',
}) {
  return (
    <div
      className={cn(
        'bg-white border border-line rounded-2xl p-5 sm:p-6 shadow-subtle flex flex-col justify-between transition-shadow hover:shadow-md',
        className,
      )}
    >
      {/* Fila superior: Etiqueta y caja de icono */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-ink-3 leading-snug">
          {label}
        </p>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
            <Icon name={icon} size={20} />
          </div>
        )}
      </div>

      {/* Valor principal KPI */}
      <div className="my-3">
        <p className="text-[28px] font-medium text-ink tabular-nums leading-tight tracking-tight">
          {value}
        </p>
      </div>

      {/* Pie informativo */}
      {(footerHighlight || footerText) && (
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs">
          {footerHighlight && (
            <span className="font-semibold text-brand-700 shrink-0">
              {footerHighlight}
            </span>
          )}
          {footerText && (
            <span className="text-ink-3 truncate">
              {footerText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
