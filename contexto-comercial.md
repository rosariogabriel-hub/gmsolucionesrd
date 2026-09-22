# Contexto comercial — GM Soluciones Digitales

Fuente de contexto para esta sesión (página de impacto). No releer los archivos originales del repo de operación; actualizar aquí si algo cambia.

## Qué vende

Automatización con IA para negocios pequeños y medianos en RD. Gabriel Mateo Rosario, 100% dedicado, sin empleo, pista hasta dic 2026/ene 2027.

## El diferenciador (no es el código)

El método: mapear cómo trabaja el negocio *antes* de automatizar. El código es la parte barata y reemplazable; lo que vende es el diagnóstico del proceso real del negocio. La página debe transmitir esto, no una vitrina de features técnicas.

## Estado legal (relevante para la página — no construir nada sobre esto, solo tenerlo presente)

- Nombre comercial "GM Soluciones Digitales" **objetado por ONAPI** (orden 2265728), en proceso de apelación (sep 2026). **No condiciona nada de la página**: el registro de dominio y la publicación del sitio son independientes de ONAPI (verificado el 21 sep). El nombre se muestra en la página con normalidad.
- Marca "GM Conecta" sí está registrada (clase 42) — ese nombre de producto es seguro para usar sin reservas.
- Persona física: Gabriel Mateo Rosario, RNC 002-0138471-6. SRL aún no constituida.

## Las 3 líneas de producto y su etapa

1. **GM Conecta** (línea principal) — asistentes de WhatsApp para negocios pequeños sobre WhatsApp Cloud API de Meta, agnóstico de rubro. Etapa: **producto real en marcha**. Número real activo (+1 809 359 9391), app publicada, App Review de Tech Provider en curso (hasta 20 días desde 18 sep). Funcionalidades ya construidas: modo pedido con notas de voz, cotizaciones con PDF, seguimiento automático, reporte semanal, bandeja humana. Precio borrador: implementación RD$28,000 + RD$10,000/mes (piloto RD$5,000). Prospectos activos: Concepto Mobiliario (contactado, video enviado) y una surtidora (piloto interno, aún no mostrado al cliente real). Es la línea con más kilometraje real, pero **no lleva más protagonismo en la página**: corregido por Gabriel el 22 sep 2026 — las tres líneas pesan igual. GM Data y GM Automatizaciones son tan importantes comercialmente como Conecta.

2. **Baxter / a medida** (dashboards y automatización de datos, no WhatsApp) — línea de servicio corporativo. Etapa: **oportunidad identificada, sin contacto comercial formal** (etapa "frío" en el pipeline). Ya existe un dashboard v0.7 aprobado (head count, 3 escenarios) hecho en otra sesión, pero es prueba de capacidad, no un cliente cerrado — la esposa de Gabriel trabaja en Baxter, así que hay que cuidar cómo se presenta (evitar cualquier apariencia de conflicto de interés). Tratar como caso de referencia de capacidad técnica, no como cliente nombrado hasta que haya relación comercial formal.

3. **Bots de finanzas del hogar** — Etapa: **prototipo/experimento, NO es un producto todavía**. Construido con otras herramientas (Telegram + Gemini), en fase de validación con 10 usuarios externos cobrando simbólico. No debe presentarse en la página como línea de negocio consolidada; si se menciona, debe quedar claro que es exploratorio.

## Tono y posicionamiento sugerido para la página

- **Aterrizado, no hype**: Gabriel es primerizo en negocios y quiere evitar prometer sin datos que lo respalden. La página debe sonar creíble y concreta, no una promesa vacía de "IA que lo resuelve todo".
- **El método por delante del código**: liderar con "entendemos tu negocio antes de automatizarlo", no con lista de tecnologías.
- **GM Conecta como prueba, no como concepto**: hay número real, cliente en pipeline, funcionalidades reales — se puede hablar en presente, no en condicional.
- **Baxter/a medida**: posicionar como capacidad ("dashboards y automatización de datos a medida"), sin nombrar al cliente como cliente cerrado.
- **Bots de finanzas del hogar**: omitir de la página por ahora, o mencionar solo como línea exploratoria si el usuario lo pide explícitamente — no es una línea de negocio vendible todavía.
- **Sin promesas legales/regulatorias**: no mencionar el estado de ONAPI ni detalles fiscales en la página pública; eso es contexto interno, no contenido de marketing.

## Decisiones aprobadas para la landing — Fase 1 (21 sep 2026)

Todo lo de esta sección fue aprobado por Gabriel en conversación. Cambiarlo requiere su OK.

