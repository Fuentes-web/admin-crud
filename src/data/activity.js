/**
 * Datos mock institucionales para la consola y actividad de usuarios.
 * Vigencia 2025 - IED La Victoria.
 */

export const ACTIVIDAD_RECIENTE_MOCK = [
  {
    id: 'usr-001',
    nombre: 'Manuel González Polo',
    tipoDocumento: 'CC',
    documento: '72341809',
    documentoFormateado: '72.341.809',
    detalle: 'Área Matemáticas',
    rol: 'Docente',
    estado: 'Activo',
    ultimaModificacion: 'Hoy, 10:42 AM',
  },
  {
    id: 'usr-002',
    nombre: 'Sofía Lucía Mendoza',
    tipoDocumento: 'TI',
    documento: '1043921402',
    documentoFormateado: '1.043.921.402',
    detalle: 'Grado 10-B',
    rol: 'Estudiante',
    estado: 'Activo',
    ultimaModificacion: 'Hoy, 09:15 AM',
  },
  {
    id: 'usr-003',
    nombre: 'Carlos Mario Restrepo',
    tipoDocumento: 'CC',
    documento: '8530129',
    documentoFormateado: '8.530.129',
    detalle: 'Coord. Académica Sede A',
    rol: 'Coordinador',
    estado: 'Activo',
    ultimaModificacion: 'Ayer, 04:30 PM',
  },
  {
    id: 'usr-004',
    nombre: 'Edgar Rivera',
    tipoDocumento: 'CC',
    documento: '1140820001',
    documentoFormateado: '1.140.820.001',
    detalle: 'Soporte TI General',
    rol: 'Administrador',
    estado: 'Activo',
    ultimaModificacion: '15 Ene 2025',
  },
  {
    id: 'usr-005',
    nombre: 'Jorge Luis Valencia',
    tipoDocumento: 'TI',
    documento: '1045670332',
    documentoFormateado: '1.045.670.332',
    detalle: 'Grado 8-A',
    rol: 'Estudiante',
    estado: 'Inactivo',
    ultimaModificacion: '12 Ene 2025',
  },
];

export const DISTRIBUCION_ROLES_MOCK = [
  {
    rol: 'Estudiantes',
    cantidad: 1180,
    porcentaje: '91.9%',
    colorClase: 'bg-brand-900',
    dotClase: 'bg-brand-900',
  },
  {
    rol: 'Docentes',
    cantidad: 76,
    porcentaje: '5.9%',
    colorClase: 'bg-brand-300',
    dotClase: 'bg-brand-300',
  },
  {
    rol: 'Coordinación',
    cantidad: 24,
    porcentaje: '1.9%',
    colorClase: 'bg-brand-100',
    dotClase: 'bg-brand-100',
  },
  {
    rol: 'Admin TI',
    cantidad: 4,
    porcentaje: '0.3%',
    colorClase: 'bg-ink',
    dotClase: 'bg-ink',
  },
];

export const METRICAS_GENERALES_MOCK = {
  totalUsuarios: '1,284',
  totalEstudiantes: '1,180',
  totalDocentes: '76',
  totalCursos: '24',
};
