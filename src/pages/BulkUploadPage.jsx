import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { downloadCsv } from '../utils/download';

/**
 * Página de carga masiva de usuarios vía archivo CSV.
 */
export function BulkUploadPage() {
  const handleDescargarPlantillaEjemplo = () => {
    const encabezados = ['tipo_documento', 'numero_documento', 'nombres', 'apellidos', 'correo', 'rol', 'curso'];
    const ejemplo = ['TI', '1045234890', 'Camilo Andrés', 'Pérez Silva', 'camilo.perez@iedlavictoria.edu.co', 'Estudiante', '11-A'];
    downloadCsv('plantilla_usuarios_ied_la_victoria', [encabezados, ejemplo]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Importación"
        title="Carga Masiva CSV"
        subtitle="Cargue de registros masivos de estudiantes y docentes mediante archivo delimitado."
        actions={
          <Button
            variant="secondary"
            size="md"
            iconLeft="download"
            onClick={handleDescargarPlantillaEjemplo}
          >
            Descargar plantilla
          </Button>
        }
      />

      {/* Tarjeta de estado de fase */}
      <div className="bg-white border border-line rounded-2xl p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
            <Icon name="file-up" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Módulo de Carga Masiva</h2>
            <p className="text-sm text-ink-2">Fase 0: Estructura base y descarga de plantilla con BOM UTF-8 preparadas.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 text-sm text-brand-900 leading-relaxed">
          El validador fila por fila de CSV, la zona de arrastrar y soltar (drag & drop) y la vista previa con reporte de inconsistencias se incorporarán en la fase de carga masiva.
        </div>
      </div>
    </div>
  );
}
