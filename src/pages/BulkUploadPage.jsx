import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Dropzone } from '../components/csv/Dropzone';
import { ErrorReport } from '../components/csv/ErrorReport';
import { useToast } from '../context/ToastContext';
import { downloadCsv } from '../utils/download';
import {
  validarContenidoCsv,
  RESULTADO_INICIAL_MOCK,
  CABECERAS_REQUERIDAS,
} from '../utils/csv';

/**
 * Vista de Carga Masiva de Usuarios por CSV (Admisión masiva institucional).
 * Implementa validación estricta fila por fila en cliente, bloqueo atómico
 * de inserción (RF11) y reporte estructurado de inconsistencias.
 */
export function BulkUploadPage() {
  const { show } = useToast();

  // Estado inicial precargado con el resultado de ejemplo del lote 1
  const [resultado, setResultado] = useState(RESULTADO_INICIAL_MOCK);
  const [procesando, setProcesando] = useState(false);

  // Descarga de la plantilla oficial con cabeceras requeridas y 2 filas de muestra válidas
  const handleDescargarPlantilla = () => {
    const fila1 = [
      'TI',
      '1042456789',
      'Camilo Andrés',
      'Pérez Silva',
      'ESTUDIANTE',
      '1001-JM',
      'camilo.perez@iedlavictoria.edu.co',
    ];
    const fila2 = [
      'CC',
      '72345678',
      'Laura Patricia',
      'Navarro Ortiz',
      'DOCENTE',
      '1001-JM',
      'laura.navarro@iedlavictoria.edu.co',
    ];

    downloadCsv('plantilla_admision_ied_la_victoria_2025', [CABECERAS_REQUERIDAS, fila1, fila2]);
    show('Plantilla CSV oficial descargada correctamente.', 'success');
  };

  // Manejo de archivo cargado mediante la Dropzone
  const handleArchivoCargado = (file, texto) => {
    const analisis = validarContenidoCsv(texto, file.name, file.size);
    setResultado(analisis);

    if (analisis.esValido) {
      show('Archivo validado con 100% de consistencia sintáctica y de negocio.', 'success');
    } else {
      show(`Se detectaron ${analisis.inconsistencias} inconsistencias que requieren corrección.`, 'error');
    }
  };

  // Descartar archivo y volver a la zona de carga inicial
  const handleDescartarArchivo = () => {
    setResultado(null);
    show('Archivo descartado. Puede cargar una nueva versión corregida.', 'info');
  };

  // Simulación de procesamiento definitivo (solo habilitado con 0 inconsistencias)
  const handleProcesarDefinitivo = () => {
    if (!resultado || !resultado.esValido) return;

    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      show(`Carga procesada exitosamente: ${resultado.filasValidas} registros sincronizados en el padrón 2025.`, 'success');
      setResultado(null);
    }, 900);
  };

  const handleAyuda = () => {
    show('Consulte la especificación de cabeceras y formatos a la derecha de la zona de carga.', 'info');
  };

  return (
    <div className="space-y-8">
      {/* 1. Encabezado principal */}
      <PageHeader
        eyebrow="MÓDULO DE ADMISIÓN MASIVA • Vigencia Académica 2025"
        title="Carga Masiva de Usuarios por CSV"
        subtitle="Importación y actualización de estudiantes, docentes y directivos mediante archivo estructurado"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="md"
              iconLeft="download"
              onClick={handleDescargarPlantilla}
            >
              Descargar Plantilla Oficial (.csv)
            </Button>
            <button
              type="button"
              onClick={handleAyuda}
              aria-label="Ayuda sobre la carga masiva"
              className="w-10 h-10 rounded-[10px] border border-line bg-white hover:bg-brand-50 text-ink-2 hover:text-brand-700 flex items-center justify-center shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-brand-600"
            >
              <Icon name="help-circle" size={20} />
            </button>
          </div>
        }
      />

      {/* 2. Fila superior en grilla (2fr / 1fr): Dropzone + Tarjeta de especificación RF10 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Dropzone (2 columnas) */}
        <div className="lg:col-span-2">
          <Dropzone
            onFileLoaded={handleArchivoCargado}
            onError={(msg) => show(msg, 'error')}
          />
        </div>

        {/* Tarjeta de Especificación RF10 (1 columna) */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.08em] font-bold text-brand-700">
              ESPECIFICACIÓN RF10
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
              7 Campos
            </span>
          </div>

          <div>
            <h2 className="text-base font-semibold text-ink leading-snug">Estructura Obligatoria</h2>
            <p className="text-xs text-ink-2 mt-1 leading-relaxed">
              Las cabeceras deben coincidir exactamente sin espacios en blanco adicionales:
            </p>
          </div>

          {/* Chips monoespaciados de las 7 cabeceras */}
          <div className="flex flex-wrap gap-1.5">
            {CABECERAS_REQUERIDAS.map((campo) => (
              <span
                key={campo}
                className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-900 select-all"
              >
                {campo}
              </span>
            ))}
          </div>

          {/* Caja informativa de roles autorizados */}
          <div className="p-3.5 bg-surface border border-line rounded-xl text-xs text-ink-2 flex items-start gap-2.5">
            <Icon name="info" size={18} className="text-brand-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-semibold text-ink">Roles admitidos:</span> ESTUDIANTE, DOCENTE, DIRECTIVO.
            </p>
          </div>
        </div>

      </div>

      {/* 3. Panel de resultado del análisis (visible cuando hay archivo analizado) */}
      {resultado && (
        <div className="space-y-6">
          
          {/* Tarjeta de resultado y métricas del lote */}
          <div className="bg-white border border-line rounded-2xl p-6 shadow-subtle space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-line">
              
              {/* Información del archivo */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                  <Icon name="file-text" size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink text-base">
                      {resultado.nombreArchivo}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        resultado.inconsistencias > 0
                          ? 'bg-danger-bg text-danger-fg'
                          : 'bg-brand-100 text-brand-700'
                      }`}
                    >
                      {resultado.inconsistencias} {resultado.inconsistencias === 1 ? 'Error' : 'Errores'}
                    </span>
                  </div>
                  <p className="text-xs text-ink-3 mt-0.5">
                    {resultado.tamanio} • {resultado.tiempoAnalisis} • {resultado.codificacion}
                  </p>
                </div>
              </div>

              {/* Tres métricas destacadas */}
              <div className="flex items-center gap-4 sm:gap-6 self-start md:self-auto">
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-ink-3">
                    FILAS PROCESADAS
                  </p>
                  <p className="text-2xl font-semibold text-ink tabular-nums leading-tight">
                    {resultado.filasProcesadas}
                  </p>
                </div>

                <div className="w-px h-8 bg-line" aria-hidden="true" />

                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-ink-3">
                    FILAS VÁLIDAS
                  </p>
                  <p className="text-2xl font-semibold text-brand-700 tabular-nums leading-tight">
                    {resultado.filasValidas}{' '}
                    <span className="text-xs font-normal text-ink-3">
                      ({resultado.porcentajeValidas})
                    </span>
                  </p>
                </div>

                <div className="w-px h-8 bg-line" aria-hidden="true" />

                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-ink-3">
                    INCONSISTENCIAS
                  </p>
                  <p
                    className={`text-2xl font-semibold tabular-nums leading-tight ${
                      resultado.inconsistencias > 0 ? 'text-danger-fg' : 'text-brand-700'
                    }`}
                  >
                    {resultado.inconsistencias}
                  </p>
                </div>
              </div>

            </div>

            {/* Banner de bloqueo atómico (Requerimiento RF11) */}
            {resultado.bloqueado ? (
              <div className="p-4 rounded-xl bg-danger-bg border border-danger-line flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-danger-fg text-white flex items-center justify-center shrink-0">
                  <Icon name="lock" size={18} />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-danger-fg text-sm">
                      Bloqueo de cargas parciales activo (Requerimiento RF11)
                    </h3>
                    <span className="bg-danger-fg text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      POLÍTICA IED
                    </span>
                  </div>
                  <p className="text-danger-fg leading-relaxed">
                    La inserción en base de datos está deshabilitada hasta subsanar las{' '}
                    <span className="font-semibold text-danger-fg">{resultado.inconsistencias} inconsistencias</span>. No se
                    admiten cargas parciales para evitar orfandad de registros, desajustes en asignación académica y
                    duplicidad de identidades escolares.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-brand-100 border border-brand-200 text-brand-900 flex items-center gap-3">
                <Icon name="check-circle" size={20} className="text-brand-600 shrink-0" />
                <p className="text-xs font-medium leading-relaxed">
                  Archivo 100% consistente. Todos los registros cumplen con la directiva y están listos para la inserción definitiva.
                </p>
              </div>
            )}
          </div>

          {/* Reporte detallado de inconsistencias si existen */}
          {resultado.errores.length > 0 && (
            <ErrorReport
              errores={resultado.errores}
              onConsultarCursos={() => {
                window.location.hash = '#/cursos';
              }}
            />
          )}

          {/* Barra inferior de confirmación y acciones de lote */}
          <div className="bg-white border border-line rounded-2xl p-4 sm:p-5 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              variant="soft"
              size="md"
              iconLeft="refresh"
              onClick={handleDescartarArchivo}
            >
              Descartar y subir nuevo archivo
            </Button>

            <div className="flex items-center gap-4">
              {resultado.inconsistencias > 0 ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-danger-fg">
                  <Icon name="lock" size={16} />
                  <span>Requiere 100% de consistencia</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-700">
                  <Icon name="check-circle" size={16} />
                  <span>Validación completada con éxito</span>
                </div>
              )}

              <Button
                variant="primary"
                size="md"
                iconLeft="upload-cloud"
                disabled={resultado.inconsistencias > 0 || procesando}
                onClick={handleProcesarDefinitivo}
                className={resultado.inconsistencias > 0 ? 'bg-slate-300 text-slate-500 hover:bg-slate-300 border-transparent shadow-none cursor-not-allowed' : ''}
              >
                {procesando ? 'Procesando inserción…' : 'Procesar Carga Definitiva'}
              </Button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
