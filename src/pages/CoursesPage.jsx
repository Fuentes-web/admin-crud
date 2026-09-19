import { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { SearchInput } from '../components/ui/SearchInput';
import { CourseRow } from '../components/courses/CourseRow';
import { HistoryCard } from '../components/courses/HistoryCard';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { downloadCsv } from '../utils/download';
import {
  VIGENCIA_ACTUAL,
  TABS_CURSOS,
  CURSOS_MOCK,
} from '../data/courses';
import { HISTORIAL_VIGENCIAS } from '../data/history';

/**
 * Vista de Cursos Institucionales y Control de Vigencia.
 * Supervisión curricular, asignación de docentes titulares, consulta
 * de expedientes históricos y control de cierre de período académico.
 */
export function CoursesPage() {
  const { show } = useToast();

  const [tabFiltro, setTabFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [modalCierreAbierto, setModalCierreAbierto] = useState(false);

  // Filtrado reactivo de los cursos institucionales
  const cursosFiltrados = useMemo(() => {
    return CURSOS_MOCK.filter((curso) => {
      // Filtro por pestaña
      if (tabFiltro === 'secundaria' && curso.ciclo !== 'secundaria') return false;
      if (tabFiltro === 'media' && curso.ciclo !== 'media') return false;
      if (tabFiltro === 'jm' && curso.jornada !== 'JM') return false;
      if (tabFiltro === 'jt' && curso.jornada !== 'JT') return false;

      // Filtro por texto (código, grado, docente)
      if (busqueda.trim()) {
        const query = busqueda.toLowerCase().trim();
        const coincideCodigo = curso.codigo.includes(query);
        const coincideGrado = curso.grado.toLowerCase().includes(query);
        const coincideDocente = curso.docente.toLowerCase().includes(query);
        const coincideAula = curso.aula.toLowerCase().includes(query);

        if (!coincideCodigo && !coincideGrado && !coincideDocente && !coincideAula) {
          return false;
        }
      }

      return true;
    });
  }, [tabFiltro, busqueda]);

  // Exportar sábana general de cursos a formato CSV con BOM UTF-8
  const handleExportarSabana = () => {
    const encabezados = [
      'Codigo_Curso',
      'Jornada',
      'Grado_Grupo',
      'Aula_Asignada',
      'Docente_Titular',
      'Matricula_Actual',
      'Cupo_Total',
      'Estado',
    ];

    const filas = cursosFiltrados.map((c) => [
      c.codigo,
      c.jornada,
      c.grado,
      c.aula,
      c.docente,
      c.matricula,
      c.cupo,
      c.estado,
    ]);

    downloadCsv('sabana_cursos_ied_la_victoria_2025', [encabezados, ...filas]);
    show(`Se ha exportado la sábana con ${cursosFiltrados.length} cursos oficiales.`, 'success');
  };

  const handleCrearCurso = () => {
    show('Apertura de grupo habilitada en Secretaría Académica.', 'info');
  };

  const handleReasignar = (curso) => {
    show(`Asignación de tutor para ${curso.grado}: Modificación en proceso.`, 'info');
  };

  const handleVerEstudiantes = (curso) => {
    show(`Listado oficial de estudiantes para el ${curso.grado} (${curso.matricula} matriculados).`, 'info');
  };

  const handleAdministrar = (curso) => {
    show(`Consola de administración curricular abierta para el grupo ${curso.codigo}.`, 'info');
  };

  const handleConsultarExpediente = (expediente) => {
    show(`Cargando expediente inmutable del Año Lectivo ${expediente.anio} (Solo Lectura).`, 'info');
  };

  const handleScrollHistorico = () => {
    const el = document.getElementById('historico');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfirmarCierrePeriodo = () => {
    setModalCierreAbierto(false);
    show('Solicitud de cierre enviada a Consejo Directivo para emisión de acta final.', 'warning');
  };

  return (
    <div className="space-y-8">
      {/* 1. Franja superior institucional delgada */}
      <div className="bg-white border border-line rounded-xl px-4 py-3 shadow-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
            <Icon name="shield-check" size={15} />
          </div>
          <p className="text-ink">
            <span className="font-semibold text-ink">Vigencia Vigente Autorizada:</span>{' '}
            <span className="text-ink-2">{VIGENCIA_ACTUAL.resolucion}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 text-ink-3 self-end sm:self-auto font-medium">
          <span className="inline-flex items-center gap-1.5 text-brand-700">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            24 Cursos en Plan
          </span>
          <span className="text-slate-300">|</span>
          <span>924 Cupos Asignados</span>
        </div>
      </div>

      {/* 2. Encabezado principal */}
      <PageHeader
        eyebrow="GESTIÓN CURRICULAR • IED LA VICTORIA"
        title="Cursos Institucionales y Control de Vigencia"
        subtitle="Supervisión de cursos lectivos, asignación de docentes titulares y consulta de vigencias académicas (RF06, RF07, RF08, RF12)."
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              size="md"
              iconLeft="download"
              onClick={handleExportarSabana}
            >
              Exportar Sábana
            </Button>
            <Button
              variant="primary"
              size="md"
              iconLeft="plus-circle"
              onClick={handleCrearCurso}
            >
              + Crear Nuevo Curso
            </Button>
          </div>
        }
      />

      {/* 3. Tarjeta de control de vigencia activa */}
      <div className="bg-white border border-line rounded-2xl p-6 shadow-subtle space-y-6">
        
        {/* Cabecera de la vigencia y controles segmentados */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-subtle">
              <Icon name="calendar-check" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg font-bold text-ink leading-tight">
                  Vigencia Activa: {VIGENCIA_ACTUAL.anio}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
                  En Curso • Edición Permitida
                </span>
              </div>
              <p className="text-xs text-ink-2 mt-1">
                Período Académico: <span className="font-semibold text-ink">{VIGENCIA_ACTUAL.periodoNombre}</span>{' '}
                (Apertura: {VIGENCIA_ACTUAL.fechaApertura} — Cierre estipulado: {VIGENCIA_ACTUAL.fechaCierre})
              </p>
            </div>
          </div>

          {/* Control segmentado y botón de cierre de período */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="p-1 bg-surface border border-line rounded-xl flex items-center gap-1 select-none">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-brand-700 shadow-subtle"
              >
                Vigencia 2025
              </button>
              <button
                type="button"
                onClick={handleScrollHistorico}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-2 hover:text-ink flex items-center gap-1.5 transition-colors"
              >
                <Icon name="lock" size={13} className="text-ink-3" />
                <span>Histórico (2022 - 2024)</span>
              </button>
            </div>

            <Button
              variant="danger-soft"
              size="md"
              iconLeft="unlock"
              onClick={() => setModalCierreAbierto(true)}
            >
              Cierre de Período
            </Button>
          </div>
        </div>

        {/* Franja de 4 métricas en fondo surface */}
        <div className="p-4 bg-surface border border-line rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-3">
              ESTUDIANTES MATRICULADOS
            </p>
            <p className="text-lg font-bold text-ink mt-0.5 tabular-nums">
              {VIGENCIA_ACTUAL.matriculados}{' '}
              <span className="text-xs font-normal text-ink-3">/ {VIGENCIA_ACTUAL.cuposTotales} cupos</span>
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-3">
              DOCENTES CON TITULARIDAD
            </p>
            <p className="text-lg font-bold text-ink mt-0.5 tabular-nums">
              {VIGENCIA_ACTUAL.docentesTitularidad}{' '}
              <span className="text-xs font-semibold text-brand-700">({VIGENCIA_ACTUAL.coberturaDocente})</span>
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-3">
              JORNADA MAÑANA (JM)
            </p>
            <p className="text-lg font-bold text-ink mt-0.5 tabular-nums">
              {VIGENCIA_ACTUAL.aulasJM}{' '}
              <span className="text-xs font-normal text-ink-3">Aulas activas</span>
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-3">
              JORNADA TARDE (JT)
            </p>
            <p className="text-lg font-bold text-ink mt-0.5 tabular-nums">
              {VIGENCIA_ACTUAL.aulasJT}{' '}
              <span className="text-xs font-normal text-ink-3">Aulas activas</span>
            </p>
          </div>
        </div>

      </div>

      {/* 4. Filtros: Tabs tipo pill + Buscador */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Tabs de ciclos y jornadas en formato pill */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 select-none">
          {TABS_CURSOS.map((tab) => {
            const esActivo = tabFiltro === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTabFiltro(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-brand-600 ${
                  esActivo
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'bg-white text-ink-2 border border-line hover:bg-brand-50 hover:text-brand-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Buscador de cursos */}
        <SearchInput
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por grado, código o docente..."
        />
      </div>

      {/* 5. Lista de cursos institucionales */}
      <section aria-label="Listado de cursos vigentes" className="space-y-4">
        {cursosFiltrados.length === 0 ? (
          <div className="bg-white border border-line rounded-2xl p-10 text-center space-y-2">
            <p className="text-sm font-semibold text-ink">No se encontraron cursos</p>
            <p className="text-xs text-ink-3">No hay cursos que coincidan con los filtros aplicados.</p>
          </div>
        ) : (
          cursosFiltrados.map((curso) => (
            <CourseRow
              key={curso.id}
              curso={curso}
              onReasignar={handleReasignar}
              onVerEstudiantes={handleVerEstudiantes}
              onAdministrar={handleAdministrar}
            />
          ))
        )}
      </section>

      {/* 6. Sección "Expedientes Históricos y Vigencias Concluidas" */}
      <section id="historico" aria-labelledby="historico-titulo" className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
              <Icon name="history" size={20} />
            </div>
            <div>
              <h2 id="historico-titulo" className="text-lg font-semibold text-ink leading-tight">
                Expedientes Históricos y Vigencias Concluidas
              </h2>
              <p className="text-xs text-ink-2">
                Archivos inmutables y sellados bajo normatividad de la Secretaría Distrital de Educación.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 self-start sm:self-auto select-none">
            <Icon name="lock" size={13} className="text-slate-500" />
            <span>Modo Solo Lectura e Inmutabilidad Activa</span>
          </div>
        </div>

        {/* Cuadrícula de 3 HistoryCards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HISTORIAL_VIGENCIAS.map((item) => (
            <HistoryCard
              key={item.anio}
              item={item}
              onConsultar={handleConsultarExpediente}
            />
          ))}
        </div>
      </section>

      {/* 7. Modal accesible de confirmación para Cierre de Período */}
      <Modal
        isOpen={modalCierreAbierto}
        onClose={() => setModalCierreAbierto(false)}
        title="Confirmación de Cierre de Período Lectivo 2025"
        description="Procedimiento formal de clausura académica bajo supervisión de Rectoría."
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-danger-bg border border-danger-line flex items-start gap-3">
            <Icon name="alert-circle" size={20} className="text-danger-fg shrink-0 mt-0.5" />
            <div className="text-xs text-danger-fg space-y-1">
              <p className="font-semibold text-sm">Advertencia de Irreversibilidad Administrativa</p>
              <p className="leading-relaxed">
                Al clausurar el período académico activo, los registros de calificaciones, matrículas y asignación de
                tutores se sellarán en modo solo lectura para la emisión del libro de actas final.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setModalCierreAbierto(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="danger-soft"
              iconLeft="lock"
              onClick={handleConfirmarCierrePeriodo}
            >
              Confirmar Cierre y Sellado
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
