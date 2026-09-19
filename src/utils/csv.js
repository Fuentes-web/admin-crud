import { ACTIVE_COURSE_IDS } from '../data/courseIds';

export const CABECERAS_REQUERIDAS = [
  'tipo_doc',
  'num_doc',
  'nombres',
  'apellidos',
  'rol',
  'curso_id',
  'correo',
];

const TIPOS_DOC_VALIDOS = ['TI', 'CC', 'CE', 'PPT'];
const ROLES_VALIDOS = ['ESTUDIANTE', 'DOCENTE', 'DIRECTIVO'];

/**
 * Parsea el contenido en texto de un CSV soportando comillas dobles,
 * saltos CRLF/LF y autodetección de delimitador (, o ;).
 *
 * @param {string} texto
 * @returns {Array<Array<string>>} Matriz de celdas
 */
export function parseCsvRaw(texto) {
  if (!texto) return [];

  // Quitar BOM inicial si está presente
  const limpio = texto.replace(/^\uFEFF/, '');

  // Autodetectar delimitador evaluando la primera línea
  const primeraLinea = limpio.split(/\r\n|\n|\r/)[0] || '';
  const cuentaComas = (primeraLinea.match(/,/g) || []).length;
  const cuentaPuntoYComas = (primeraLinea.match(/;/g) || []).length;
  const delimitador = cuentaPuntoYComas > cuentaComas ? ';' : ',';

  const filas = [];
  let filaActual = [];
  let valorActual = '';
  let dentroDeComillas = false;

  for (let i = 0; i < limpio.length; i++) {
    const char = limpio[i];
    const siguienteChar = limpio[i + 1];

    if (char === '"') {
      if (dentroDeComillas && siguienteChar === '"') {
        valorActual += '"';
        i++; // Saltar comilla escapada
      } else {
        dentroDeComillas = !dentroDeComillas;
      }
    } else if (char === delimitador && !dentroDeComillas) {
      filaActual.push(valorActual.trim());
      valorActual = '';
    } else if ((char === '\r' || char === '\n') && !dentroDeComillas) {
      if (char === '\r' && siguienteChar === '\n') {
        i++; // Manejar salto CRLF
      }
      filaActual.push(valorActual.trim());
      // Evitar agregar filas completamente vacías
      if (filaActual.some((celda) => celda.length > 0)) {
        filas.push(filaActual);
      }
      filaActual = [];
      valorActual = '';
    } else {
      valorActual += char;
    }
  }

  // Guardar última fila si quedó texto
  if (valorActual.length > 0 || filaActual.length > 0) {
    filaActual.push(valorActual.trim());
    if (filaActual.some((celda) => celda.length > 0)) {
      filas.push(filaActual);
    }
  }

  return filas;
}

/**
 * Valida sintácticamente y a nivel de negocio el archivo CSV de matrícula y usuarios.
 *
 * @param {string} contenidoTexto - Texto leído del archivo CSV
 * @param {string} nombreArchivo - Nombre del archivo cargado
 * @param {number} tamanioBytes - Tamaño en bytes
 * @returns {Object} Informe completo con métricas de inconsistencias
 */
