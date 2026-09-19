import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

/**
 * Página principal del panel administrativo (Dashboard).
 */
export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Resumen Institucional"
        title="Panel Principal"
        subtitle="Vista general de la plataforma de identidad escolar y estadísticas de vigencia 2025."
        actions={
          <Button variant="secondary" size="md" iconLeft="refresh">
            Actualizar datos
          </Button>
        }
      />

      {/* Tarjeta de estado de fase */}
      <div className="bg-white border border-line rounded-2xl p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
            <Icon name="grid" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Módulo en Preparación</h2>
            <p className="text-sm text-ink-2">Fase 0: Estructura base, diseño y navegación implementados correctamente.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 text-sm text-brand-900 leading-relaxed">
          Los componentes visuales, métricas y accesos rápidos del panel principal se integrarán en las fases siguientes del proyecto.
        </div>
      </div>
    </div>
  );
}
