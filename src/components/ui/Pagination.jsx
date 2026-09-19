import { Icon } from './Icon';
import { cn } from '../../utils/cn';

/**
 * Componente de paginación institucional con números de página, elipsis y flechas de navegación.
 *
 * @param {Object} props
 * @param {number} props.page - Página activa actual (1-indexed)
 * @param {number} props.totalPages - Número total de páginas disponibles
 * @param {Function} props.onChange - Callback invocado al seleccionar una página (nuevaPagina: number) => void
 * @param {string} [props.className] - Clases adicionales
 */
export function Pagination({
  page = 1,
  totalPages = 1,
  onChange,
  className = '',
}) {
  // Generar la lista de números y elipsis visible de manera limpia
  const generarElementos = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items = [];
    items.push(1);

    if (page > 3) {
      items.push('...');
    }

    const inicio = Math.max(2, page - 1);
    const fin = Math.min(totalPages - 1, page + 1);

    for (let i = inicio; i <= fin; i++) {
      items.push(i);
    }

    if (page < totalPages - 2) {
      items.push('...');
    }

    items.push(totalPages);
    return items;
  };

  const elementos = generarElementos();

  return (
    <nav
      aria-label="Paginación de registros"
      className={cn('inline-flex items-center gap-1 select-none', className)}
    >
      {/* Botón página anterior */}
      <button
        type="button"
        onClick={() => onChange && onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="Página anterior"
        className="w-8 h-8 rounded-[10px] flex items-center justify-center text-ink-2 hover:bg-brand-50 hover:text-brand-700 disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-2 focus-visible:outline-brand-600"
      >
        <Icon name="chevron-left" size={16} />
      </button>

      {/* Lista de páginas y elipsis */}
      {elementos.map((item, index) => {
        if (item === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center text-ink-3 text-xs"
              aria-hidden="true"
            >
              …
            </span>
          );
        }

        const esActiva = item === page;

        return (
          <button
            key={`page-${item}`}
            type="button"
            onClick={() => onChange && onChange(item)}
            aria-current={esActiva ? 'page' : undefined}
            aria-label={`Ir a página ${item}`}
            className={cn(
              'w-8 h-8 rounded-[10px] text-xs font-semibold flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-brand-600',
              esActiva
                ? 'bg-brand-700 text-white shadow-sm'
                : 'text-ink-2 hover:bg-brand-50 hover:text-brand-700',
            )}
          >
            {item}
          </button>
        );
      })}

      {/* Botón página siguiente */}
      <button
        type="button"
        onClick={() => onChange && onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        aria-label="Página siguiente"
        className="w-8 h-8 rounded-[10px] flex items-center justify-center text-ink-2 hover:bg-brand-50 hover:text-brand-700 disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-2 focus-visible:outline-brand-600"
      >
        <Icon name="chevron-right" size={16} />
      </button>
    </nav>
  );
}
