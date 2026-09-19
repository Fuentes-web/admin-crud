import { Icon } from '../ui/Icon';
import { StatusBadge } from '../ui/StatusBadge';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

/**
 * Fila / Tarjeta de presentación de curso institucional 2025.
 *
 * @param {Object} props
 * @param {Object} props.curso - Datos del curso
 * @param {Function} props.onReasignar - Manejador para reasignar docente titular
 * @param {Function} props.onVerEstudiantes - Manejador para consultar el listado de estudiantes
 * @param {Function} props.onAdministrar - Manejador para administrar el grupo lectivo
 */
export function CourseRow({ curso, onReasignar, onVerEstudiantes, onAdministrar }) {
  const iconoAula = curso.tipoAulaIcono === 'laptop' ? 'laptop' : 'building';

  return (
    <article className="bg-white border border-line rounded-2xl p-5 sm:p-6 shadow-subtle flex flex-col xl:flex-row xl:items-center justify-between gap-5 hover:border-brand-300 transition-all">
      {/* 1. Bloque de código y título del curso */}
      <div className="flex items-start sm:items-center gap-4 min-w-[260px]">
        {/* Bloque de código de curso */}
        <div className="w-16 h-16 rounded-xl bg-brand-100 border border-brand-200 flex flex-col items-center justify-center shrink-0 select-none">
          <span className="text-xl font-bold text-brand-700 leading-none">
            {curso.codigo}
          </span>
          <span className="text-[10px] font-bold text-brand-900 uppercase mt-0.5 tracking-wider">
            {curso.jornada}
          </span>
        </div>

        {/* Título, pill de estado y aula física */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-ink text-base leading-tight">
              {curso.grado}
            </h3>
            <StatusBadge status={curso.estado} />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-ink-3">
            <Icon name={iconoAula} size={14} className="text-brand-600 shrink-0" />
            <span className="truncate">{curso.aula}</span>
          </div>
        </div>
      </div>

      {/* 2. Caja de Docente Titular + Bloque de Matrícula */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 max-w-2xl">
        
        {/* Caja de Docente Titular */}
        <div className="p-3 bg-surface border border-line rounded-xl flex items-center justify-between gap-3 min-w-[240px] flex-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar
              name={curso.docente}
              role="Docente"
              status="Activo"
              size="md"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-3 leading-none">
                DOCENTE TITULAR
              </p>
              <p className="font-semibold text-ink text-xs truncate mt-0.5">
                {curso.docente}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onReasignar && onReasignar(curso)}
            className="text-xs font-semibold text-brand-700 hover:text-brand-800 hover:underline shrink-0 p-1 focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
          >
            ✎ Reasignar
          </button>
        </div>

        {/* Bloque de Matrícula y Ocupación */}
        <div className="w-full md:w-52 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-3">Matrícula actual</span>
            <span className="font-semibold text-ink tabular-nums">
              {curso.matricula} / {curso.cupo}
            </span>
          </div>

          <ProgressBar
            value={curso.matricula}
            max={curso.cupo}
            label={`Ocupación de ${curso.grado}: ${curso.matricula} de ${curso.cupo}`}
          />

          <p className="text-[11px] text-ink-3 leading-tight truncate">
            {curso.estadoCupo}
          </p>
        </div>

      </div>

      {/* 3. Botones de acción del curso */}
      <div className="flex items-center gap-2.5 shrink-0 self-end xl:self-center">
        <Button
          variant="soft"
          size="sm"
          iconLeft="eye"
          onClick={() => onVerEstudiantes && onVerEstudiantes(curso)}
        >
          Ver Estudiantes
        </Button>

        <Button
          variant="primary"
          size="sm"
          iconLeft="sliders"
          onClick={() => onAdministrar && onAdministrar(curso)}
        >
          Administrar Grupo
        </Button>
      </div>
    </article>
  );
}