### Alcance y objetivo
- **Fase 1**: landing de una sola página con anclas, para enviársela a contactos y captar leads por WhatsApp. El bot del 809 responde. Sin backend, sin precios, sin casos de éxito (todavía).
- **Fase 2 (futuro, no ahora)**: logos de clientes "flotando" y estadísticas de la empresa (referencia: Yalo), cuando haya clientes reales con contrato que permita mostrarlos.
- La página es un proyecto vivo: crece a medida que llegan clientes.

### Infraestructura
- Dominio **gmsolucionesrd.com** comprado en Namecheap (21 sep 2026, ~US$11.48/año, privacidad WHOIS gratis, auto-renew). Sin hosting ni correo contratados con Namecheap.
- Hosting propuesto: Cloudflare Pages (gratis). Analítica sin cookies midiendo clics en el botón de WhatsApp.
- Este dominio **no tiene relación** con la verificación de Meta de GM Conecta (que se queda en gmateorosario.com) ni con Meta Ads.

### Marca
- Verde de marca: **#1F8A5B** (extraído del ícono oficial `gm-conecta-icon-1024.png`). El degradado de la página se construye a partir de ese verde.
- Logo: el lettermark **"GM"** (las letras que están dentro de la burbuja del ícono), sin la burbuja, como marca de todo: GM Soluciones Digitales, GM Conecta, GM Data, GM Automatizaciones.
- Sin fotos de personas (ni clientes ni stock). El peso visual: mockup animado, tipografía, degradado verde.
- Registro: **tuteo** (tú), nunca voseo. Público dominicano.

### Estilo
- Sutil y premium: animaciones con propósito, cortas, que demuestren el producto o guíen la atención. Nada maximalista.
- Cada sección lleva su animación corta o visual en movimiento; nada se siente plano.
- Referencias aprobadas: **Attio** (estructura, hero con producto en vivo, grilla de logos) y **Yalo** (fondo oscuro con grid de puntos, gradiente en la frase clave, botón flotante de WhatsApp). Linear gustó menos.
- Tipografía con carácter, no fuente de sistema.

### Estructura (single page, anclas)
Inicio (hero) → Soluciones (3 líneas) → Método → Diferenciador → Nosotros → Prueba social (placeholder vacío) → CTA final → Pie. Botón de WhatsApp flotante siempre visible.

### Las 3 líneas y su copy aprobado
Separadas por **función**, no por canal (Comunicar / Entender / Ejecutar). No se agrega una 4ª línea sin un caso real que no encaje.

**GM Conecta** — *WhatsApp oficial, con CRM incluido.*
Asistentes sobre la API verificada de Meta que atienden, cotizan y dan seguimiento a cada cliente, sin que nadie tenga que vivir pendiente del teléfono.
(Decir "API oficial / negocio y número verificados" es cierto. NO decir "aprobado por Meta como Tech Provider": sigue en revisión.)

**GM Data** — *Del dato a la decisión.*
Soluciones a la medida para todo lo que empiece con un dato: dashboards, reportes automáticos, integración de sistemas, análisis y bases de datos hechas para cómo trabaja tu negocio.
(El dashboard es UN producto de GM Data, no la línea entera.)

**GM Automatizaciones** — *Primero el proceso. Después la automatización.*
Mapeamos cómo trabaja tu equipo y automatizamos lo repetitivo (conciliaciones, registros, avisos, aprobaciones) para que el tiempo se vaya en decidir, no en copiar y pegar.
(Ejemplo real de prospecto, no publicable aún: administrador de residencial con 80 personas enviando capturas de pago por WhatsApp; conciliación manual.)

**Frase de cierre** — *El problema lo traes tú. La solución la construimos nosotros.*

### Copy rechazado (no volver a proponer)
- Sección de credenciales personales ("detrás de cada solución hay [nombre] con formación en…"). Gabriel: "se oye horrible".
- Cierres tipo proverbio: "No existe problema sin solución", "Todo problema tiene solución". Impersonales.
- Descripciones largas con listas tipo "lo que sea", "sin importar si…", "ahí arriba".
- Gestión financiera como línea/capacidad: fuera de la página (prototipo sin validar).

### WhatsApp
- Número del botón: **+1 809 359 9391** (preset `gm`).
- Mensaje prellenado general (hero y flotante): **"Hola, traigo un problema. Vengo por la solución."**
- Mensaje por tarjeta: Conecta → "Quiero que mi WhatsApp atienda solo." / Data → "Tengo los datos regados y quiero verlos claros." / Automatizaciones → "Tengo un proceso manual que quiero automatizar."
- Pendiente para la sesión de GM Conecta (no esta): que el preset `gm` reconozca estas frases y pase a persona con aviso.
- Precios: nunca en la página. Quien pregunte va al bot; el bot lleva a una reunión.

