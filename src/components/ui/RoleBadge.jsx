import { cn } from '../../utils/cn';

/**
 * Insignia de rol estandarizada para la IED La Victoria.
 *
 * @param {Object} props
 * @param {'Estudiante'|'Docente'|'Coordinador'|'Administrador'|string} props.role - Rol del usuario
 * @param {string} [props.className] - Clases adicionales
 */
export function RoleBadge({ role, className = '' }) {
  const estilosPorRol = {
    Estudiante: 'bg-slate-100 text-slate-600',
    Docente: 'bg-brand-100 text-brand-700',
    Coordinador: 'bg-indigo-50 text-indigo-700',
    Administrador: 'bg-brand-900 text-white',
  };

  const estilo = estilosPorRol[role] || 'bg-slate-100 text-slate-600';

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium select-none',
        estilo,
        className,
      )}
    >
      {role}
    </span>
  );
}