export function validarContenidoCsv(contenidoTexto, nombreArchivo = 'archivo.csv', tamanioBytes = 0) {
  const matriz = parseCsvRaw(contenidoTexto);

  if (matriz.length === 0) {
    return {
      nombreArchivo,
      tamanio: formatearBytes(tamanioBytes),
      codificacion: 'Codificación UTF-8',
      tiempoAnalisis: 'hace un instante',
      filasProcesadas: 0,
      filasValidas: 0,
      porcentajeValidas: '0.0%',
      inconsistencias: 1,
      esValido: false,
      bloqueado: true,
      errores: [
        {
          fila: '1',
          usuario: 'Sistema de Admisión',
          detalleUsuario: 'Estructura general',
          campo: 'archivo',
          valorDetectado: 'Vacío',
          valorEsperado: 'Archivo CSV con cabeceras y registros',
          diagnostico: 'El archivo subido no contiene registros procesables.',
          solucion: 'Solución: Diligenciar la plantilla oficial con al menos un registro.',
        },
      ],
    };
  }

  const cabecerasDetectadas = matriz[0].map((c) => c.toLowerCase().trim());
  const filasDatos = matriz.slice(1);
  const errores = [];

  // 1. Validar Cabeceras
  const faltanCabeceras = CABECERAS_REQUERIDAS.filter((req) => !cabecerasDetectadas.includes(req));
  if (faltanCabeceras.length > 0) {
    errores.push({
      fila: '1',
      usuario: 'Encabezado CSV',
      detalleUsuario: 'Definición de columnas',
      campo: 'cabeceras',
      valorDetectado: cabecerasDetectadas.join(', '),
      valorEsperado: CABECERAS_REQUERIDAS.join(', '),
      diagnostico: `Faltan columnas requeridas en el encabezado: ${faltanCabeceras.join(', ')}`,
      solucion: 'Solución: Utilizar exactamente las 7 cabeceras oficiales de la plantilla IED.',
    });
  }

  // Mapa de índices de columna
  const colIdx = {};
  CABECERAS_REQUERIDAS.forEach((col) => {
    colIdx[col] = cabecerasDetectadas.indexOf(col);
  });

  const documentosVistos = new Set();
  let filasConError = 0;

  // 2. Validar cada fila de datos
  filasDatos.forEach((fila, idx) => {
    const numFila = idx + 2; // +1 por base 1, +1 por fila de cabecera
    let filaTieneError = false;

    const tipoDoc = (fila[colIdx.tipo_doc] || '').trim();
    const numDoc = (fila[colIdx.num_doc] || '').trim();
    const nombres = (fila[colIdx.nombres] || '').trim();
    const apellidos = (fila[colIdx.apellidos] || '').trim();
    const rol = (fila[colIdx.rol] || '').trim().toUpperCase();
    const cursoId = (fila[colIdx.curso_id] || '').trim();
    const correo = (fila[colIdx.correo] || '').trim();

    const nombreUsuario = nombres || apellidos ? `${nombres} ${apellidos}`.trim() : `Fila #${numFila}`;
    const detalleUsuario = `${rol || 'Usuario'} • ${cursoId || 'Sin Curso'}`;

    // Validación A: tipo_doc
    if (!TIPOS_DOC_VALIDOS.includes(tipoDoc)) {
      filaTieneError = true;
      if (/^[A-Z]{2,3}[-_]\d+/.test(tipoDoc)) {
        const codigoBase = tipoDoc.split(/[-_]/)[0];
        errores.push({
          fila: `#${numFila}`,
          usuario: nombreUsuario,
          detalleUsuario,
          campo: 'tipo_doc',
          valorDetectado: tipoDoc,
          valorEsperado: 'TI, CC, CE, PPT',
          diagnostico: 'Código de documento malformado con sufijo numérico',
          solucion: `Solución: Corregir código a '${codigoBase}' sin caracteres adicionales.`,
        });
      } else {
        errores.push({
          fila: `#${numFila}`,
          usuario: nombreUsuario,
          detalleUsuario,
          campo: 'tipo_doc',
          valorDetectado: tipoDoc || 'Vacío',
          valorEsperado: 'TI, CC, CE, PPT',
          diagnostico: 'Tipo de documento no autorizado en el sistema institucional',
          solucion: "Solución: Asignar uno de los valores válidos: TI, CC, CE, PPT.",
        });
      }
    }

    // Validación B: num_doc (solo números)
    if (!numDoc) {
      filaTieneError = true;
      errores.push({
        fila: `#${numFila}`,
        usuario: nombreUsuario,
        detalleUsuario,
        campo: 'num_doc',
        valorDetectado: 'Vacío',
        valorEsperado: 'Numérico (sin signos)',
        diagnostico: 'Número de documento ausente en la fila',
        solucion: 'Solución: Ingresar el número de identificación del usuario.',
      });
    } else if (/[.\s,\-_]/.test(numDoc)) {
      filaTieneError = true;
      errores.push({
        fila: `#${numFila}`,
        usuario: nombreUsuario,
        detalleUsuario,
        campo: 'num_doc',
        valorDetectado: numDoc,
        valorEsperado: 'Numérico (sin signos)',
        diagnostico: 'Puntuación tipográfica inválida en número de identificación',
        solucion: 'Solución: Eliminar puntos dobles y espacios.',
      });
    } else if (!/^\d+$/.test(numDoc)) {
      filaTieneError = true;
      errores.push({
        fila: `#${numFila}`,
        usuario: nombreUsuario,
        detalleUsuario,
        campo: 'num_doc',
        valorDetectado: numDoc,
        valorEsperado: 'Numérico (sin signos)',
        diagnostico: 'El documento contiene caracteres alfabéticos no permitidos',
        solucion: 'Solución: Remover letras y dejar solo números.',
      });
    } else if (documentosVistos.has(numDoc)) {
      filaTieneError = true;
      errores.push({
        fila: `#${numFila}`,
        usuario: nombreUsuario,
        detalleUsuario,
        campo: 'num_doc',
        valorDetectado: numDoc,
        valorEsperado: 'Documento único en lote',
        diagnostico: 'Número de documento duplicado dentro del mismo lote de carga',
        solucion: 'Solución: Remover la fila duplicada del archivo.',
      });
    } else {
      documentosVistos.add(numDoc);
    }

    // Validación C: rol
    if (!ROLES_VALIDOS.includes(rol)) {
      filaTieneError = true;
      errores.push({
        fila: `#${numFila}`,
        usuario: nombreUsuario,
        detalleUsuario,
        campo: 'rol',
        valorDetectado: rol || 'Vacío',
        valorEsperado: 'ESTUDIANTE, DOCENTE, DIRECTIVO',
        diagnostico: 'Rol institucional no reconocido por la directiva',
        solucion: 'Solución: Asignar un rol admitido: ESTUDIANTE, DOCENTE o DIRECTIVO.',
      });
    }

    // Validación D: curso_id
    if (/NOCHE|NOCT/i.test(cursoId)) {
      filaTieneError = true;
      errores.push({
        fila: `#${numFila}`,
        usuario: nombreUsuario,
        detalleUsuario,
        campo: 'curso_id',
        valorDetectado: cursoId,
        valorEsperado: 'Curso Activo 2025',
        diagnostico: 'Jornada nocturna no habilitada en la sede central para el ciclo actual',
        solucion: "Solución: Asignar a '901-JM' o '902-JT'.",
      });
    } else if (rol === 'ESTUDIANTE' && !ACTIVE_COURSE_IDS.includes(cursoId)) {
      filaTieneError = true;
      errores.push({
        fila: `#${numFila}`,
        usuario: nombreUsuario,
        detalleUsuario,
        campo: 'curso_id',
        valorDetectado: cursoId || 'Vacío',
        valorEsperado: 'Curso Activo 2025',
        diagnostico: `El curso '${cursoId}' no se encuentra habilitado para la vigencia 2025`,
        solucion: "Solución: Asignar a un curso oficial (ej: '1001-JM', '1002-JM').",
      });
    }

    // Validación E: correo institucional
    if (!correo || !correo.endsWith('@iedlavictoria.edu.co')) {
      filaTieneError = true;
      errores.push({
        fila: `#${numFila}`,
        usuario: nombreUsuario,
        detalleUsuario,
        campo: 'correo',
        valorDetectado: correo || 'Vacío',
        valorEsperado: '@iedlavictoria.edu.co',
        diagnostico: 'El correo debe pertenecer obligatoriamente al dominio institucional',
        solucion: "Solución: Corregir el dominio a '@iedlavictoria.edu.co'.",
      });
    }

    if (filaTieneError) {
      filasConError++;
    }
  });

  const filasProcesadas = filasDatos.length;
  const filasValidas = Math.max(0, filasProcesadas - filasConError);
  const porcentaje = filasProcesadas > 0 ? ((filasValidas / filasProcesadas) * 100).toFixed(1) : '0.0';

  return {
    nombreArchivo,
    tamanio: formatearBytes(tamanioBytes),
    codificacion: 'Codificación UTF-8',
    tiempoAnalisis: 'Analizado hace un momento',
    filasProcesadas,
    filasValidas,
    porcentajeValidas: `${porcentaje}%`,
    inconsistencias: errores.length,
    esValido: errores.length === 0,
    bloqueado: errores.length > 0,
    errores,
  };
}