### Nosotros
Hablar del equipo, no de Gabriel. Dos personas, formación en transformación digital y dirección de proyectos, experiencia en industrias exigentes. Sin títulos, sin nombres, sin foto. Nada inventado.

### Pie
GM Soluciones Digitales · Santo Domingo · RNC 002-0138471-6. Sin dirección.

### Hero
Demo animada de WhatsApp (mockup de teléfono) reutilizando el guion de `~/Desarrollo Solucion WhatsApp Clientes/video/timeline.json` y `scene.html` (demo de Mobiliario). Titular y subtítulo: pendientes de aprobación.

### v0.3 (21 sep 2026, noche) — en revisión
- Una sola tesela GM (`.mark`) en navegación, líneas y pie; nombre de línea centrado a la altura de la tesela; tesela más grande que el nombre y con más aire interior.
- Hero: contenido en el tercio superior, globo más grande, señal "Desliza" abajo. Soluciones: texto alineado arriba junto al teléfono, menos aire. Pie compacto en 3 columnas con © y CTA. `--section` reducido.
- Separación de secciones: Gabriel eligió **B "Bordes con luz"** (filo menta + resplandor arriba de cada sección) sobre A "Hojas apiladas". El interruptor A/B se eliminó; B es el único modo. Boceto de referencia: `boceto-secciones.html`.
- Pendiente siguiente: pasada de optimización móvil (tamaños, densidad de partículas, backdrop-filter, prueba en teléfono real).
- La capa de luz del cursor pasó a `z-index: 40` con `mix-blend-mode: screen` para verse por encima de las hojas.

### Implementación v0.2 (21 sep 2026) — base de la v0.3
- Fondos elegidos por Gabriel y su esposa del muestrario (`muestrario.html`, 11 opciones, se conserva como referencia): **Aurora** (1), **Luz que sigue al cursor** (3), **Constelación** (6), **Globo** (7), **Paneles** (8). Rechazadas/no elegidas: malla, película, líneas, partículas, marca monumental, titular líquido.
- Ajustes del 21 sep (tarde): el hero **ya no lleva aurora** (Gabriel: "muy cargado"); solo globo sobre verde profundo. Titular del hero en **Bricolage Grotesque 800** (Gabriel pidió "más moderno, más juvenil"; Newsreader se mantiene en el resto de títulos). La tesela GM de cada línea es **más grande que el nombre** (nombre al 78 %).
- Orden acordado: Hero = globo (sin aurora) · Soluciones = iPhone con la demo de Mobiliario junto a GM Conecta, paneles de vidrio para Data y Automatizaciones · Método = constelación · Pilares y Quiénes somos = calma · Cierre = aurora suave · **Luz que sigue al cursor en toda la página** (capa fija global). Todo pausa fuera de pantalla.
- Copy vigente: hero "GM Soluciones Digitales" + línea rotativa (4 frases) + subtítulo aprobado; "Nuestras soluciones"; método "Entendemos tu operación antes de transformarla." con la frase de Gabriel; pilares "Lo que respalda cada solución" (Método, Seguridad, Infraestructura, Acompañamiento, sin texto introductorio, sin mencionar IA); "Quiénes somos" hablando de la empresa; cierre aprobado.
- Lettermark GM en cada línea como tesela verde con "GM" blanco (`.mark--line`), sin burbuja.
- Regla de combinación de fondos: un ambiente + un objeto por sección, nunca dos de lo mismo.

### Implementación v0.1 (21 sep 2026) — sustituida por v0.2
- Sitio estático sin dependencias: `index.html`, `css/styles.css`, `js/main.js`, `assets/favicon.svg`. Fuentes por Google Fonts: **Newsreader** (titulares; se descartó Fraunces porque el detector de Impeccable la marca como sobreusada en sitios generados por IA) y **Manrope** (texto y chat).
- Vista previa local: `python3 -m http.server 4321` (configurado en `.claude/launch.json`, nombre `landing`).
- Titular elegido: A ("Lo que hoy haces a mano, mañana se hace solo."), con degradado sobre todo el titular. Excepciones del detector de Impeccable registradas en `.impeccable/config.json` (degradado del titular, resplandor detrás del teléfono, puntos de "escribiendo…" del chat, dos falsos positivos estructurales). Contraste de botones corregido a AA (verde de botón `#1B7D52`, distinto del verde de marca `#1F8A5B` que sigue en marca y acentos). Diferenciador: título A. Sección Clientes: oculta (`hidden`).
- La demo del teléfono vive en `js/main.js` como una línea de tiempo (`timeline`), loop de ~31 s; solo corre cuando el teléfono está en pantalla y se congela en una captura estática con `prefers-reduced-motion`.
- Analítica: pendiente. Los botones llevan `data-track`; `window.gmTrack(id)` se conecta cuando haya Cloudflare Web Analytics.

