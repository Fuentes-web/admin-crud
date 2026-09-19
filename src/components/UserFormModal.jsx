import { useState } from 'react';
import { Modal } from './ui/Modal';
import { Field } from './ui/Field';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { useToast } from '../context/ToastContext';

const OPCIONES_TIPO_DOC = [
  { value: 'TI', label: 'Tarjeta de Identidad (TI)' },
  { value: 'CC', label: 'Cédula de Ciudadanía (CC)' },
  { value: 'CE', label: 'Cédula de Extranjería (CE)' },
  { value: 'PPT', label: 'Permiso por Protección Temporal (PPT)' },
];

const OPCIONES_ROL = [
  { value: 'Estudiante', label: 'Estudiante' },
  { value: 'Docente', label: 'Docente' },
  { value: 'Coordinador', label: 'Coordinador' },
  { value: 'Administrador', label: 'Administrador' },
];

const OPCIONES_CURSO = [
  { value: 'NA', label: 'No aplica (Directivo / Administrativo)' },
  { value: '6-A', label: 'Grado 6-A' },
  { value: '6-B', label: 'Grado 6-B' },
  { value: '7-A', label: 'Grado 7-A' },
  { value: '8-A', label: 'Grado 8-A' },
  { value: '9-A', label: 'Grado 9-A' },
  { value: '10-A', label: 'Grado 10-A' },
  { value: '10-B', label: 'Grado 10-B' },
  { value: '11-A', label: 'Grado 11-A' },
  { value: '11-B', label: 'Grado 11-B' },
];

/**
 * Contenido interno del formulario.
 * Se monta con los valores iniciales limpios al abrirse el modal.
 */
