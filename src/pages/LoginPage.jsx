import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Field } from '../components/ui/Field';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { SchoolFacade } from '../components/illustrations/SchoolFacade';

const OPCIONES_DOCUMENTO = [
  { value: 'CC', label: 'Cédula de Ciudadanía (CC)' },
  { value: 'TI', label: 'Tarjeta de Identidad (TI)' },
  { value: 'CE', label: 'Cédula de Extranjería (CE)' },
  { value: 'PPT', label: 'Permiso por Protección Temporal (PPT)' },
];

/**
 * Vista de Login institucional ("Acceso Institucional al Sistema").
 * Diseñado con layout de dos columnas, ilustración de fachada escolar,
 * validación accesible y adaptación responsiva.
 *
 * @param {Object} props
 * @param {Function} props.onNavigate - Función de navegación por hash
 */
export function LoginPage({ onNavigate }) {
  const { login } = useAuth();
  const { show } = useToast();

  const [tipoDocumento, setTipoDocumento] = useState('CC');
  const [numeroDocumento, setNumeroDocumento] = useState('1042456789');
  const [password, setPassword] = useState('1042456789');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  // Errores de validación inline
  const [errores, setErrores] = useState({});

  // Manejo de cambio en documento: solo admite dígitos
  const handleDocumentoChange = (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, '');
    setNumeroDocumento(soloNumeros);
    if (errores.documento) {
      setErrores((prev) => ({ ...prev, documento: undefined }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errores.password) {
      setErrores((prev) => ({ ...prev, password: undefined }));
    }
  };

  const handleOlvidoClave = (e) => {
    e.preventDefault();
    show(
      'Para restablecer su acceso, contacte a Secretaría Académica en el Bloque A o escriba a soporte@iedlavictoria.edu.co.',
      'info',
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    if (!numeroDocumento.trim()) {
      nuevosErrores.documento = 'El número de documento es obligatorio.';
    } else if (numeroDocumento.trim().length < 6) {
      nuevosErrores.documento = 'Ingrese un número de documento válido (mínimo 6 dígitos).';
    }

    if (!password) {
      nuevosErrores.password = 'La contraseña de acceso es obligatoria.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      show('Por favor corrija los campos marcados para continuar.', 'error');
      return;
    }

    // Login simulado con retardo de 600 ms
    setCargando(true);
    setTimeout(() => {
      login({
        nombre: 'Edgar Rivera',
        cargo: 'Administrador General',
        rol: 'Administrador',
        tipoDocumento,
        documento: numeroDocumento,
      });

      show('Bienvenido al sistema institucional IED La Victoria.', 'success');
      onNavigate('#/panel');
      setCargando(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Tarjeta central de ~1150px con dos columnas */}
      <div className="w-full max-w-[1150px] bg-white rounded-3xl border border-line shadow-subtle overflow-hidden flex flex-col lg:flex-row">
        
        {/* COLUMNA IZQUIERDA: Identidad Institucional + Fachada Escolar */}
        <div className="w-full lg:w-[460px] xl:w-[480px] bg-brand-50 border-b lg:border-b-0 lg:border-r border-line p-6 sm:p-8 lg:p-10 flex flex-col justify-between shrink-0">
          
          {/* Cabecera institucional */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-subtle shrink-0">
                <Icon name="graduation-cap" size={22} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-ink-3">
                  DISTRITO DE BARRANQUILLA
                </p>
                <p className="font-bold text-ink text-base leading-tight">
                  IED La Victoria
                </p>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <h2 className="text-xl sm:text-[20px] font-semibold text-ink leading-snug">
                Educación pública con visión de futuro y rigor institucional
              </h2>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                Gestión centralizada de matrículas, calificaciones, expedientes docentes y servicio de atención ciudadana escolar.
              </p>
            </div>
          </div>

          {/* Tarjeta de imagen con ilustración SchoolFacade (solo en pantallas grandes para mantener el orden y aire) */}
          <div className="hidden lg:block my-6">
            <div className="relative rounded-2xl overflow-hidden shadow-subtle border border-line bg-brand-100 aspect-[4/3]">
              <SchoolFacade className="w-full h-full object-cover" />

              {/* Badge translúcido arriba a la derecha */}
              <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-brand-900 px-3 py-1 rounded-full shadow-sm tracking-wider uppercase">
                JORNADA CONTINUA
              </div>

              {/* Degradado oscuro inferior para legibilidad */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent p-4 text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                  <Icon name="building" size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-tight">Sede Principal</p>
                  <p className="text-[11px] text-slate-200 truncate">
                    Calle 45B · Barranquilla, Atlántico
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Línea divisoria al pie de la columna izquierda */}
          <div className="pt-4 border-t border-line text-[11px] text-ink-3 hidden lg:flex items-center justify-between">
            <span>Vigencia Académica 2025</span>
            <span className="font-medium text-brand-700">Proyecto C</span>
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario de Acceso Institucional */}
        <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Título de la vista */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-ink leading-tight">
                Acceso Institucional al Sistema
              </h1>
              <p className="text-sm text-ink-2">
                Módulo unificado de administración de usuarios, docentes y estudiantes.
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {/* Select: Tipo de Identificación */}
              <Field
                id="tipo-documento"
                label="Tipo de Identificación"
                required
              >
                <Select
                  id="tipo-documento"
                  name="tipoDocumento"
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                  options={OPCIONES_DOCUMENTO}
                  disabled={cargando}
                />
              </Field>

              {/* Input: Número de Documento */}
              <Field
                id="numero-documento"
                label="Número de Documento"
                required
                error={errores.documento}
              >
                <div className="relative">
                  <input
                    id="numero-documento"
                    name="numeroDocumento"
                    type="text"
                    inputMode="numeric"
                    placeholder="Ej. 1042456789"
                    value={numeroDocumento}
                    onChange={handleDocumentoChange}
                    disabled={cargando}
                    aria-invalid={Boolean(errores.documento)}
                    aria-describedby={errores.documento ? 'numero-documento-error' : undefined}
                    className={`w-full h-10 px-3.5 pr-10 text-sm bg-surface rounded-[10px] border ${
                      errores.documento
                        ? 'border-danger-line bg-danger-bg text-danger-fg focus-visible:outline-danger-fg'
                        : 'border-line text-ink placeholder:text-ink-3 focus-visible:outline-brand-600'
                    } focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-3">
                    <Icon name="id-card" size={18} />
                  </div>
                </div>
              </Field>

              {/* Input: Contraseña de Acceso */}
              <Field
                id="password-acceso"
                label="Contraseña de Acceso"
                required
                error={errores.password}
                labelAction={
                  <a
                    href="#recuperar"
                    onClick={handleOlvidoClave}
                    className="text-xs font-medium text-brand-700 hover:text-brand-800 transition-colors focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
                  >
                    ¿Olvidó su clave?
                  </a>
                }
              >
                <div className="relative">
                  <input
                    id="password-acceso"
                    name="password"
                    type={mostrarPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={cargando}
                    aria-invalid={Boolean(errores.password)}
                    aria-describedby={errores.password ? 'password-acceso-error' : undefined}
                    className={`w-full h-10 px-3.5 pr-10 text-sm bg-surface rounded-[10px] border ${
                      errores.password
                        ? 'border-danger-line bg-danger-bg text-danger-fg focus-visible:outline-danger-fg'
                        : 'border-line text-ink placeholder:text-ink-3 focus-visible:outline-brand-600'
                    } focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink p-1 rounded focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    <Icon name={mostrarPassword ? 'eye-off' : 'eye'} size={18} />
                  </button>
                </div>
              </Field>

              {/* Caja informativa de primer ingreso */}
              <div className="p-3.5 bg-brand-100 border border-brand-200 rounded-xl text-xs text-brand-900 flex items-start gap-2.5">
                <Icon name="info" size={18} className="text-brand-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-semibold">Primer ingreso:</span> Su contraseña provisional corresponde exactamente al número de identificación registrado.
                </p>
              </div>

              {/* Botón de envío: altura 48px (h-12) */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={cargando}
                  className="w-full h-12 text-base font-semibold"
                  iconRight={cargando ? undefined : 'arrow-right'}
                >
                  {cargando ? 'Ingresando…' : 'Ingresar al Sistema'}
                </Button>
              </div>
            </form>

            {/* Caja informativa de soporte institucional */}
            <div className="p-3.5 bg-surface border border-line rounded-xl text-xs text-ink-2 flex items-start gap-2.5">
              <Icon name="headset" size={18} className="text-brand-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-semibold text-ink">Secretaría Académica & Soporte Técnico:</span>{' '}
                Atención presencial Bloque A o al correo{' '}
                <a
                  href="mailto:soporte@iedlavictoria.edu.co"
                  className="text-brand-700 hover:underline font-medium"
                >
                  soporte@iedlavictoria.edu.co
                </a>{' '}
                · Lunes a Viernes · 7:00 a 16:00.
              </p>
            </div>

            {/* Pie centrado institucional con cumplimiento legal */}
            <div className="border-t border-line pt-4 space-y-1 text-center">
              <p className="text-[11px] text-ink-3 leading-relaxed">
                Cumplimiento Ley Estatutaria 1581 de 2012 de Protección de Datos Personales (Habeas Data Escolar) y Decreto 1377 de 2013.
              </p>
              <p className="text-[11px] text-ink-3 font-medium">
                Alcaldía Mayor de Barranquilla · Secretaría de Educación Distrital
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
