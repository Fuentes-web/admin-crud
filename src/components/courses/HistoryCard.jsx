import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

/**
 * Tarjeta de expediente de vigencia académica archivada / sellada.
 *
 * @param {Object} props
 * @param {Object} props.item - Datos del expediente anual
 * @param {Function} [props.onConsultar] - Callback para abrir el visor de solo lectura
 */
export function HistoryCard({ item, onConsultar }) {
  return (
    <article className="bg-white border border-line rounded-2xl p-6 shadow-subtle flex flex-col justify-between space-y-5 hover:border-brand-300 transition-all">
      {/* Cabecera del expediente */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-ink tracking-tight">
            Vigencia {item.anio}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            <Icon name="lock" size={12} className="text-slate-500" />
            <span>{item.estado}</span>
          </span>
        </div>

        <h4 className="font-semibold text-ink text-sm leading-snug">
          {item.titulo}
        </h4>

        <p className="text-xs text-ink-2 leading-relaxed">
          {item.descripcion}
        </p>
      </div>

      {/* Métricas históricas archivadas */}
      <div className="space-y-2 py-3 border-y border-line text-xs">
        <div className="flex items-center justify-between">
          <span className="text-ink-3">Estudiantes Certificados:</span>
          <span className="font-semibold text-ink tabular-nums">
            {item.estudiantesCertificados}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-ink-3">Cursos Impartidos:</span>
          <span className="font-semibold text-ink tabular-nums">
            {item.cursosImpartidos}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-ink-3">Graduados Media Técnica:</span>
          <span className="font-semibold text-brand-700 tabular-nums">
            {item.graduadosMediaTecnica}
          </span>
        </div>
      </div>

      {/* Botón de consulta de solo lectura */}
      <Button
        variant="soft"
        size="md"
        iconLeft="history"
        className="w-full justify-center"
        onClick={() => onConsultar && onConsultar(item)}
      >
        Consultar Expediente (Solo Lectura)
      </Button>
    </article>
  );
}