function UserFormContent({ initialData, onClose, onSave }) {
  const { show } = useToast();
  const esEdicion = Boolean(initialData);

  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        tipo_doc: initialData.tipoDocumento || initialData.tipo_doc || 'CC',
        num_doc: initialData.documento || initialData.num_doc || '',
        nombres: initialData.nombres || '',
        apellidos: initialData.apellidos || '',
        rol: initialData.rol || 'Estudiante',
        curso_id: initialData.curso_id || 'NA',
        correo: initialData.correo || '',
      };
    }
    return {
      tipo_doc: 'TI',
      num_doc: '',
      nombres: '',
      apellidos: '',
      rol: 'Estudiante',
      curso_id: '10-B',
      correo: '',
    };
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const valorLimpio = name === 'num_doc' ? value.replace(/\D/g, '') : value;
    setFormData((prev) => ({ ...prev, [name]: valorLimpio }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    if (!formData.num_doc.trim()) {
      nuevosErrores.num_doc = 'El número de documento es obligatorio.';
    }
    if (!formData.nombres.trim()) {
      nuevosErrores.nombres = 'El nombre es obligatorio.';
    }
    if (!formData.apellidos.trim()) {
      nuevosErrores.apellidos = 'Los apellidos son obligatorios.';
    }
    if (!formData.correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    if (onSave) {
      onSave({
        ...initialData,
        ...formData,
        nombreCompleto: `${formData.nombres} ${formData.apellidos}`,
        tipoDocumento: formData.tipo_doc,
        documento: formData.num_doc,
      });
    }

    show(
      esEdicion
        ? `Usuario ${formData.nombres} ${formData.apellidos} actualizado exitosamente.`
        : `Usuario ${formData.nombres} ${formData.apellidos} registrado exitosamente.`,
      'success',
    );

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Fila 1: Tipo y Número de documento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field id="modal-tipo-doc" label="Tipo de Documento" required>
          <Select
            id="modal-tipo-doc"
            name="tipo_doc"
            value={formData.tipo_doc}
            onChange={handleChange}
            options={OPCIONES_TIPO_DOC}
          />
        </Field>

        <Field
          id="modal-num-doc"
          label="Número de Documento"
          required
          error={errores.num_doc}
        >
          <input
            id="modal-num-doc"
            name="num_doc"
            type="text"
            inputMode="numeric"
            placeholder="Ej. 1043921402"
            value={formData.num_doc}
            onChange={handleChange}
            className={`w-full h-10 px-3.5 text-sm bg-surface rounded-[10px] border ${
              errores.num_doc ? 'border-danger-line bg-danger-bg text-danger-fg' : 'border-line text-ink'
            } focus-visible:outline-2 focus-visible:outline-brand-600`}
          />
        </Field>
      </div>

      {/* Fila 2: Nombres y Apellidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field id="modal-nombres" label="Nombres" required error={errores.nombres}>
          <input
            id="modal-nombres"
            name="nombres"
            type="text"
            placeholder="Ej. Sofía Lucía"
            value={formData.nombres}
            onChange={handleChange}
            className={`w-full h-10 px-3.5 text-sm bg-surface rounded-[10px] border ${
              errores.nombres ? 'border-danger-line bg-danger-bg text-danger-fg' : 'border-line text-ink'
            } focus-visible:outline-2 focus-visible:outline-brand-600`}
          />
        </Field>

        <Field id="modal-apellidos" label="Apellidos" required error={errores.apellidos}>
          <input
            id="modal-apellidos"
            name="apellidos"
            type="text"
            placeholder="Ej. Mendoza Silva"
            value={formData.apellidos}
            onChange={handleChange}
            className={`w-full h-10 px-3.5 text-sm bg-surface rounded-[10px] border ${
              errores.apellidos ? 'border-danger-line bg-danger-bg text-danger-fg' : 'border-line text-ink'
            } focus-visible:outline-2 focus-visible:outline-brand-600`}
          />
        </Field>
      </div>

      {/* Fila 3: Rol y Curso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field id="modal-rol" label="Rol Institucional" required>
          <Select
            id="modal-rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            options={OPCIONES_ROL}
          />
        </Field>

        <Field id="modal-curso" label="Curso o Asignación">
          <Select
            id="modal-curso"
            name="curso_id"
            value={formData.curso_id}
            onChange={handleChange}
            options={OPCIONES_CURSO}
            disabled={formData.rol === 'Administrador'}
          />
        </Field>
      </div>

      {/* Fila 4: Correo Electrónico */}
      <Field id="modal-correo" label="Correo Electrónico" required error={errores.correo}>
        <input
          id="modal-correo"
          name="correo"
          type="email"
          placeholder="usuario@iedlavictoria.edu.co"
          value={formData.correo}
          onChange={handleChange}
          className={`w-full h-10 px-3.5 text-sm bg-surface rounded-[10px] border ${
            errores.correo ? 'border-danger-line bg-danger-bg text-danger-fg' : 'border-line text-ink'
          } focus-visible:outline-2 focus-visible:outline-brand-600`}
        />
      </Field>

      {/* Botones de acción */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" iconLeft="check">
          {esEdicion ? 'Actualizar Usuario' : 'Guardar Usuario'}
        </Button>
      </div>
    </form>
  );
}

/**
 * Modal para creación y edición de usuarios institucionales.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Visibilidad del modal
 * @param {Function} props.onClose - Manejador para cerrar el modal
 * @param {Object} [props.initialData] - Datos del usuario a editar (opcional)
 * @param {Function} [props.onSave] - Callback con los datos guardados
 */
export function UserFormModal({ isOpen, onClose, initialData = null, onSave }) {
  const esEdicion = Boolean(initialData);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={esEdicion ? 'Editar Usuario Institucional' : 'Crear Nuevo Usuario Institucional'}
      description={
        esEdicion
          ? 'Actualice los datos y asignaciones del usuario en el padrón 2025.'
          : 'Diligencie los datos oficiales para registrar un nuevo integrante en el padrón 2025.'
      }
    >
      {isOpen && (
        <UserFormContent
          key={initialData ? initialData.id : 'nuevo'}
          initialData={initialData}
          onClose={onClose}
          onSave={onSave}
        />
      )}
    </Modal>
  );
}
