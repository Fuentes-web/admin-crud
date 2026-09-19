import { useEffect, useRef } from 'react';
import { Icon } from './Icon';
import { cn } from '../../utils/cn';

/**
 * Componente Modal accesible montado sobre el elemento nativo <dialog>.
 * Soporta showModal(), cierre por tecla Escape, clic en backdrop y restauración de foco.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controla si el modal está abierto
 * @param {Function} props.onClose - Callback invocado al solicitar cierre
 * @param {string} props.title - Título principal del diálogo
 * @param {string} [props.description] - Descripción o subtítulo complementario
 * @param {React.ReactNode} props.children - Contenido del cuerpo del modal
 * @param {string} [props.className] - Clases de Tailwind adicionales para el contenedor
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = '',
}) {
  const dialogRef = useRef(null);
  const elementoPrevioRef = useRef(null);

  // Sincronización con el ciclo de vida del elemento nativo <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      elementoPrevioRef.current = document.activeElement;
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      if (elementoPrevioRef.current && typeof elementoPrevioRef.current.focus === 'function') {
        elementoPrevioRef.current.focus();
      }
    }
  }, [isOpen]);

  // Manejador del evento cancel (cuando el usuario presiona la tecla Escape de forma nativa)
  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  // Manejador de clic en el backdrop (el click se produce en el elemento dialog en sí, no en sus hijos)
  const handleClickFondo = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleClickFondo}
      aria-labelledby="modal-titulo"
      aria-describedby={description ? 'modal-descripcion' : undefined}
      className={cn(
        'w-full max-w-lg rounded-2xl border border-line bg-white shadow-2xl p-0',
        'backdrop:bg-slate-900/40 backdrop:backdrop-blur-xs',
        'm-auto open:animate-in open:fade-in open:zoom-in-95 duration-200',
        className,
      )}
    >
      <div className="p-6">
        {/* Cabecera del modal */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-line">
          <div>
            <h2 id="modal-titulo" className="text-lg font-semibold text-ink leading-snug">
              {title}
            </h2>
            {description && (
              <p id="modal-descripcion" className="text-xs text-ink-2 mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 -mr-1 -mt-1 rounded-lg text-ink-3 hover:text-ink hover:bg-brand-50 transition-colors focus-visible:outline-2 focus-visible:outline-brand-600"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="pt-4">{children}</div>
      </div>
    </dialog>
  );
}
