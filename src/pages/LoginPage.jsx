import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

/**
 * Página de inicio de sesión institucional (sin AppShell).
 * Permite autenticarse como Administrador General según los requerimientos del proyecto.
 *
 * @param {Object} props
 * @param {Function} props.onNavigate - Callback para redirección de ruta
 */
export function LoginPage({ onNavigate }) {
  const { login } = useAuth();
  const { show } = useToast();

  const [usuarioInput, setUsuarioInput] = useState('edgar.rivera');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    setTimeout(() => {
      login({
        nombre: 'Edgar Rivera',
        cargo: 'Administrador General',
        rol: 'Administrador',
      });
      show('Bienvenido al sistema institucional IED La Victoria.', 'success');
      onNavigate('#/panel');
      setCargando(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      <div className="w-full max-w-md bg-white border border-line rounded-2xl p-8 sm:p-10 shadow-subtle space-y-8">
        {/* Cabecera del formulario de autenticación */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-brand-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-subtle">
            <Icon name="graduation-cap" size={30} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink">
              IED La Victoria
            </h1>
            <p className="text-xs uppercase tracking-[0.08em] font-semibold text-brand-700 mt-1">
              Identidad Escolar · Proyecto C
            </p>
          </div>
          <p className="text-sm text-ink-2">
            Ingrese sus credenciales institucionales para acceder a la plataforma.
          </p>
        </div>

        {/* Formulario de acceso */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="text-xs font-semibold text-ink uppercase tracking-wider block"
            >
              Usuario institucional
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                value={usuarioInput}
                onChange={(e) => setUsuarioInput(e.target.value)}
                required
                className="w-full h-10 px-3.5 pl-10 text-sm bg-surface rounded-[10px] border border-line text-ink placeholder:text-ink-3 focus-visible:outline-2 focus-visible:outline-brand-600"
                placeholder="nombre.apellido"
              />
              <div className="absolute left-3 top-2.5 text-ink-3">
                <Icon name="user" size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-ink uppercase tracking-wider block"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={mostrarPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full h-10 px-3.5 pl-10 pr-10 text-sm bg-surface rounded-[10px] border border-line text-ink placeholder:text-ink-3 focus-visible:outline-2 focus-visible:outline-brand-600"
                placeholder="Contraseña"
              />
              <div className="absolute left-3 top-2.5 text-ink-3">
                <Icon name="lock" size={18} />
              </div>
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                className="absolute right-3 top-2.5 text-ink-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
              >
                <Icon name={mostrarPassword ? 'eye-off' : 'eye'} size={18} />
              </button>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={cargando}
              className="w-full"
              iconRight="arrow-right"
            >
              {cargando ? 'Iniciando sesión...' : 'Ingresar al sistema'}
            </Button>
          </div>
        </form>

        {/* Nota institucional al pie */}
        <div className="p-3.5 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-900 flex items-start gap-2.5">
          <Icon name="info" size={18} className="text-brand-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Acceso seguro restringido a directivos, coordinadores y personal administrativo autorizado de la IED La Victoria.
          </p>
        </div>
      </div>
    </div>
  );
}
