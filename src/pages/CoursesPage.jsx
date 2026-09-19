import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

/**
 * Página de gestión de cursos lectivos y vigencias académicas.
 */
export function CoursesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Organización Académica"
        title="Cursos y Vigencia"
        subtitle="Configuración de cursos lectivos, asignación de tutores y vigencias anuales."
        actions={
          <Button variant="primary" size="md" iconLeft="plus">
            Nuevo curso
          </Button>
        }
      />

      {/* Tarjeta de estado de fase */}
      <div className="bg-white border border-line rounded-2xl p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
            <Icon name="calendar" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Módulo de Cursos y Vigencias</h2>
            <p className="text-sm text-ink-2">Fase 0: Estructura base y navegación configuradas.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 text-sm text-brand-900 leading-relaxed">
          La gestión de cursos por vigencia anual, el enlace de tutores a grupos y la consulta histórica se construirán en la fase de cursos.
        </div>
      </div>
    </div>
  );
}
