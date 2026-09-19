import { useState, useRef } from 'react';
import { Icon } from '../ui/Icon';
import { cn } from '../../utils/cn';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Zona de arrastre (Dropzone) accesible para carga de archivos CSV institucionales.
 *
 * @param {Object} props
 * @param {Function} props.onFileLoaded - Callback invocado con (file: File, text: string)
 * @param {Function} [props.onError] - Callback para reportar errores de formato o tamaño
 * @param {string} [props.className] - Clases adicionales
 */
export function Dropzone({ onFileLoaded, onError, className = '' }) {
  const [dragOver, setDragOver] = useState(false);
  const [errorLocal, setErrorLocal] = useState('');
  const inputRef = useRef(null);

  const procesarArchivo = async (file) => {
    setErrorLocal('');

    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      const msg = 'El formato seleccionado no es válido. Solo se admiten archivos .CSV delimitados.';
      setErrorLocal(msg);
      if (onError) onError(msg);
      return;
    }

    if (file.size > MAX_BYTES) {
      const msg = 'El archivo supera el límite máximo permitido de 5 MB.';
      setErrorLocal(msg);
      if (onError) onError(msg);
      return;
    }

    try {
      const texto = await file.text();
      if (onFileLoaded) {
        onFileLoaded(file, texto);
      }
    } catch {
      const msg = 'Ocurrió un error al leer el archivo. Verifique los permisos del sistema.';
      setErrorLocal(msg);
      if (onError) onError(msg);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      procesarArchivo(files[0]);
    }
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      procesarArchivo(files[0]);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label="Arrastra tu archivo CSV aquí o haz clic para examinar"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative border-2 border-dashed rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2',
        dragOver
          ? 'border-brand-500 bg-brand-50/70 scale-[0.99]'
          : errorLocal
          ? 'border-danger-line bg-danger-bg/40'
          : 'border-slate-300 bg-white hover:border-brand-300 hover:bg-brand-50/40',
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleInputChange}
        aria-hidden="true"
      />

      {/* Círculo con icono */}
      <div
        className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200',
          dragOver
            ? 'bg-brand-600 text-white scale-110 shadow-md'
            : 'bg-brand-100 text-brand-700',
        )}
      >
        <Icon name="file-up" size={28} />
      </div>

      {/* Título y descripción */}
      <h3 className="text-base font-semibold text-ink leading-tight mb-1.5">
        Arrastra tu archivo CSV aquí o haz clic para examinar
      </h3>
      <p className="text-xs text-ink-2 max-w-md leading-relaxed mb-4">
        Admite codificación UTF-8 estándar y delimitación por comas o punto y coma. Tamaño máximo admitido: 5 MB.
      </p>

      {/* Badge de validación */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
        <Icon name="check" size={14} className="text-brand-600 shrink-0" />
        <span>Validación sintáctica inmediata en navegador</span>
      </div>

      {/* Mensaje de error si no es válido */}
      {errorLocal && (
        <div className="mt-4 p-2.5 rounded-xl bg-danger-bg border border-danger-line text-xs text-danger-fg flex items-center gap-2">
          <Icon name="alert-circle" size={16} className="shrink-0" />
          <span>{errorLocal}</span>
        </div>
      )}
    </div>
  );
}
