# Guía completa: de tu computadora a internet

Tres partes. Sigue las secciones en orden.

- **Parte 1** — Ejecutar el sitio en tu computadora
- **Parte 2** — Subir los cambios a GitHub
- **Parte 3** — Publicarlo gratis en internet (Vercel)

---

## Parte 1 · Ejecutar el sitio en tu computadora

### 1.1 Instalar Node.js

El proyecto necesita **Node.js 20 o superior**.

1. Ve a <https://nodejs.org> y descarga la versión **LTS**.
2. Instálala aceptando las opciones por defecto.
3. Abre una terminal nueva y verifica:

```bash
node --version    # debe mostrar v20.x.x o superior
npm --version     # debe mostrar 10.x.x o superior
```

> **Terminal en Windows:** botón Inicio → escribe `powershell` → Enter.
> **macOS:** Cmd + Espacio → escribe `terminal` → Enter.

### 1.2 Instalar Git

1. Descárgalo de <https://git-scm.com/downloads> e instálalo.
2. Verifica y configura tu identidad (una sola vez en la vida):

```bash
git --version
git config --global user.name "Tu Nombre"
git config --global user.email "tu@correo.com"
```

### 1.3 Descargar el proyecto

Elige **una** de las dos opciones.

**Opción A — Ya tienes el repositorio en GitHub (recomendado):**

```bash
cd Documents
git clone https://github.com/Squierdan/personal-website.git
cd personal-website
```

**Opción B — Tienes el .zip que te entregué:**

Descomprímelo, y en la terminal entra a la carpeta descomprimida:

```bash
cd ruta/a/personal-website
```

### 1.4 Instalar dependencias y arrancar

```bash
npm install      # tarda 1–2 minutos la primera vez
npm run dev
```

Verás algo así:

```
▲ Next.js 16.2.9
- Local:  http://localhost:3000
✓ Ready
```

Abre <http://localhost:3000> en tu navegador. **Listo.**
Cada vez que guardes un archivo, la página se recarga sola.

Para detener el servidor: `Ctrl + C` en la terminal.

### 1.5 Comandos útiles

| Comando | Para qué sirve |
|---|---|
| `npm run dev` | Desarrollo, con recarga automática |
| `npm run build` | Compila el sitio para producción (verifica que no haya errores) |
| `npm run start` | Sirve el sitio ya compilado |
| `npm run lint` | Revisa la calidad del código |
| `npx tsc --noEmit` | Comprueba los tipos de TypeScript |

> **Antes de subir cambios, ejecuta siempre `npm run build`.**
> Si el build falla, Vercel también fallará.

### 1.6 Personalizar tu información

| Qué quieres cambiar | Archivo |
|---|---|
| Nombre, correo, redes, ubicación, URL | `src/lib/site.ts` |
| Cualquier texto visible (ES y EN) | `src/i18n/dictionary.ts` |
| Servicios, experiencia, stack, certificaciones | `src/lib/content.ts` |
| Colores del tema | `src/app/globals.css` (bloques `:root` y `.dark`) |

Todo lo demás es estructura; no necesitas tocarlo.

---

## Parte 2 · Subir los cambios a GitHub

### 2.1 Si clonaste el repositorio (Opción A)

```bash
git status                    # ver qué cambió
git add .
git commit -m "feat: rediseño de la interfaz"
git push origin main
```

Git te pedirá autenticarte. En Windows y macOS se abre una ventana del
navegador para iniciar sesión en GitHub — acepta y listo.

### 2.2 Si partiste del .zip (Opción B)

```bash
git init
git branch -M main
git add .
git commit -m "feat: sitio personal y portafolio"
git remote add origin https://github.com/Squierdan/personal-website.git
git push -u origin main
```

Si el repositorio ya tenía contenido y Git se queja, sobrescribe con:

```bash
git push -u origin main --force
```

> `--force` reemplaza lo que hubiera en GitHub por lo que tienes en local.
> Úsalo solo si estás seguro de que tu versión local es la buena.

### 2.3 Flujo de trabajo diario

```bash
git pull            # traer cambios remotos
# ... editas archivos ...
npm run build       # verificar que compila
git add .
git commit -m "describe tu cambio"
git push
```

---

## Parte 3 · Publicar gratis en internet con Vercel

