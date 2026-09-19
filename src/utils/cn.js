/**
 * Combina clases de CSS condicionales filtrando valores falsy.
 * Mantenible y sin dependencias externas.
 *
 * @param {...any} classes - Clases de CSS en strings, arreglos o expresiones lógicas.
 * @returns {string} - Cadena con las clases válidas separadas por espacio.
 */
export function cn(...classes) {
  return classes
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
    .trim();
}
