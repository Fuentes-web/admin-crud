/**
 * Descarga una lista de filas o contenido CSV en el navegador como archivo .csv.
 * Incluye el BOM UTF-8 (\uFEFF) para garantizar la compatibilidad con Microsoft Excel
 * mostrando correctamente tildes, caracteres especiales y la letra 'ñ'.
 *
 * @param {string} nombreArchivo - Nombre para el archivo descargado.
 * @param {Array<Array<any>>|string} filas - Matriz bidimensional de valores o string CSV ya formateado.
 */
export function downloadCsv(nombreArchivo, filas) {
  let contenido = '';

  if (typeof filas === 'string') {
    contenido = filas;
  } else if (Array.isArray(filas)) {
    contenido = filas
      .map((fila) =>
        fila
          .map((celda) => {
            const valor = celda === null || celda === undefined ? '' : String(celda);
            // Si el valor contiene comas, saltos de línea o comillas, se encierra entre comillas dobles
            if (valor.includes(',') || valor.includes('"') || valor.includes('\n') || valor.includes('\r')) {
              return `"${valor.replace(/"/g, '""')}"`;
            }
            return valor;
          })
          .join(',')
      )
      .join('\r\n');
  }

  // Se añade \uFEFF (Byte Order Mark) al inicio para que Excel identifique la codificación UTF-8
  const blob = new Blob(['\uFEFF' + contenido], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');

  const nombreFinal = nombreArchivo.endsWith('.csv') ? nombreArchivo : `${nombreArchivo}.csv`;
  enlace.href = url;
  enlace.setAttribute('download', nombreFinal);
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);

  // Liberación del objeto URL de la memoria
  URL.revokeObjectURL(url);
}
