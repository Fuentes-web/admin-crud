# IED La Victoria · Identidad Escolar (Proyecto C)

Sistema web institucional para la gestión y administración de identidad escolar, padrón de usuarios, cursos lectivos y admisión masiva de la **IED La Victoria (Distrito de Barranquilla)**.

Construido con **React + Vite + Tailwind CSS v4**, con interfaz en español (Colombia), arquitectura limpia, diseño institucional sobrio y estricto cumplimiento de accesibilidad web (WCAG AA).

---

## 1. Instalación y Ejecución

### Requisitos previos
- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior

### Comandos de inicio rápido
```bash
# 1. Instalar dependencias permitidas
npm install

# 2. Iniciar servidor de desarrollo local
npm run dev

# 3. Compilar para producción
npm run build

# 4. Previsualizar la compilación de producción
npm run preview

# 5. Ejecutar análisis estático (linter)
npm run lint
```

---

## 2. Estructura de Carpetas

```text
ied-la-victoria/
├── public/                 # Archivos estáticos públicos
├── src/
│   ├── components/         # Componentes modulares y reutilizables
│   │   ├── courses/        # Componentes del módulo de cursos (CourseRow, HistoryCard)
│   │   ├── csv/            # Componentes de carga CSV (Dropzone, ErrorReport)
│   │   ├── illustrations/  # Ilustraciones vectoriales inline (SchoolFacade)
│   │   ├── layout/         # Estructura visual (AppShell, Sidebar, Topbar, PageHeader)
│   │   └── ui/             # Componentes base accesibles (Button, Modal, StatCard, Badge, etc.)
│   ├── context/            # Proveedores de estado global (AuthContext, ToastContext)
│   ├── data/               # Modelos y datos mockeados (activity, courseIds, courses, history, users)
│   ├── hooks/              # Hooks personalizados (useHashRoute)
│   ├── pages/              # Vistas principales de la aplicación
│   │   ├── LoginPage.jsx       # Acceso institucional (#/login)
│   │   ├── DashboardPage.jsx   # Consola de identidad (#/panel)
│   │   ├── UsersPage.jsx       # Gestión de usuarios (#/usuarios)
│   │   ├── BulkUploadPage.jsx  # Carga masiva CSV (#/carga-masiva)
│   │   └── CoursesPage.jsx     # Cursos y control de vigencia (#/cursos)
│   ├── styles/
│   │   └── index.css       # Import de Tailwind v4, capa @theme y estilos base
│   ├── utils/              # Utilidades puras (cn, csv, download)
│   ├── App.jsx             # Enrutador por hash con guards de autenticación
│   └── main.jsx            # Punto de entrada de la aplicación React
├── index.html              # Plantilla HTML5 con metadatos y favicon institucional
├── package.json            # Configuración de dependencias y scripts
└── vite.config.js          # Configuración de Vite con plugins React y Tailwind v4
```

---

## 3. Personalización de la Paleta Institucional

El diseño utiliza la paleta oficial de azul cielo pastel institucional. Todos los tokens cromáticos residen en el bloque `@theme` de `src/styles/index.css`. No se requiere ni se debe crear `tailwind.config.js`.

Para modificar la paleta o ajustar la identidad visual, edite las variables en `src/styles/index.css`:

```css
@theme {
  /* Escala institucional Azul Cielo */
  --color-brand-50: #F0F9FF;   /* Fondos suaves y hovers de filas */
  --color-brand-100: #E0F2FE;  /* Pills informativas, fondos de icono */
  --color-brand-200: #BAE6FD;  /* Ítem activo de navegación, avatares */
  --color-brand-300: #7DD3FC;  /* Bordes activos y acentos secundarios */
  --color-brand-500: #0EA5E9;  /* Puntos de estado, barras de progreso */
  --color-brand-600: #0284C7;  /* Anillo de foco accesible (:focus-visible) */
  --color-brand-700: #0369A1;  /* Botones primarios, enlaces, tab activa */
  --color-brand-800: #075985;  /* Hover de botones primarios */
  --color-brand-900: #0C4A6E;  /* Textos oscuros de contraste, pill Administrador */

  /* Colores de superficie y tipografía */
  --color-surface: #EFF6FF;    /* Fondos de inputs, botones soft */
  --color-page: #F8FAFC;       /* Fondo general del body */
  --color-ink: #0F172A;        /* Texto principal de alto contraste */
  --color-ink-2: #475569;      /* Texto secundario */
  --color-ink-3: #64748B;      /* Eyebrows, metadatos y placeholders */
  --color-line: #E2E8F0;       /* Bordes y separadores */

  /* Estados de alerta y peligro (acciones destructivas) */
  --color-danger-fg: #B91C1C;
  --color-danger-bg: #FEF2F2;
  --color-danger-line: #FECACA;
}
```

Al cambiar un valor en `@theme`, Tailwind v4 regenera automáticamente las clases utilitarias (`bg-brand-700`, `text-brand-900`, `border-line`, etc.) en todo el proyecto.

---

## 4. Lista de Rutas del Sistema

La navegación se gestiona mediante hash routes (`window.location.hash`), garantizando compatibilidad sin dependencias externas:

| Ruta | Vista | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `#/login` | **Acceso Institucional** | Formulario de autenticación por documento y contraseña con validación y tipologías de documento colombianas. | Público |
| `#/panel` | **Consola de Identidad** | Panel principal con 4 StatCards, distribución proporcional de roles, fachada escolar de la sede y actividad reciente filtrable. | Protegido |
| `#/usuarios` | **Gestión de Usuarios** | Directorio activo de estudiantes, docentes y directivos, con filtros por rol, estado y jornada, alternancia de activación y exportación CSV. | Protegido |
| `#/carga-masiva` | **Carga Masiva CSV** | Módulo de importación estructurada de matrículas con drag-and-drop, validación sintáctica/negocio en cliente y política atómica RF11. | Protegido |
| `#/cursos` | **Cursos y Vigencia** | Supervisión de los 24 cursos del año lectivo 2025, asignación de docentes titulares, consulta de expedientes sellados (2022-2024) y cierre de período. | Protegido |