### Skills instalados en este repo (`.claude/skills/`)
emilkowalski/skills (animate, review-animations, emil-design-eng…), pbakaus/impeccable (falta correr `/impeccable init` en el chat), Leonxlnx/taste-skill (high-end-visual-design, design-taste-frontend…). Se solapan; usar impeccable o high-end-visual-design como guía principal y animate/review-animations para movimiento.

## Verificación comercial — 22 sep 2026

Primera auditoría con el subagente `verificador-comercial` (`.claude/agents/`). Respuestas de Gabriel a los puntos que este archivo no cubría:

### Infraestructura (resuelto — la página puede decirlo)
Monitoreo, respaldo y alertas **sí existen**. La línea "Monitoreo, respaldo y alertas desde el primer día" de la sección Pilares queda avalada.

### Modelo operativo con Meta y el check verde (resuelto)
- **Hoy**: Gabriel ya está verificado. Opera agregando el número del cliente **dentro de su propia WABA**. El cliente conserva su número; la administración frente a Meta y la responsabilidad por el uso son de Gabriel.
- **Cuando Meta apruebe el Tech Provider** (en espera desde el 18 sep): el cliente se queda con **su propia WABA y su número verificado**, y Gabriel entra como proveedor de tecnología que construye los bots.
- Las políticas de Meta mantienen responsabilidad compartida en varios puntos; eso se resuelve **por contrato**, no en la página.
- Consecuencia para la página: el check de verificado sobre "Tu negocio" en la demo **se queda**. En ambos modelos el cliente termina con su número verificado, que es lo único que la demo promete.

### Tiempos de implementación (decisión: NO publicar como plazo)
El alta del número propio de Gabriel con Meta tomó **4–5 horas** (una tarde), porque tenía toda la documentación lista. **No convertir esto en promesa de plazo**: fue su propio número, fue el trámite y no el proyecto, la aprobación no está bajo su control, y prometer entrega en una tarde contradice el posicionamiento ("entendemos tu negocio antes de automatizarlo").
Uso permitido, solo en el paso técnico del Método y sujeto al OK de Gabriel: *"El alta con Meta se resuelve rápido cuando la documentación está completa; lo que toma tiempo es entender tu operación."*

### Correcciones ya aplicadas a `index.html`
- Restaurado el copy aprobado de GM Conecta ("sin que nadie tenga que vivir pendiente del teléfono") y de GM Automatizaciones ("que el tiempo se vaya en decidir, no en copiar y pegar"). Se habían cambiado sin OK.
- "Quiénes somos": "Combinamos experiencia en…" → **"Combinamos formación en transformación digital y dirección de proyectos con experiencia en industrias donde la precisión no es negociable."** (el original inflaba formación a experiencia; este archivo dice "Nada inventado").

### Pendiente antes de publicar
1. **Hero** (bloqueante, requiere OK): el H1 es el nombre de la empresa y la primera frase rotativa es su eco; en 5 segundos no se sabe qué se vende. Además, con `prefers-reduced-motion` la rotación se congela en la primera frase y "Atención y ventas automatizadas por WhatsApp" no se ve nunca. El método —el diferenciador— está en la tercera sección.
2. **`og:image` ausente**: el enlace que se manda por WhatsApp se ve como texto pelado. Falta generar `assets/og.png` (1200×630).
3. **El 809 contesta y la página no lo dice**: la prueba más barata de que el producto existe está sin usar.

### Corrección de estrategia — 22 sep 2026 (anula lo anterior)

**Las tres líneas tienen el mismo peso comercial.** La nota que decía que GM Conecta "debe tener más protagonismo en la página" quedó mal redactada y no refleja la intención de Gabriel. Conecta es la única con producto en marcha, y eso sigue siendo cierto para hablar de ella en presente y con prueba — pero no le da prioridad en la jerarquía del sitio. GM Data y GM Automatizaciones se presentan al mismo nivel.

Consecuencia para el hero (aprobado por Gabriel el 22 sep):
- Antetítulo: `GM Soluciones Digitales`
- H1: `Entendemos tu negocio antes de automatizarlo.`
- Subtítulo: `Atención por WhatsApp, inteligencia de datos y automatización de procesos. Antes de tocar nada, mapeamos cómo trabaja tu empresa. Después la optimizamos.`
- La línea rotativa de 4 frases: pendiente de decisión. Mientras exista, la primera frase manda (es la única que se ve con `prefers-reduced-motion`, `js/main.js:47`), así que es incompatible con repartir peso parejo.