Vercel es la empresa que desarrolla Next.js. Su plan **Hobby es gratuito para
siempre** para proyectos personales e incluye HTTPS, CDN global, y un nuevo
despliegue automático cada vez que haces `git push`.

### 3.1 Crear la cuenta

1. Entra a <https://vercel.com/signup>.
2. Elige **Continue with GitHub**.
3. Autoriza a Vercel a leer tus repositorios.

### 3.2 Importar el proyecto

1. En el panel de Vercel, pulsa **Add New… → Project**.
2. Busca `personal-website` en la lista y pulsa **Import**.
   - Si no aparece: **Adjust GitHub App Permissions** → concede acceso al repo.
3. Vercel detecta Next.js automáticamente. **No cambies nada:**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: (vacío, lo gestiona Next.js)
   - Install Command: `npm install`
   - Environment Variables: ninguna necesaria
4. Pulsa **Deploy**.

El primer despliegue tarda 1–3 minutos. Al terminar tendrás una URL como:

```
https://personal-website-squierdan.vercel.app
```

Ya está en línea y accesible desde cualquier parte del mundo.

### 3.3 Paso obligatorio después del primer deploy

> **Ya hecho.** `site.url` apunta a
> `https://squierdan.vercel.app`.
> Solo tendrás que repetir esto si cambias de dominio.

Abre `src/lib/site.ts` y pon tu URL real:

```ts
url: "https://TU-URL-REAL.vercel.app",
```

Luego `git add . && git commit -m "chore: url de producción" && git push`.

Esto corrige el `sitemap.xml`, el `robots.txt`, las etiquetas canónicas y las
previsualizaciones de Open Graph al compartir el enlace.

### 3.4 Despliegues automáticos

A partir de ahora:

- `git push` a `main` → despliegue a producción.
- `git push` a cualquier otra rama → URL de previsualización privada.
- Cada despliegue queda archivado; puedes revertir con un clic desde
  **Deployments → ⋯ → Promote to Production**.

### 3.5 Dominio propio (opcional, ~10–15 USD/año)

1. Compra un dominio en Namecheap, Cloudflare Registrar o Porkbun.
2. En Vercel: **Project → Settings → Domains → Add**.
3. Escribe tu dominio; Vercel te muestra los registros DNS exactos.
4. Cópialos en el panel de tu proveedor de dominio.
5. Espera la propagación (minutos a 24 h). El certificado HTTPS es automático.
6. Actualiza `site.url` en `src/lib/site.ts` con el nuevo dominio.

### 3.6 Analítica gratuita (opcional)

En Vercel: **Project → Analytics → Enable**. Luego:

```bash
npm install @vercel/analytics
```

Y en `src/app/layout.tsx`, dentro de `<body>`:

```tsx
import { Analytics } from "@vercel/analytics/next";
// ...
<Analytics />
```

---

## Alternativas de hosting gratuito

| Servicio | Ventaja | Consideración |
|---|---|---|
| **Vercel** | Cero configuración para Next.js | La opción recomendada |
| **Netlify** | Formularios integrados | Necesita el plugin de Next.js |
| **Cloudflare Pages** | CDN muy rápida | Requiere el adaptador `@cloudflare/next-on-pages` |
| **GitHub Pages** | Dominio `github.io` | Requiere `output: "export"`; pierdes optimización de imágenes |

---

## Solución de problemas

**`npm: command not found`** → Node.js no está instalado o no reiniciaste la terminal.

**`EACCES` / permisos en `npm install`** → No uses `sudo`. Reinstala Node.js desde
nodejs.org o usa `nvm`.

**El puerto 3000 está ocupado** → `npm run dev -- -p 3001`.

**El build falla en Vercel pero funciona en local** → Ejecuta `npm run build`
en local; suele ser un error de TypeScript o de ESLint que `npm run dev` no
detiene. Revisa también que `package-lock.json` esté commiteado.

**`git push` rechazado (`non-fast-forward`)** → Alguien (o tú desde otro equipo)
subió cambios. Haz `git pull --rebase` y vuelve a intentar.

**Cambié un texto y no se ve** → Confirma que editaste **ambos** idiomas en
`src/i18n/dictionary.ts` (`es` y `en`).
