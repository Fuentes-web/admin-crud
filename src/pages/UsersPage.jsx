import { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { StatCard } from '../components/ui/StatCard';
import { Tabs } from '../components/ui/Tabs';
import { RoleBadge } from '../components/ui/RoleBadge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Avatar } from '../components/ui/Avatar';
import { SearchInput } from '../components/ui/SearchInput';
import { Select } from '../components/ui/Select';
import { RowMenu } from '../components/ui/RowMenu';
import { Pagination } from '../components/ui/Pagination';
import { UserFormModal } from '../components/UserFormModal';
import { useToast } from '../context/ToastContext';
import { downloadCsv } from '../utils/download';
import {
  USUARIOS_MOCK,
  ESTADISTICAS_USUARIOS_MOCK,
  TABS_USUARIOS_MOCK,
} from '../data/users';

const OPCIONES_ESTADO = [
  { value: 'TODOS', label: 'Estado: Todos' },
  { value: 'Activo', label: 'Activos' },
  { value: 'Inactivo', label: 'Inactivos' },
];

const OPCIONES_JORNADA = [
  { value: 'TODAS', label: 'Jornada / Sede: Todas' },
  { value: 'JM', label: 'Jornada Mañana (JM)' },
  { value: 'JT', label: 'Jornada Tarde (JT)' },
];

/**
 * Vista de Gestión de Usuarios e Identidad ("Directorio Activo 2025").
 * Permite filtrar por roles, estados, jornadas y búsqueda de texto;
 * alternar estados de activación, editar usuarios y exportar datos a CSV con BOM UTF-8.
 */
export function UsersPage() {
  const { show } = useToast();

  // Lista local mutable para permitir cambios de estado y edición interactiva
  const [usuarios, setUsuarios] = useState(USUARIOS_MOCK);

  // Estados de filtros
  const [tabActiva, setTabActiva] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [filtroJornada, setFiltroJornada] = useState('TODAS');
  const [paginaActual, setPaginaActual] = useState(1);

  // Estado del modal de formulario
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  // Filtrado reactivo en cliente
  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      // Filtro por Tab de Rol
      if (tabActiva === 'estudiantes' && usuario.rol !== 'Estudiante') return false;
      if (tabActiva === 'docentes' && usuario.rol !== 'Docente') return false;
      if (tabActiva === 'coordinadores' && usuario.rol !== 'Coordinador') return false;
      if (tabActiva === 'administradores' && usuario.rol !== 'Administrador') return false;

      // Filtro por Estado
      if (filtroEstado !== 'TODOS' && usuario.estado !== filtroEstado) return false;

      // Filtro por Jornada
      if (filtroJornada !== 'TODAS' && usuario.jornada !== filtroJornada) return false;

      // Filtro por Búsqueda de Texto (documento, nombre, correo)
      if (busqueda.trim()) {
        const query = busqueda.toLowerCase().trim();
        const coincideNombre = usuario.nombreCompleto.toLowerCase().includes(query);
        const coincideDoc =
          usuario.documento.includes(query) || usuario.documentoFormateado.toLowerCase().includes(query);
        const coincideCorreo = usuario.correo.toLowerCase().includes(query);

        if (!coincideNombre && !coincideDoc && !coincideCorreo) {
          return false;
        }
      }

      return true;
    });
  }, [usuarios, tabActiva, filtroEstado, filtroJornada, busqueda]);

  // Limpiar todos los filtros al valor inicial
  const handleRestablecerFiltros = () => {
    setTabActiva('todos');
    setBusqueda('');
    setFiltroEstado('TODOS');
    setFiltroJornada('TODAS');
    setPaginaActual(1);
    show('Filtros de búsqueda restablecidos.', 'info');
  };

  // Alternar estado de activación de usuario
  const handleAlternarEstado = (id) => {
    setUsuarios((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nuevoEstado = u.estado === 'Activo' ? 'Inactivo' : 'Activo';
          show(
            `El usuario ${u.nombreCompleto} ha sido marcado como ${nuevoEstado}.`,
            nuevoEstado === 'Activo' ? 'success' : 'warning',
          );
          return { ...u, estado: nuevoEstado };
        }
        return u;
      }),
    );
  };

  // Abrir modal para crear nuevo
  const handleCrearUsuario = () => {
    setUsuarioEditar(null);
    setModalAbierto(true);
  };

  // Abrir modal para editar
  const handleEditarUsuario = (usuario) => {
    setUsuarioEditar(usuario);
    setModalAbierto(true);
  };

  // Guardar datos desde el modal
  const handleGuardarUsuarioModal = (datos) => {
    if (usuarioEditar) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuarioEditar.id ? { ...u, ...datos } : u)),
      );
    } else {
      const nuevo = {
        id: `usr-${Date.now()}`,
        ...datos,
        documentoFormateado: `${datos.tipoDocumento} • ${datos.documento}`,
        asignacion: datos.curso_id && datos.curso_id !== 'NA' ? `Grado ${datos.curso_id} - JM` : 'Asignación General',
        jornada: 'JM',
        estado: 'Activo',
      };
      setUsuarios((prev) => [nuevo, ...prev]);
    }
  };

  // Exportar registros a CSV con codificación UTF-8 BOM
  const handleExportarCsv = () => {
    const encabezados = [
      'ID',
      'Tipo_Documento',
      'Numero_Documento',
      'Nombres_Completos',
      'Correo_Institucional',
      'Rol',
      'Asignacion_Curso',
      'Jornada',
      'Estado',
    ];

    const filas = usuariosFiltrados.map((u) => [
      u.id,
      u.tipoDocumento,
      u.documento,
      u.nombreCompleto,
      u.correo,
      u.rol,
      u.asignacion,
      u.jornada,
      u.estado,
    ]);

    downloadCsv('directorio_usuarios_ied_la_victoria_2025', [encabezados, ...filas]);
    show(`Se han exportado ${usuariosFiltrados.length} registros en formato CSV.`, 'success');
  };

  // Acciones del menú contextual (RowMenu)
  const handleMenuAccion = (accion, item) => {
    if (accion === 'perfil') {
      show(`Detalle de perfil: ${item.nombreCompleto} (${item.rol})`, 'info');
    } else if (accion === 'password') {
      show(`Se envió el enlace de restablecimiento a ${item.correo}.`, 'success');
    } else if (accion === 'rol') {
      handleEditarUsuario(item);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Encabezado de página */}
      <PageHeader
        eyebrow={
          <span>
            <span className="font-semibold text-brand-700">IED LA VICTORIA • PROYECTO C</span>
            <span className="text-ink-3"> • Directorio Activo 2025</span>
          </span>
        }
        title="Gestión de Usuarios e Identidad"
        subtitle="Directorio unificado de administración y control de acceso institucional"
        actions={
          <>
            <Button
              variant="soft"
              size="md"
              iconLeft="download"
              onClick={handleExportarCsv}
            >
              Exportar
            </Button>
            <Button
              variant="primary"
              size="md"
              iconLeft="user-plus"
              onClick={handleCrearUsuario}
            >
              + Crear Nuevo Usuario
            </Button>
          </>
        }
      />

      {/* 2. Cuadrícula de 4 StatCards */}
      <section aria-label="Indicadores de usuarios institucionales">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            label="CUENTAS ACTIVAS"
            value={ESTADISTICAS_USUARIOS_MOCK.cuentasActivas}
            icon="shield-check"
            footerHighlight={ESTADISTICAS_USUARIOS_MOCK.porcentajeActivas}
            footerText="Disponibilidad del censo"
          />
          <StatCard
            label="ESTUDIANTES REGISTRADOS"
            value={ESTADISTICAS_USUARIOS_MOCK.estudiantes}
            icon="graduation-cap"
            footerText="Matrícula activa en sistema"
          />
          <StatCard
            label="CUERPO DOCENTE"
            value={ESTADISTICAS_USUARIOS_MOCK.docentes}
            icon="id-card"
            footerText="Planta docente 2025"
          />
          <StatCard
            label="EQUIPO DIRECTIVO"
            value={ESTADISTICAS_USUARIOS_MOCK.directivos}
            icon="shield-user"
            footerText="Rectoría y coordinadores"
          />
        </div>
      </section>

      {/* 3. Tarjeta principal del directorio con Tabs, filtros y tabla */}
      <div className="bg-white border border-line rounded-2xl p-6 shadow-subtle space-y-6">
        
        {/* Pestañas (Tabs) de clasificación institucional */}
        <Tabs
          tabs={TABS_USUARIOS_MOCK}
          activeTab={tabActiva}
          onChange={(nuevoTab) => {
            setTabActiva(nuevoTab);
            setPaginaActual(1);
          }}
        />

        {/* Barra de herramientas: Búsqueda, Selects y Botón Refrescar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="flex-1">
            <SearchInput
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por documento, nombre o correo institucional..."
              className="w-full sm:w-full md:w-full"
            />
          </div>

          <div className="w-full sm:w-48">
            <Select
              id="filtro-estado"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              options={OPCIONES_ESTADO}
            />
          </div>

          <div className="w-full sm:w-56">
            <Select
              id="filtro-jornada"
              value={filtroJornada}
              onChange={(e) => setFiltroJornada(e.target.value)}
              options={OPCIONES_JORNADA}
            />
          </div>

          <button
            type="button"
            onClick={handleRestablecerFiltros}
            aria-label="Restablecer filtros"
            title="Restablecer filtros"
            className="w-10 h-10 rounded-[10px] border border-line bg-white hover:bg-brand-50 text-ink-2 hover:text-brand-700 flex items-center justify-center shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-brand-600"
          >
            <Icon name="refresh" size={18} />
          </button>
        </div>

        {/* Tabla institucional desktop-first con overflow-x-auto */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-sm border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.08em] font-semibold text-ink-3">
                <th scope="col" className="pb-3 pr-4">Nombre y Documento</th>
                <th scope="col" className="pb-3 px-4">Correo Institucional</th>
                <th scope="col" className="pb-3 px-4">Rol Institucional</th>
                <th scope="col" className="pb-3 px-4">Asignación / Curso</th>
                <th scope="col" className="pb-3 px-4">Estado</th>
                <th scope="col" className="pb-3 pl-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-ink-3 text-xs">
                    No se encontraron usuarios registrados que coincidan con los criterios seleccionados.
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((item) => {
                  const esInactivo = item.estado === 'Inactivo';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-brand-50 transition-colors group ${
                        esInactivo ? 'opacity-60 bg-slate-50/40' : ''
                      }`}
                    >
                      {/* Columna: Nombre y Documento con Avatar */}
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            name={item.nombreCompleto}
                            role={item.rol}
                            status={item.estado}
                            size="md"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-ink text-sm truncate">
                              {item.nombreCompleto}
                            </p>
                            <p className="text-[11px] text-ink-3 truncate">
                              {item.documentoFormateado}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Columna: Correo Institucional */}
                      <td className="py-3.5 px-4 text-xs text-ink-2 font-mono truncate max-w-[200px]">
                        {item.correo}
                      </td>

                      {/* Columna: Rol Institucional */}
                      <td className="py-3.5 px-4">
                        <RoleBadge role={item.rol} />
                      </td>

                      {/* Columna: Asignación / Curso */}
                      <td className="py-3.5 px-4 text-xs text-ink-2">
                        {item.asignacion}
                      </td>

                      {/* Columna: Estado */}
                      <td className="py-3.5 px-4">
                        <StatusBadge status={item.estado} />
                      </td>

                      {/* Columna: Acciones de fila */}
                      <td className="py-3.5 pl-4 text-right">
                        <div className="inline-flex items-center justify-end gap-2">
                          <Button
                            variant="soft"
                            size="sm"
                            onClick={() => handleEditarUsuario(item)}
                          >
                            Editar
                          </Button>

                          <button
                            type="button"
                            onClick={() => handleAlternarEstado(item.id)}
                            className={`text-xs px-2 py-1 rounded transition-colors focus-visible:outline-2 focus-visible:outline-brand-600 ${
                              esInactivo
                                ? 'text-brand-700 hover:text-brand-800 font-semibold'
                                : 'text-danger-fg hover:underline font-medium'
                            }`}
                          >
                            {esInactivo ? 'Activar' : 'Desactivar'}
                          </button>

                          <RowMenu
                            item={item}
                            onAction={handleMenuAccion}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pie de tabla: Contador de resultados y Paginación */}
        <div className="pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-2">
          <span>
            Mostrando <span className="font-semibold text-ink">1</span> a{' '}
            <span className="font-semibold text-ink">{usuariosFiltrados.length}</span> de{' '}
            <span className="font-semibold text-ink">{ESTADISTICAS_USUARIOS_MOCK.totalUsuarios.toLocaleString('es-CO')}</span> usuarios
          </span>

          <Pagination
            page={paginaActual}
            totalPages={Math.ceil(ESTADISTICAS_USUARIOS_MOCK.totalUsuarios / 10)}
            onChange={(nuevaPagina) => setPaginaActual(nuevaPagina)}
          />
        </div>

      </div>

      {/* Modal de creación y edición */}
      <UserFormModal
        isOpen={modalAbierto}
        onClose={() => {
          setModalAbierto(false);
          setUsuarioEditar(null);
        }}
        initialData={usuarioEditar}
        onSave={handleGuardarUsuarioModal}
      />
    </div>
  );
}
