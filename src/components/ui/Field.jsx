import { Icon } from './Icon';
import { cn } from '../../utils/cn';

/**
 * Componente envoltorio para campos de formulario accesibles.
 * Provee etiqueta semántica, mensajes de ayuda, acciones de cabecera y errores inline vinculados mediante ARIA.
 *
 * @param {Object} props
 * @param {string} props.id - Identificador único para asociar label y mensajes
 * @param {string} [props.label] - Texto de la etiqueta del campo
 * @param {React.ReactNode} [props.labelAction] - Elemento opcional alineado a la derecha del label (ej. enlace de recuperación)
 * @param {string} [props.hint] - Mensaje de ayuda o formato sugerido
 * @param {string} [props.error] - Mensaje de error de validación
 * @param {boolean} [props.required=false] - Indica si el campo es obligatorio
 * @param {string} [props.className] - Clases de Tailwind adicionales para el contenedor
 * @param {React.ReactNode} props.children - El control de formulario (input, select, etc.)
 */
export function Field({
  id,
  label,
  labelAction,
  hint,
  error,
  required = false,
  className = '',
  children,
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={cn('space-y-1.5', className)}>
      {(label || labelAction) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <label
              htmlFor={id}
              className="text-xs font-semibold text-ink uppercase tracking-wider block select-none"
            >
              {label}
              {required && (
                <span className="text-danger-fg ml-1" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}
          {labelAction && <div className="shrink-0">{labelAction}</div>}
        </div>
      )}

      <div>{children}</div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-danger-fg flex items-center gap-1.5 pt-0.5 animate-in fade-in duration-150"
        >
          <Icon name="alert-circle" size={14} className="shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-ink-3 pt-0.5">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
