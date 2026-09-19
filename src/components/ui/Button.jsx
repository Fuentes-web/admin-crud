import { cn } from '../../utils/cn';
import { Icon } from './Icon';

/**
 * Componente de botón reutilizable con variantes institucionales.
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'soft'|'danger-soft'|'ghost'} [props.variant='primary'] - Estilo visual
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Escala del botón
 * @param {string|React.ReactNode} [props.iconLeft] - Icono al inicio (nombre para Icon o JSX)
 * @param {string|React.ReactNode} [props.iconRight] - Icono al final (nombre para Icon o JSX)
 * @param {boolean} [props.disabled=false] - Estado deshabilitado
 * @param {string} [props.className] - Clases adicionales de Tailwind
 * @param {React.ReactNode} props.children - Texto o contenido del botón
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const tamanios = {
    sm: 'text-xs px-2.5 py-1.5 h-8 gap-1.5',
    md: 'text-sm px-3.5 py-2 h-10 gap-2',
    lg: 'text-base px-5 py-2.5 h-11 gap-2.5',
  };

  const variantes = {
    primary:
      'bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 border border-transparent shadow-subtle',
    secondary:
      'bg-white text-ink border border-line hover:bg-brand-50 hover:border-brand-300 active:bg-brand-100 shadow-subtle',
    soft:
      'bg-surface text-ink hover:bg-brand-100 active:bg-brand-200 border border-transparent',
    'danger-soft':
      'bg-danger-bg text-danger-fg border border-danger-line hover:bg-red-100 active:bg-red-200',
    ghost:
      'bg-transparent text-ink-2 hover:text-ink hover:bg-brand-50 border border-transparent',
  };

  const tamanioIcono = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;

  const renderIcono = (icono) => {
    if (!icono) return null;
    if (typeof icono === 'string') {
      return <Icon name={icono} size={tamanioIcono} className="shrink-0" />;
    }
    return icono;
  };

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled ? 'true' : undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-[10px] transition-colors select-none',
        'focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        tamanios[size] || tamanios.md,
        variantes[variant] || variantes.primary,
        className,
      )}
      {...props}
    >
      {renderIcono(iconLeft)}
      {children}
      {renderIcono(iconRight)}
    </button>
  );
}
