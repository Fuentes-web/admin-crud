import { cn } from '../../utils/cn';

/**
 * Componente genérico de etiqueta tipo Pill institucional.
 *
 * @param {Object} props
 * @param {'default'|'brand'|'brand-dark'|'indigo'|'danger'} [props.variant='default'] - Estilo visual
 * @param {string} [props.className] - Clases de Tailwind adicionales
 * @param {React.ReactNode} props.children - Texto o contenido del badge
 */
export function Badge({ children, variant = 'default', className = '', ...props }) {
  const variantes = {
    default: 'bg-slate-100 text-slate-600',
    brand: 'bg-brand-100 text-brand-700',
    'brand-dark': 'bg-brand-900 text-white',
    indigo: 'bg-indigo-50 text-indigo-700',
    danger: 'bg-danger-bg text-danger-fg',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium select-none',
        variantes[variant] || variantes.default,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
