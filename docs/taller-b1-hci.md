# Taller B1 · Prototipado con IA — Hoja de vida web

Tres versiones de la misma hoja de vida, cada una producida por un prompt de
distinta calidad. Muestran algo concreto: **la calidad del resultado sigue a la
calidad del prompt**. Un pedido vago da una página que apenas cumple; un prompt
con rol, datos, criterios verificables y contexto cultural da una página que
cumple las diez heurísticas de Nielsen.

| Versión | Enlace | Nivel |
|---|---|---|
| V1 | <https://squierdan.vercel.app/cv/v1> | Hecha «a la carrera» con IA: cumple cada heurística apenas lo mínimo |
| V2 | <https://squierdan.vercel.app/cv/v2> | Mejorada: le falta cerca de un 25 % |
| V3 | <https://squierdan.vercel.app/cv/v3> | Definitiva: cumple las 10 heurísticas, WCAG 2.2 AA y el contexto ecuatoriano |

Herramienta: Claude (Anthropic). Archivos: `public/cv/v1`, `public/cv/v2` y
`public/cv/v3` (HTML, CSS y JavaScript sin frameworks).

---

## 1. Rol (paso 2 del taller)

> Actúa como **mentor senior de UX/UI y experto en Interacción
> Humano-Computador (HCI)**. Evalúas toda interfaz con las 10 heurísticas de
> usabilidad de Jakob Nielsen y con las pautas WCAG 2.2 nivel AA, y conoces cómo
> se presenta una hoja de vida en el mercado laboral ecuatoriano. Justifica cada
> decisión de diseño con la heurística que atiende y no aceptes un «más o
> menos»: si una heurística no se puede señalar en un elemento concreto de la
> pantalla, no está cumplida.

## 2. Prompts (pasos 3 y 4)

### Prompt V1: pedido básico, sin rol ni criterios

> Hazme una página web de portafolio con mi CV. Te paso mis datos y mi foto.
> Que se vea moderna y profesional.

Sin rol, sin público ni criterios de calidad, la IA rellena los huecos con sus
valores por defecto: degradado morado, emojis, todo centrado y títulos en
inglés. El resultado «funciona», pero ninguna heurística se cumple por
intención.

### Prompt V2: con rol y heurísticas nombradas, sin detalle

> Actúa como diseñador UX/UI. Rediseña la página de mi CV para que sea limpia y
> profesional y cumpla las 10 heurísticas de Nielsen. Incluye menú fijo, modo
> oscuro, formulario de contacto con validación y una sección de preguntas
> frecuentes. Usa mis datos y mi foto.

Nombrar las heurísticas mejora mucho el resultado, pero sin decir **cómo** se
verifica cada una, la IA cumple la parte evidente de cada heurística y omite el
resto (ver la matriz).

### Prompt V3: el prompt maestro

