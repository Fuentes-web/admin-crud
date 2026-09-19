import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

/**
 * Página de gestión de usuarios institucionales.
 */
export function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administración"
        title="Gestión de Usuarios"
        subtitle="Consulta, creación y administración de roles y estados de la comunidad educativa."
        actions={
          <Button variant="primary" size="md" iconLeft="user-plus">
            Nuevo usuario
          </Button>
        }
      />

      {/* Tarjeta de estado de fase */}
      <div className="bg-white border border-line rounded-2xl p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
            <Icon name="users" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Módulo de Usuarios</h2>
            <p className="text-sm text-ink-2">Fase 0: Estructura base y navegación configuradas.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 text-sm text-brand-900 leading-relaxed">
          La tabla de usuarios, filtros por rol y estado, paginación y modal de edición/creación se implementarán en la fase de usuarios.
        </div>
      </div>
    </div>
  );
}
