import { cn } from '../../utils/cn';

/**
 * Avatar circular accesible con iniciales de usuario.
 * Variantes cromáticas asociadas a rol y estado institucional.
 *
 * @param {Object} props
 * @param {string} props.name - Nombre completo del usuario
 * @param {'Estudiante'|'Docente'|'Coordinador'|'Administrador'|string} [props.role] - Rol para determinar estilo automático
 * @param {'Activo'|'Inactivo'|string} [props.status] - Estado para determinar si está inactivo
 * @param {'brand-200'|'surface'|'brand-900'|'gray'} [props.variant] - Forzar variante visual específica
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Escala del avatar
 * @param {string} [props.className] - Clases adicionales
 */
export function Avatar({
  name = '',
  role,
  status,
  variant,
  size = 'md',
  className = '',
}) {
  // Extraer hasta dos iniciales del nombre
  const obtenerIniciales = (str) => {
    if (!str) return 'U';
    const partes = str.trim().split(/\s+/).filter(Boolean);
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return (partes[0][0] + partes[1][0]).toUpperCase();
  };

  const iniciales = obtenerIniciales(name);

  // Determinar variante de color si no se pasó explícitamente
  const resolverVariante = () => {
    if (variant) return variant;
    if (status === 'Inactivo') return 'gray';
    if (role === 'Administrador') return 'brand-900';
    if (role === 'Docente' || role === 'Coordinador') return 'brand-200';
    return 'surface';
  };

  const varianteFinal = resolverVariante();

  const estilosVariante = {
    'brand-900': 'bg-brand-900 text-white shadow-subtle',
    'brand-200': 'bg-brand-200 text-brand-900 font-semibold',
    surface: 'bg-surface text-brand-800 border border-brand-200 font-medium',
    gray: 'bg-slate-200 text-slate-500 font-medium',
  };

  const estilosTamanio = {
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm',
  };

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center shrink-0 select-none tracking-wider',
        estilosTamanio[size] || estilosTamanio.md,
        estilosVariante[varianteFinal] || estilosVariante.surface,
        className,
      )}
      aria-hidden="true"
    >
      {iniciales}
    </div>
  );
}