> **[Rol de la sección 1]**
>
> **Contexto.** Soy Elian Caizapanta, estudiante de Ingeniería de Software en la
> Escuela Politécnica Nacional (Quito) con enfoque en Seguridad Informática.
> Necesito mi hoja de vida como página web de una sola página, publicada en
> `squierdan.vercel.app/cv/v3`. La leerán reclutadores y docentes en Ecuador,
> desde computador y celular.
>
> **Datos.** Usa solo los del CV y la foto adjuntos: datos personales, perfil,
> experiencia, publicación, formación, conocimientos técnicos, idiomas,
> certificaciones y referencias. No inventes cifras, niveles, proyectos ni
> logros. Muestra un nivel de dominio solo donde el CV lo declara. Mi aporte a la
> publicación fue la redacción y algunas ideas del algoritmo, dentro de un
> equipo de ocho autores: dilo así.
>
> **Las 10 heurísticas, cada una verificable en pantalla:**
> 1. *Visibilidad del estado:* sección activa en el menú, barra de progreso de
>    lectura y confirmación de cada acción (copiar, cambiar tema, filtrar,
>    preparar el correo).
> 2. *Relación con el mundo real:* español de Ecuador, el término «hoja de
>    vida», fechas como «may. 2024 – nov. 2024», celular en formato local
>    (098 447 1075) e internacional (+593), foto formal con bloque de datos
>    personales y WhatsApp como canal.
> 3. *Control y libertad:* cerrar con Esc o clic fuera, deshacer al borrar el
>    formulario, quitar filtros con un clic, volver arriba y tema reversible.
> 4. *Consistencia y estándares:* un solo sistema de botones, enlaces
>    subrayados, enlaces externos marcados y el mismo formato de fecha en toda
>    la página.
> 5. *Prevención de errores:* validación al salir de cada campo, contador de
>    caracteres, sugerencia ante dominios de correo mal escritos (gmial.com) y
>    descargas etiquetadas con formato y peso.
> 6. *Reconocer antes que recordar:* menú fijo con etiquetas de texto, datos de
>    contacto visibles e íconos siempre acompañados de texto.
> 7. *Flexibilidad y eficiencia:* atajos de teclado desactivables, búsqueda de
>    certificaciones sin importar tildes, copiar el correo y la cita APA,
>    impresión limpia y PDF en español e inglés.
> 8. *Diseño estético y minimalista:* jerarquía clara, sin emojis ni
>    decoración, y cada elemento con una función.
> 9. *Recuperación de errores:* mensajes en lenguaje claro que digan qué pasó y
>    cómo arreglarlo, un resumen de errores con enlaces a cada campo, estado
>    vacío con salida y una alternativa si el correo no se abre.
> 10. *Ayuda y documentación:* botón «Ayuda» (también con la tecla ?) con guía
>     de uso, atajos y preguntas frecuentes.
>
> **Accesibilidad WCAG 2.2 AA:** contraste ≥ 4.5:1 en texto y ≥ 3:1 en bordes de
> controles, foco visible, enlace «Saltar al contenido», un solo `h1` y
> encabezados sin saltos, texto alternativo descriptivo, respeto de
> «reducir movimiento», objetivos táctiles de 44 px y modos claro y oscuro.
>
> **Contexto cultural ecuatoriano:** foto tipo carné (fondo claro, hombros),
> edad y ciudad, y referencias laborales con su título profesional (Ing., MSc.),
> pero sin publicar el teléfono ni el correo de terceros: la LOPDP (2021) lo
> desaconseja, así que se ofrecen a solicitud. No me antepongas «Ing.» hasta que
> tenga el título registrado en la SENESCYT.
>
> **Restricciones técnicas:** HTML, CSS y JavaScript sin frameworks. El sitio
> tiene una CSP que solo permite recursos propios: fuentes autoalojadas, íconos
> SVG en línea, sin CDN ni Google Fonts. Responsive desde 360 px.
>
> **Entregable:** el código completo y una tabla que indique, para cada
> heurística, qué elemento concreto de la interfaz la cumple.

---

## 3. Matriz heurística

✅ cumple · ◐ cumple en parte · ✕ cumple solo de forma nominal