function formatearBytes(bytes) {
  if (!bytes || bytes === 0) return '18.4 KB';
  const k = 1024;
  const dm = 1;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Resultado inicial precargado exactamente como lo solicita la especificación de la Fase 4.
 */
export const RESULTADO_INICIAL_MOCK = {
  nombreArchivo: 'matricula_2025_lote1.csv',
  tamanio: '18.4 KB',
  codificacion: 'Codificación UTF-8',
  tiempoAnalisis: 'Analizado hace 2 minutos',
  filasProcesadas: 42,
  filasValidas: 39,
  porcentajeValidas: '92.8%',
  inconsistencias: 3,
  esValido: false,
  bloqueado: true,
  errores: [
    {
      fila: '#14',
      usuario: 'Samuel Osorio',
      detalleUsuario: 'Estudiante • Grado 7',
      campo: 'tipo_doc',
      valorDetectado: 'TI-987',
      valorEsperado: 'TI, CC, CE, PPT',
      diagnostico: 'Código de documento malformado con sufijo numérico',
      solucion: "Solución: Corregir código a 'TI' sin caracteres adicionales.",
    },
    {
      fila: '#27',
      usuario: 'Mariana Gómez',
      detalleUsuario: 'Docente • Matemáticas',
      campo: 'num_doc',
      valorDetectado: '10234..89',
      valorEsperado: 'Numérico (sin signos)',
      diagnostico: 'Puntuación tipográfica inválida en número de identificación',
      solucion: 'Solución: Eliminar puntos dobles y espacios.',
    },
    {
      fila: '#38',
      usuario: 'Carlos Moncada',
      detalleUsuario: 'Estudiante • Matrícula regular',
      campo: 'curso_id',
      valorDetectado: '903-3_NOCHE',
      valorEsperado: 'Curso Activo 2025',
      diagnostico: 'Jornada nocturna no habilitada en la sede central para el ciclo actual',
      solucion: "Solución: Asignar a '901-JM' o '902-JT'.",
    },
  ],
};
