import { Icon } from '../ui/Icon';

/**
 * Componente que muestra el reporte detallado de inconsistencias detectadas en la carga CSV.
 *
 * @param {Object} props
 * @param {Array<Object>} props.errores - Lista de inconsistencias
 * @param {Function} [props.onConsultarCursos] - Callback para navegar o consultar el glosario de cursos
 */
export function ErrorReport({ errores = [], onConsultarCursos }) {
  if (!errores || errores.length === 0) return null;

  return (
    <div className="bg-white border border-line rounded-2xl p-6 shadow-subtle space-y-5">
      {/* Cabecera del reporte */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-danger-bg text-danger-fg flex items-center justify-center shrink-0">
            <Icon name="alert-circle" size={18} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-ink leading-tight">
              Reporte Detallado de Inconsistencias Detectadas
            </h2>
            <p className="text-xs text-ink-2">
              Se detectaron {errores.length} registros que impiden la inserción atómica
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium self-start sm:self-auto">
          <span>Filtro activo: Solo filas no aptas</span>
        </div>
      </div>

      {/* Tabla con scroll horizontal desktop-first */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left text-sm border-collapse min-w-[850px]">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-[0.08em] font-semibold text-ink-3">
              <th scope="col" className="pb-3 pr-3">Fila</th>
              <th scope="col" className="pb-3 px-3">Usuario / Documento Afectado</th>
              <th scope="col" className="pb-3 px-3">Campo con Error</th>
              <th scope="col" className="pb-3 px-3">Valor Detectado</th>
              <th scope="col" className="pb-3 px-3">Valor Esperado</th>
              <th scope="col" className="pb-3 pl-3">Diagnóstico & Solución Sugerida</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {errores.map((err, i) => (
              <tr key={`error-${err.fila}-${i}`} className="hover:bg-brand-50/50 transition-colors">
                {/* Fila */}
                <td className="py-3.5 pr-3 font-mono font-bold text-danger-fg text-xs whitespace-nowrap">
                  {err.fila}
                </td>

                {/* Usuario / Documento Afectado */}
                <td className="py-3.5 px-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink text-xs">{err.usuario}</p>
                    <p className="text-[11px] font-mono text-ink-3 truncate">{err.detalleUsuario}</p>
                  </div>
                </td>

                {/* Campo con error */}
                <td className="py-3.5 px-3">
                  <span className="inline-block font-mono text-xs px-2 py-0.5 rounded bg-danger-bg text-danger-fg border border-danger-line">
                    {err.campo}
                  </span>
                </td>

                {/* Valor detectado (tachado sobre fondo suave) */}
                <td className="py-3.5 px-3">
                  <span className="inline-block font-mono text-xs px-2 py-0.5 rounded bg-danger-bg text-danger-fg line-through">
                    {err.valorDetectado}
                  </span>
                </td>

                {/* Valor esperado (chips azules) */}
                <td className="py-3.5 px-3">
                  <span className="inline-block font-mono text-xs px-2 py-0.5 rounded bg-brand-100 text-brand-700 font-medium">
                    {err.valorEsperado}
                  </span>
                </td>

                {/* Diagnóstico & Solución */}
                <td className="py-3.5 pl-3 text-xs leading-relaxed max-w-sm">
                  <p className="text-ink font-medium">{err.diagnostico}</p>
                  <p className="text-brand-700 font-semibold mt-0.5">{err.solucion}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie informativo de la tarjeta */}
      <div className="pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-danger-fg shrink-0" aria-hidden="true" />
          <span>
            Reingreso del archivo requerido tras subsanar los {errores.length} registros en la plantilla local.
          </span>
        </div>

        <button
          type="button"
          onClick={onConsultarCursos}
          className="text-brand-700 hover:underline font-semibold text-left self-start sm:self-auto focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
        >
          Consultar glosario de cursos activos 2025 →
        </button>
      </div>
    </div>
  );
}