| # | Heurística | V1 | V2 | V3 |
|---|---|---|---|---|
| 1 | Visibilidad del estado | ✕ `alert()` al enviar es la única respuesta; el menú no indica dónde estás | ◐ Sección activa en el menú y aviso «Correo copiado» (sin `aria-live`) | ✅ Sección activa (`aria-current`), barra de progreso, contador «Mostrando 1 de 15», avisos con `aria-live`, estado de disponibilidad y fecha de actualización |
| 2 | Relación con el mundo real | ✕ Mezcla «Home», «About Me» y «Skills» con español; foto sin contexto | ◐ Español consistente, pero dice «CV»; sin WhatsApp, edad ni referencias | ✅ «Hoja de vida», foto tipo carné, bloque de datos personales, celular 098 / +593, WhatsApp, referencias con título profesional |
| 3 | Control y libertad | ✕ Solo un «Volver arriba» al final | ◐ Menú móvil cerrable y volver arriba; Esc no cierra nada y el tema no se recuerda | ✅ Esc y clic fuera cierran, «Deshacer» al borrar el formulario, limpiar búsqueda y filtros, editar antes de enviar, tema recordado |
| 4 | Consistencia y estándares | ✕ Botones de cuatro colores; fechas en tres formatos | ◐ Un sistema de botones y fechas uniformes; enlaces externos sin aviso | ✅ Tokens de diseño compartidos con el sitio principal, un formato de fecha, enlaces subrayados y externos con ↗ |
| 5 | Prevención de errores | ✕ Solo `required` | ◐ Validación HTML; la descarga no indica formato ni peso | ✅ Validación al salir del campo, contador 0/1000, sugerencia «¿Quisiste decir…@gmail.com?», «PDF · 35 KB» en cada descarga, el correo se prepara y no se envía solo |
| 6 | Reconocer antes que recordar | ✕ Menú no fijo: hay que volver arriba para navegar | ✅ Menú fijo con etiquetas de texto | ✅ Menú fijo, títulos de sección que se quedan visibles al desplazarse, íconos con texto y datos de contacto en la portada |
| 7 | Flexibilidad y eficiencia | ✕ Solo «Descargar CV» | ◐ Copiar correo y modo oscuro | ✅ Atajos 1–7, /, T y ? (desactivables, WCAG 2.1.4), búsqueda sin tildes, copiar cita APA, imprimir, PDF ES/EN |
| 8 | Estético y minimalista | ✕ Degradado genérico, emojis y todo centrado | ✅ Limpio y con jerarquía | ✅ Jerarquía tipográfica de dos voces, sin decoración y cada elemento con una función |
| 9 | Recuperarse de errores | ✕ Mensajes nativos del navegador | ◐ Un genérico «Revisa los campos marcados» | ✅ Mensajes que dicen qué pasó y cómo arreglarlo, resumen con enlaces a cada campo que se actualiza al corregir, estado vacío con salida, alternativas si no hay correo configurado |
| 10 | Ayuda y documentación | ✕ «¿Necesitas ayuda? Escríbeme» en el pie | ◐ Tres preguntas frecuentes al final de la página | ✅ Diálogo «Ayuda» (botón o tecla ?) con guía de uso, atajos y preguntas frecuentes |

### Lo que le falta a V2 (≈ 25 %)

- Las fechas en gris `#8b929c` miden **3.14:1** sobre blanco: incumple WCAG AA (4.5:1).
- No tiene enlace «Saltar al contenido» ni respeta «reducir movimiento».
- El aviso emergente no usa `aria-live`, así que los lectores de pantalla no lo anuncian.
- Sin ayuda contextual, atajos, impresión ni búsqueda.
- Sin adaptación cultural: falta WhatsApp, el bloque de datos personales y las referencias.

### Lo que le sobra a V1

- Contraste de fechas `#aaa` sobre `#fafafa` de **2.2:1**.
- `alt="foto"`, que no describe nada.
- Párrafos largos centrados, difíciles de leer.
- Enlaces externos sin `rel="noopener"`.

## 4. Decisiones del contexto ecuatoriano (V3)

| Decisión | Motivo |
|---|---|
| Foto tipo carné, 3:4, fondo claro | En Ecuador la hoja de vida lleva foto; el formato carné es el esperado |
| Se eliminaron los metadatos EXIF de la foto | El original guardaba el modelo del teléfono, la fecha y hora de la toma y un bloque GPS; una hoja de vida pública no debe filtrarlos |
| Bloque «Datos personales» con edad, ciudad, correo, celular e idiomas | Orden habitual de una hoja de vida ecuatoriana. Sin cédula ni estado civil: no aportan y exponen datos sensibles |
| WhatsApp en la portada, en Contacto y como acceso flotante | Es el canal de contacto profesional dominante en el país |
| Referencias con nombre, título y empresa, sin teléfonos | La LOPDP (2021) protege los datos de terceros; se entregan a solicitud con un botón |
| «Estudiante de Ingeniería de Software» y no «Ing.» | En Ecuador el título se usa una vez registrado en la SENESCYT |
| Fechas «may. 2024 – nov. 2024» y `lang="es-EC"` | Convención local y pronunciación correcta en lectores de pantalla |

## 5. Cómo verificar

- **Teclado:** pulsa Tab desde la carga. Aparece «Saltar al contenido»; luego `?` abre la ayuda, `/` busca y del `1` al `7` saltas de sección.
- **Errores:** envía el formulario vacío y escribe `ana@gmial.com` en el correo.
- **Búsqueda:** escribe `criptografia` (sin tilde) y luego `kubernetes`.
- **Impresión:** usa Ctrl + P o el botón «Imprimir» del pie.
- **Movimiento:** activa «reducir movimiento» en el sistema; la página sigue respondiendo con color, sin desplazamientos.
