/**
 * Ilustración SVG inline de la fachada del colegio IED La Victoria.
 * Arquitectura escolar de 3 niveles con cielo, montañas de fondo y vegetación estilizada
 * en la paleta institucional azul grisácea (sin verdes saturados).
 *
 * @param {Object} props
 * @param {string} [props.className] - Clases de tamaño o posicionamiento
 */
export function SchoolFacade({ className = 'w-full h-full' }) {
  return (
    <svg
      viewBox="0 0 600 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Degradado para el cielo */}
        <linearGradient id="skyGrad" x1="300" y1="0" x2="300" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="60%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        {/* Degradado para las montañas de fondo */}
        <linearGradient id="mountainsGrad" x1="0" y1="120" x2="600" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Reflejos de las ventanas */}
        <linearGradient id="windowGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* 1. Cielo */}
      <rect width="600" height="420" fill="url(#skyGrad)" />

      {/* Nubes sutiles */}
      <path
        d="M80 70c10-15 35-15 45 0 12-5 28 2 28 15 0 8-5 15-15 15H70c-10 0-18-8-18-18 0-12 15-17 28-12z"
        fill="#FFFFFF"
        opacity="0.7"
      />
      <path
        d="M420 50c12-18 40-18 52 0 15-6 32 3 32 18 0 10-6 18-18 18H408c-12 0-20-10-20-20 0-14 18-20 32-16z"
        fill="#FFFFFF"
        opacity="0.6"
      />

      {/* 2. Montañas suaves al horizonte */}
      <path
        d="M0 240 L110 170 L230 235 L380 160 L520 230 L600 185 L600 300 L0 300 Z"
        fill="url(#mountainsGrad)"
        opacity="0.45"
      />
      <path
        d="M0 260 L160 210 L310 255 L450 195 L600 245 L600 320 L0 320 Z"
        fill="#94A3B8"
        opacity="0.3"
      />

      {/* 3. Base del terreno / explanada escolar */}
      <rect x="0" y="295" width="600" height="125" fill="#F8FAFC" />
      <path d="M0 340 L600 330 L600 420 L0 420 Z" fill="#EFF6FF" />

      {/* Explanada y acera frontal */}
      <path d="M140 420 L230 330 L370 330 L460 420 Z" fill="#E2E8F0" />
      <path d="M190 420 L255 330 L345 330 L410 420 Z" fill="#CBD5E1" opacity="0.6" />

      {/* 4. EDIFICIO INSTITUCIONAL (3 NIVELES) */}
      {/* Cuerpo principal del edificio */}
      <rect x="130" y="140" width="340" height="190" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
      
      {/* Muro base / zócalo */}
      <rect x="125" y="322" width="350" height="8" fill="#94A3B8" />

      {/* Cornisa superior */}
      <rect x="120" y="134" width="360" height="9" rx="2" fill="#0C4A6E" />
      <rect x="126" y="130" width="348" height="4" fill="#0284C7" />

      {/* Frontispicio triangular central con reloj institucional */}
      <path d="M245 130 L300 85 L355 130 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M250 130 L300 90 L350 130 Z" fill="#0C4A6E" />
      
      {/* Reloj central */}
      <circle cx="300" cy="115" r="13" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
      <line x1="300" y1="115" x2="300" y2="107" stroke="#0C4A6E" strokeWidth="2" strokeLinecap="round" />
      <line x1="300" y1="115" x2="306" y2="115" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="300" cy="115" r="2" fill="#0EA5E9" />

      {/* Asta y bandera institucional */}
      <line x1="300" y1="85" x2="300" y2="45" stroke="#64748B" strokeWidth="2" />
      <path d="M300 48 L330 57 L300 66 Z" fill="#0284C7" />

      {/* División de niveles con molduras */}
      {/* Moldura Nivel 3 - Nivel 2 */}
      <rect x="130" y="200" width="340" height="5" fill="#E2E8F0" />
      <line x1="130" y1="202" x2="470" y2="202" stroke="#CBD5E1" strokeWidth="1" />

      {/* Moldura Nivel 2 - Nivel 1 */}
      <rect x="130" y="262" width="340" height="5" fill="#E2E8F0" />
      <line x1="130" y1="264" x2="470" y2="264" stroke="#CBD5E1" strokeWidth="1" />

      {/* Columnas decorativas institucionales en el frontis central */}
      <rect x="252" y="140" width="10" height="182" fill="#F1F5F9" />
      <rect x="338" y="140" width="10" height="182" fill="#F1F5F9" />

      {/* VENTANAS NIVEL 3 */}
      {/* Ala izquierda */}
      <g fill="url(#windowGlass)" stroke="#94A3B8" strokeWidth="1.5">
        <rect x="150" y="152" width="22" height="34" rx="2" />
        <rect x="182" y="152" width="22" height="34" rx="2" />
        <rect x="214" y="152" width="22" height="34" rx="2" />

        {/* Ala derecha */}
        <rect x="364" y="152" width="22" height="34" rx="2" />
        <rect x="396" y="152" width="22" height="34" rx="2" />
        <rect x="428" y="152" width="22" height="34" rx="2" />

        {/* Ventanas centro nivel 3 */}
        <rect x="272" y="152" width="24" height="34" rx="2" />
        <rect x="304" y="152" width="24" height="34" rx="2" />
      </g>

      {/* VENTANAS NIVEL 2 */}
      <g fill="url(#windowGlass)" stroke="#94A3B8" strokeWidth="1.5">
        {/* Ala izquierda */}
        <rect x="150" y="214" width="22" height="34" rx="2" />
        <rect x="182" y="214" width="22" height="34" rx="2" />
        <rect x="214" y="214" width="22" height="34" rx="2" />

        {/* Ala derecha */}
        <rect x="364" y="214" width="22" height="34" rx="2" />
        <rect x="396" y="214" width="22" height="34" rx="2" />
        <rect x="428" y="214" width="22" height="34" rx="2" />

        {/* Ventanas centro nivel 2 */}
        <rect x="272" y="214" width="24" height="34" rx="2" />
        <rect x="304" y="214" width="24" height="34" rx="2" />
      </g>

      {/* VENTANAS NIVEL 1 (Planta Baja) */}
      <g fill="url(#windowGlass)" stroke="#94A3B8" strokeWidth="1.5">
        {/* Ala izquierda */}
        <rect x="150" y="276" width="22" height="34" rx="2" />
        <rect x="182" y="276" width="22" height="34" rx="2" />
        <rect x="214" y="276" width="22" height="34" rx="2" />

        {/* Ala derecha */}
        <rect x="364" y="276" width="22" height="34" rx="2" />
        <rect x="396" y="276" width="22" height="34" rx="2" />
        <rect x="428" y="276" width="22" height="34" rx="2" />
      </g>

      {/* PORTAL Y PUERTA PRINCIPAL EN PLANTA BAJA */}
      {/* Pórtico con arco institucional */}
      <path d="M268 330 L268 285 Q300 268 332 285 L332 330 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M276 330 L276 290 Q300 276 324 290 L324 330 Z" fill="#0C4A6E" />
      
      {/* Puertas dobles de madera / tono sobrio */}
      <line x1="300" y1="282" x2="300" y2="330" stroke="#0284C7" strokeWidth="1.5" />
      <circle cx="295" cy="308" r="1.5" fill="#BAE6FD" />
      <circle cx="305" cy="308" r="1.5" fill="#BAE6FD" />

      {/* Escalinata de entrada */}
      <rect x="258" y="324" width="84" height="3" fill="#94A3B8" />
      <rect x="254" y="327" width="92" height="3" fill="#CBD5E1" />
      <rect x="250" y="330" width="100" height="3" fill="#E2E8F0" />

      {/* 5. VEGETACIÓN INSTITUCIONAL EN AZUL GRISÁCEO (Sin verdes saturados) */}
      {/* Árbol izquierdo grande */}
      <path d="M80 340 L88 340 L88 280 L80 280 Z" fill="#64748B" />
      <ellipse cx="84" cy="260" rx="36" ry="42" fill="#94A3B8" opacity="0.9" />
      <ellipse cx="76" cy="250" rx="26" ry="32" fill="#BAE6FD" opacity="0.75" />
      <ellipse cx="94" cy="254" rx="22" ry="28" fill="#7DD3FC" opacity="0.6" />

      {/* Arbustos laterales izquierdos */}
      <ellipse cx="120" cy="330" rx="18" ry="12" fill="#64748B" opacity="0.8" />
      <ellipse cx="132" cy="332" rx="14" ry="10" fill="#94A3B8" opacity="0.9" />

      {/* Árbol derecho grande */}
      <path d="M515 340 L523 340 L523 275 L515 275 Z" fill="#64748B" />
      <ellipse cx="519" cy="255" rx="38" ry="44" fill="#94A3B8" opacity="0.9" />
      <ellipse cx="512" cy="245" rx="28" ry="34" fill="#BAE6FD" opacity="0.75" />
      <ellipse cx="528" cy="248" rx="24" ry="30" fill="#7DD3FC" opacity="0.6" />

      {/* Arbustos laterales derechos */}
      <ellipse cx="480" cy="330" rx="18" ry="12" fill="#64748B" opacity="0.8" />
      <ellipse cx="468" cy="332" rx="14" ry="10" fill="#94A3B8" opacity="0.9" />

      {/* Farolas institucionales simétricas */}
      <line x1="220" y1="330" x2="220" y2="305" stroke="#475569" strokeWidth="1.5" />
      <circle cx="220" cy="303" r="3.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
      
      <line x1="380" y1="330" x2="380" y2="305" stroke="#475569" strokeWidth="1.5" />
      <circle cx="380" cy="303" r="3.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
    </svg>
  );
}
