/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { ToastContainer } from '../components/ui/Toast';

const ToastContext = createContext(null);

/**
 * Proveedor del contexto de notificaciones Toast.
 * Despacha notificaciones flotantes accesibles que se auto-cierran en 4 segundos.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const temporizadores = useRef({});

  const dismiss = useCallback((id) => {
    if (temporizadores.current[id]) {
      clearTimeout(temporizadores.current[id]);
      delete temporizadores.current[id];
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (mensaje, tipo = 'info') => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
      const nuevoToast = { id, mensaje, tipo };

      setToasts((prev) => [...prev, nuevoToast]);

      temporizadores.current[id] = setTimeout(() => {
        dismiss(id);
      }, 4000);

      return id;
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

/**
 * Hook para disparar toasts desde cualquier componente.
 * Ejemplo: const { show } = useToast(); show('Mensaje exitoso', 'success');
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser utilizado dentro de un ToastProvider');
  }
  return context;
}
