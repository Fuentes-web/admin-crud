/**
 * Encabezado de página estandarizado según la guía de estilo institucional.
 * Cumple con accesibilidad teniendo un único h1 semántico por vista.
 *
 * @param {Object} props
 * @param {string} [props.eyebrow] - Texto superior en mayúsculas pequeñas
 * @param {string} props.title - Título principal de la pantalla (h1)
 * @param {string} [props.subtitle] - Subtítulo descriptivo
 * @param {React.ReactNode} [props.actions] - Elementos de acción (botones) alineados a la derecha
 */
export function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
      <div className="space-y-1">
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-brand-700">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[32px] font-normal tracking-tight text-ink leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-ink-2">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          {actions}
        </div>
      )}
    </header>
  );
}
