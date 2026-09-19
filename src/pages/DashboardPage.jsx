import { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { StatCard } from '../components/ui/StatCard';
import { RoleBadge } from '../components/ui/RoleBadge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Avatar } from '../components/ui/Avatar';
import { SearchInput } from '../components/ui/SearchInput';
import { Select } from '../components/ui/Select';
import { Pagination } from '../components/ui/Pagination';
import { SchoolFacade } from '../components/illustrations/SchoolFacade';
import { UserFormModal } from '../components/UserFormModal';
import {
  ACTIVIDAD_RECIENTE_MOCK,
  DISTRIBUCION_ROLES_MOCK,
  METRICAS_GENERALES_MOCK,
} from '../data/activity';

const OPCIONES_FILTRO_ROL = [
  { value: 'TODOS', label: 'Todos los Roles (4)' },
  { value: 'Estudiante', label: 'Estudiantes' },
  { value: 'Docente', label: 'Docentes' },
  { value: 'Coordinador', label: 'Coordinadores' },
  { value: 'Administrador', label: 'Administradores' },
];

/**
 * Vista de Panel Principal ("Consola de Identidad Institucional").
 * Presenta métricas clave, distribución oficial de roles, accesos directos
 * y actividad reciente con filtros en tiempo real.
 */
export function DashboardPage() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('TODOS');
  const [paginaActual, setPaginaActual] = useState(1);

  // Filtrado de usuarios en cliente según búsqueda y rol
  const usuariosFiltrados = useMemo(() => {
    return ACTIVIDAD_RECIENTE_MOCK.filter((u) => {
      const cumpleBusqueda =
        u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.documento.includes(busqueda) ||
        u.documentoFormateado.includes(busqueda) ||
        u.detalle.toLowerCase().includes(busqueda.toLowerCase());

      const cumpleRol =
        filtroRol === 'TODOS' || u.rol.toLowerCase() === filtroRol.toLowerCase();

      return cumpleBusqueda && cumpleRol;
    });
  }, [busqueda, filtroRol]);

  const navegarA = (hash) => {
    window.location.hash = hash;
  };

  return (
    <div className="space-y-8">
      {/* 1. Encabezado principal */}
      <PageHeader
        eyebrow={
          <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700">
            <span className="w-2 h-2 rounded-full bg-brand-500" aria-hidden="true" />
            SISTEMA DE GESTIÓN CENTRAL
          </span>
        }
        title="Consola de Identidad Institucional"
        subtitle="Vigencia Académica Activa 2025 • IED La Victoria - Barranquilla"
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              iconLeft="file-up"
              onClick={() => navegarA('#/carga-masiva')}
            >
              Carga Masiva .CSV
            </Button>
            <Button
              variant="primary"
              size="md"
              iconLeft="user-plus"
              onClick={() => setModalAbierto(true)}
            >
              + Crear Nuevo Usuario
            </Button>
          </>
        }
      />

      {/* 2. Cuadrícula de StatCards (4 indicadores) */}
      <section aria-label="Métricas del sistema institucional">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            label="TOTAL USUARIOS REGISTRADOS"
            value={METRICAS_GENERALES_MOCK.totalUsuarios}
            icon="users"
            footerHighlight="↑ 100%"
            footerText="Censo oficial 2025"
          />
          <StatCard
            label="ESTUDIANTES MATRICULADOS"
            value={METRICAS_GENERALES_MOCK.totalEstudiantes}
            icon="graduation-cap"
            footerHighlight="91.9%"
            footerText="Población estudiantil activa"
          />
          <StatCard
            label="DOCENTES ACTIVOS"
            value={METRICAS_GENERALES_MOCK.totalDocentes}
            icon="shield-user"
            footerHighlight="Planta 100%"
            footerText="Asignación académica al día"
          />
          <StatCard
            label="CURSOS Y GRUPOS"
            value={METRICAS_GENERALES_MOCK.totalCursos}
            icon="calendar"
            footerHighlight="Grados 6° a 11°"
            footerText="Sedes A y B registradas"
          />
        </div>
      </section>

      {/* 3. Fila de dos tarjetas (2fr / 1fr): Distribución de Roles + Sede Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tarjeta 1: Distribución Oficial de Roles (ocupa 2 columnas) */}
        <div className="lg:col-span-2 bg-white border border-line rounded-2xl p-6 shadow-subtle flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
                Distribución Oficial de Roles
              </h2>
              <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center">
                <Icon name="pie-chart" size={18} />
              </div>
            </div>
            <p className="text-xs text-ink-2">
              Padrón clasificado institucional (Total 1,284 usuarios)
            </p>
          </div>

          {/* Barra segmentada horizontal */}
          <div className="space-y-2">
            <div
              className="flex h-3.5 w-full rounded-full overflow-hidden bg-slate-100 p-0.5"
              role="progressbar"
              aria-label="Proporción de roles registrados"
            >
              <div
                style={{ width: '91.9%' }}
                className="bg-brand-900 rounded-l-full h-full"
                title="Estudiantes: 91.9%"
              />
              <div
                style={{ width: '5.9%' }}
                className="bg-brand-300 h-full"
                title="Docentes: 5.9%"
              />
              <div
                style={{ width: '1.9%' }}
                className="bg-brand-100 h-full"
                title="Coordinación: 1.9%"
              />
              <div
                style={{ width: '0.3%' }}
                className="bg-ink rounded-r-full h-full"
                title="Admin TI: 0.3%"
              />
            </div>
          </div>

          {/* Cuadrícula de las 4 mini-tarjetas de desglose */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DISTRIBUCION_ROLES_MOCK.map((item) => (
              <div
                key={item.rol}
                className="p-3 bg-surface rounded-xl border border-line flex flex-col gap-1"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${item.dotClase}`}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-semibold text-ink-2 uppercase tracking-wide truncate">
                    {item.rol}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-base font-semibold text-ink tabular-nums">
                    {item.cantidad.toLocaleString('es-CO')}
                  </span>
                  <span className="text-xs font-semibold text-brand-700">
                    {item.porcentaje}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pie informativo de la tarjeta */}
          <div className="pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between text-xs text-ink-3 gap-2">
            <span>
              Restricción de directiva: Sistema exclusivo de 4 roles institucionales
            </span>
            <span className="font-semibold text-brand-700 inline-flex items-center gap-1">
              <Icon name="check" size={14} />
              Validado
            </span>
          </div>
        </div>

        {/* Tarjeta 2: Sede Principal con SchoolFacade (ocupa 1 columna) */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-subtle flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] font-semibold text-brand-700">
              <Icon name="shield-check" size={16} />
              <span>SEDE PRINCIPAL</span>
            </div>
            <h2 className="text-lg font-bold text-ink leading-tight">
              IED La Victoria
            </h2>
            <p className="text-xs text-ink-2 leading-relaxed">
              Infraestructura de acreditación y credencialización estudiantil para el periodo lectivo en curso.
            </p>
          </div>

          {/* Imagen ilustrativa con SchoolFacade */}
          <div className="relative rounded-2xl overflow-hidden border border-line bg-brand-100 aspect-[4/3] shadow-sm">
            <SchoolFacade className="w-full h-full object-cover" />

            {/* Pill translúcida superior derecha */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-brand-900 px-2.5 py-0.5 rounded-full shadow-sm">
              Vigencia 2025
            </div>

            {/* Overlay degradado inferior */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent p-3 text-white flex items-center gap-2">
              <Icon name="map-pin" size={16} className="text-brand-300 shrink-0" />
              <span className="text-xs font-medium truncate">Barranquilla, Atlántico</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Sección "Accesos Directos y Operación" */}
      <section aria-labelledby="accesos-directos-titulo" className="space-y-3">
        <div>
          <h2 id="accesos-directos-titulo" className="text-lg font-semibold text-ink">
            Accesos Directos y Operación
          </h2>
          <p className="text-xs text-ink-2">
            Rutas rápidas para la administración del período lectivo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1: Gestión de Usuarios */}
          <div className="bg-white border border-line rounded-2xl p-6 shadow-subtle flex flex-col justify-between space-y-4 hover:border-brand-300 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                <Icon name="users" size={20} />
              </div>
              <h3 className="font-semibold text-ink text-base">Gestión de Usuarios</h3>
              <p className="text-xs text-ink-2 leading-relaxed">
                Consulta y edición del padrón general. Asignación de roles y actualización de datos individuales.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navegarA('#/usuarios')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800 transition-colors group self-start focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
            >
              <span>Acceder al padrón</span>
              <Icon name="arrow-right" size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Tarjeta 2: Importar Base de Datos */}
          <div className="bg-white border border-line rounded-2xl p-6 shadow-subtle flex flex-col justify-between space-y-4 hover:border-brand-300 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                <Icon name="file-up" size={20} />
              </div>
              <h3 className="font-semibold text-ink text-base">Importar Base de Datos</h3>
              <p className="text-xs text-ink-2 leading-relaxed">
                Carga masiva de matrícula institucional mediante plantilla delimitada CSV con pre-validación de filas.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navegarA('#/carga-masiva')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800 transition-colors group self-start focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
            >
              <span>Subir archivo .CSV</span>
              <Icon name="arrow-right" size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Tarjeta 3: Control de Vigencia */}
          <div className="bg-white border border-line rounded-2xl p-6 shadow-subtle flex flex-col justify-between space-y-4 hover:border-brand-300 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                <Icon name="calendar" size={20} />
              </div>
              <h3 className="font-semibold text-ink text-base">Control de Vigencia</h3>
              <p className="text-xs text-ink-2 leading-relaxed">
                Consulta de los 24 cursos activos y acceso a los registros históricos consolidados de 2024 y 2023.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navegarA('#/cursos')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800 transition-colors group self-start focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
            >
              <span>Revisar cursos y años</span>
              <Icon name="arrow-right" size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Tarjeta "Actividad Reciente de Usuarios" con tabla interactiva */}
      <section aria-labelledby="actividad-reciente-titulo" className="bg-white border border-line rounded-2xl p-6 shadow-subtle space-y-6">
        {/* Cabecera de la sección con controles de filtro */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 id="actividad-reciente-titulo" className="text-lg font-semibold text-ink">
              Actividad Reciente de Usuarios
            </h2>
            <p className="text-xs text-ink-2">
              Últimas modificaciones en la nómina institucional 2025
            </p>
          </div>

          {/* Filtros: buscador de texto y selector de rol */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <SearchInput
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o ID..."
            />
            <div className="w-full sm:w-48">
              <Select
                id="filtro-rol-tabla"
                value={filtroRol}
                onChange={(e) => setFiltroRol(e.target.value)}
                options={OPCIONES_FILTRO_ROL}
              />
            </div>
          </div>
        </div>

        {/* Contenedor desktop-first con overflow-x-auto obligatorio */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.08em] font-semibold text-ink-3">
                <th scope="col" className="pb-3 pr-4">Usuario</th>
                <th scope="col" className="pb-3 px-4">Rol Institucional</th>
                <th scope="col" className="pb-3 px-4">Estado</th>
                <th scope="col" className="pb-3 px-4">Última Modificación</th>
                <th scope="col" className="pb-3 pl-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-ink-3 text-xs">
                    No se encontraron usuarios que coincidan con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-brand-50/70 transition-colors group"
                  >
                    {/* Columna: Usuario con avatar */}
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={item.nombre}
                          role={item.rol}
                          status={item.estado}
                          size="md"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-ink text-sm truncate">
                            {item.nombre}
                          </p>
                          <p className="text-[11px] text-ink-3 truncate">
                            {item.tipoDocumento}: {item.documentoFormateado} • {item.detalle}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Columna: Rol institucional */}
                    <td className="py-3.5 px-4">
                      <RoleBadge role={item.rol} />
                    </td>

                    {/* Columna: Estado */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.estado} />
                    </td>

                    {/* Columna: Última modificación */}
                    <td className="py-3.5 px-4 text-xs text-ink-2 tabular-nums">
                      {item.ultimaModificacion}
                    </td>

                    {/* Columna: Acción */}
                    <td className="py-3.5 pl-4 text-right">
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={() => navegarA('#/usuarios')}
                      >
                        Gestionar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pie de la tabla con contador y paginación */}
        <div className="pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-2">
          <span>
            Mostrando {usuariosFiltrados.length} de 1,284 registros institucionales
          </span>
          <Pagination
            page={paginaActual}
            totalPages={128}
            onChange={(nuevaPagina) => setPaginaActual(nuevaPagina)}
          />
        </div>
      </section>

      {/* Modal de creación rápida de usuario */}
      <UserFormModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
      />
    </div>
  );
}
