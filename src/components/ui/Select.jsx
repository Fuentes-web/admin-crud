import { Icon } from './Icon';
import { cn } from '../../utils/cn';

/**
 * Componente Select nativo estilizado con la estética del sistema.
 * Conserva el comportamiento nativo y accesible en navegadores móviles y de escritorio.
 *
 * @param {Object} props
 * @param {string} props.id - ID del elemento select
 * @param {string} [props.name] - Nombre del control de formulario
 * @param {string|number} [props.value] - Valor seleccionado
 * @param {Function} [props.onChange] - Manejador de cambio
 * @param {Array<{value: string|number, label: string}>} [props.options] - Lista de opciones
 * @param {boolean} [props.hasError=false] - Indica estado de error visual
 * @param {boolean} [props.disabled=false] - Estado deshabilitado
 * @param {string} [props.className] - Clases adicionales de Tailwind
 * @param {React.ReactNode} [props.children] - Opciones manuales o contenido JSX
 */
export function Select({
  id,
  name,
  value,
  onChange,
  options,
  hasError = false,
  disabled = false,
  className = '',
  children,
  ...props
}) {
  return (
    <div className="relative w-full">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={cn(
          'w-full h-10 px-3.5 pr-10 text-sm bg-surface rounded-[10px] border border-line text-ink appearance-none cursor-pointer transition-colors',
          'focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100',
          hasError && 'border-danger-line bg-danger-bg text-danger-fg focus-visible:outline-danger-fg',
          className,
        )}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>

      {/* Flecha indicadora nativa reemplazada por icono SVG institucional */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-3">
        <Icon name="chevron-down" size={18} />
      </div>
    </div>
  );
}
