import { Icon } from './Icon';
import { cn } from '../../utils/cn';

/**
 * Campo de búsqueda reutilizable con icono y botón de limpieza accesible.
 *
 * @param {Object} props
 * @param {string} props.value - Valor actual del término de búsqueda
 * @param {Function} props.onChange - Callback de actualización de texto
 * @param {string} [props.placeholder='Buscar...'] - Texto de sugerencia
 * @param {Function} [props.onClear] - Callback para limpiar el campo
 * @param {string} [props.className] - Clases de estilo adicionales
 * @param {string} [props.id] - ID opcional del input
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar por nombre o ID...',
  onClear,
  className = '',
  id,
  ...props
}) {
  const handleLimpiar = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div className={cn('relative w-full sm:w-64 md:w-72', className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-3">
        <Icon name="search" size={16} />
      </div>

      <input
        id={id}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-10 pl-9 pr-8 text-sm bg-surface rounded-[10px] border border-line text-ink placeholder:text-ink-3 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2"
        {...props}
      />

      {value && (
        <button
          type="button"
          onClick={handleLimpiar}
          aria-label="Limpiar búsqueda"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink p-1 rounded focus-visible:outline-2 focus-visible:outline-brand-600"
        >
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}
