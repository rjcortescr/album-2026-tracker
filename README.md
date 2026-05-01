# 🏆 Álbum 2026 — Tracker de Cromos

> Una PWA simple, gratuita y open source para coleccionistas que quieran llevar el control de su álbum del Mundial 2026.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![PWA](https://img.shields.io/badge/PWA-installable-purple)

---

## 🎯 ¿Qué es esto?

Una aplicación web progresiva (PWA) que permite:

- Llevar el inventario de cromos por selección (48 selecciones × 20 cromos)
- Trackear los 20 cromos especiales (FWC) y los 80 Extra Stickers
- Generar listas automáticas de **repetidas** y **faltantes** para intercambiar
- Compartir esas listas por WhatsApp con un toque
- Sincronizar el progreso en la nube entre múltiples dispositivos
- Funcionar offline (Service Worker)
- Instalarse como app en el celular (iOS y Android)

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML + CSS + JavaScript vanilla (sin frameworks) |
| Backend | [Supabase](https://supabase.com/) (Auth + Postgres) |
| Hosting | [Netlify](https://www.netlify.com/) |
| PWA | Service Worker + Web App Manifest |

**¿Por qué sin frameworks?** Para un proyecto de este tamaño, agregar React o Vue solo añade complejidad sin beneficios reales. Vanilla JS rinde, carga rapidísimo y cualquier desarrollador puede leerlo.

## 🤖 ¿Cómo se construyó?

Este proyecto fue construido **íntegramente usando [Claude](https://claude.ai)** como pair programmer.

Iteré con la AI durante varias sesiones, validando datos contra fuentes oficiales (la lista de las 48 selecciones del sorteo FIFA, la composición real del álbum Panini, los 20 jugadores oficiales de los Extra Stickers), corrigiendo errores que la AI cometía (incluyó Italia cuando no clasificó, omitió a Haití y Cabo Verde inicialmente), y refinando el diseño visual hasta llegar al producto final.

**Tiempo total invertido:** ~6-8 horas distribuidas en varias sesiones.

**Lecciones aprendidas:**

- La AI acelera muchísimo la velocidad de iteración, pero **necesita supervisión humana** para validar datos del mundo real.
- Los detalles importantes (numeración real del álbum, lista exacta de jugadores) salieron de revisar fuentes y de mi propio conocimiento del producto físico, no de la AI.
- Tener un objetivo claro y un usuario real (yo y mi familia) hizo todo el proceso mucho más enfocado.

## ⚙️ Cómo correrlo

### 1. Cloná o descargá este repositorio

### 2. Configurá Supabase

1. Creá una cuenta gratis en [supabase.com](https://supabase.com)
2. Creá un nuevo proyecto
3. En el SQL Editor, ejecutá el contenido del archivo [`setup.sql`](setup.sql) de este repo
4. En **Authentication → Providers → Email**, desactivá "Confirm email" para uso simple

### 3. Configurá las credenciales

Abrí `index.html` y reemplazá los valores `TU_SUPABASE_URL_AQUI` y `TU_SUPABASE_ANON_KEY_AQUI` por los de tu proyecto (los encontrás en **Settings → API** en Supabase).

### 4. Subí los archivos a un host estático

Las opciones más simples:

- **[Netlify Drop](https://app.netlify.com/drop)** — arrastrás la carpeta y listo
- **[Vercel](https://vercel.com)** — similar, gratis para uso personal
- **GitHub Pages** — gratis, integrado con este repo

### 5. Instalá la PWA en el celular

- **iPhone**: abrí el link en Safari → Compartir → "Agregar a pantalla de inicio"
- **Android**: abrí en Chrome → menú → "Instalar app"

## 📊 Estructura del proyecto

- `index.html` — Toda la app en un solo archivo (HTML + CSS + JS)
- `manifest.json` — Configuración PWA
- `sw.js` — Service Worker (offline + cache)
- `setup.sql` — Script para configurar la base de datos en Supabase
- `icon.svg` — Ícono fuente
- `icon-*.png` — Íconos generados en distintos tamaños

## ⚠️ Aviso legal

Este es un proyecto **personal y no comercial** sin afiliación con FIFA, Panini, ni ninguna entidad oficial relacionada con el Mundial 2026. Los nombres de selecciones, jugadores y el formato del álbum son referencias a un producto coleccionable real, pero el código y diseño de esta app son obra propia.

Si vas a hacer un fork o usar este código, te recomiendo evitar nombres comerciales protegidos (Panini, FIFA, Mundial 2026) si querés monetizarlo.

## 🤝 Contribuir

¿Encontraste un bug o tenés una mejora? Abrí un Issue o mandá un Pull Request.

Ideas de mejoras abiertas:

- Reconocimiento de cromos por foto/cámara (OCR)
- Sistema de matching automático entre usuarios para intercambios
- Estadísticas avanzadas (proyección de finalización, costo estimado, etc.)
- Soporte multiidioma (EN, PT)
- Tema claro / oscuro

## 📝 Licencia

MIT — Hacé lo que quieras con este código. Si lo usás en algo público, una mención es bienvenida pero no obligatoria.

## 👤 Autor

**Rodolfo Cortés** — CEO & Co-Founder de [Lúmina](https://luminalatam.com)

- GitHub: [@rjcortescr](https://github.com/rjcortescr)

---

⚽ Hecho con AI, café, y mucha emoción mundialista desde Costa Rica.
