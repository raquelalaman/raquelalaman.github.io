# 📝 Tema de Blog para GitHub Pages

Un tema moderno y responsive para crear blogs personales usando GitHub Pages. Lee automáticamente archivos Markdown del repositorio y los presenta en un formato atractivo y fácil de navegar.

## 🎯 Características Principales

### ✨ Funcionalidades Implementadas
- **📱 Diseño 100% responsive** - Se adapta a cualquier dispositivo
- **🎨 Paleta de colores moderna** - Azul eléctrico (#0066ff), blanco y gris claro
- **📖 Lectura automática de Markdown** - Carga posts desde la carpeta `posts/`
- **🔍 Navegación intuitiva** - Home, posts individuales, archivo y acerca de
- **💻 Resaltado de sintaxis** - Para bloques de código usando Highlight.js
- **🏷️ Sistema de etiquetas** - Organización por categorías
- **📄 Paginación automática** - Para listas largas de posts
- **⚡ Carga dinámica** - Sin recargas de página
- **🎭 Animaciones suaves** - Transiciones CSS elegantes

### 🏗️ Arquitectura del Proyecto
```
├── index.html              # Página principal con toda la estructura
├── css/
│   └── style.css          # Estilos completos y responsive
├── js/
│   └── main.js            # JavaScript para funcionalidad dinámica
├── posts/                 # Carpeta con archivos Markdown
│   ├── 2024-01-15-bienvenido-blog.md
│   ├── 2024-01-12-guia-markdown.md
│   ├── 2024-01-10-css-grid-flexbox.md
│   └── 2024-01-08-javascript-moderno.md
├── _config.yml            # Configuración de GitHub Pages
└── README.md              # Esta documentación
```

## 🚀 URLs Funcionales de Entrada

### Páginas Principales
- **`/` (Inicio)** - Lista paginada de posts recientes
- **`/#post-section`** - Vista individual de post (carga dinámica)
- **`/#about-section`** - Información sobre el blog
- **`/#archive-section`** - Archivo completo de posts

### Parámetros de Navegación
- **Paginación**: Navegación automática por páginas de posts
- **Búsqueda de posts**: Por nombre de archivo y metadatos
- **Filtrado**: Por fechas y etiquetas (implementado en JavaScript)

## 🛠️ Configuración e Instalación

### Paso 1: Clonar o Descargar
```bash
git clone [URL_DEL_REPOSITORIO]
cd tu-blog-github-pages
```

### Paso 2: Configurar GitHub Pages
1. Sube los archivos a tu repositorio de GitHub
2. Ve a **Settings > Pages** en tu repositorio
3. Selecciona **Deploy from a branch**
4. Escoge **main branch** y **/ (root)**
5. Guarda la configuración

### Paso 3: Personalizar
Edita los siguientes archivos:

**`_config.yml`**:
```yaml
title: "Tu Blog Personal"
description: "Tu descripción aquí"
author:
  name: "Tu Nombre"
  email: "tu@email.com"
```

**`index.html`** (líneas 15-16):
```html
<title>Tu Blog</title>
<meta name="description" content="Tu descripción">
```

## 📝 Cómo Agregar Posts

### Formato de Archivo
Los posts deben seguir este formato de nombre:
```
YYYY-MM-DD-titulo-del-post.md
```

### Estructura del Post
```markdown
---
title: "Título del Post"
date: "2024-01-15"
author: "Tu Nombre"
excerpt: "Breve descripción del contenido"
tags: "tag1, tag2, tag3"
---

# Tu contenido aquí

Escribe tu post en **Markdown** normal...
```

### Front Matter Soportado
- `title`: Título del post
- `date`: Fecha en formato YYYY-MM-DD
- `author`: Nombre del autor
- `excerpt`: Resumen corto para la lista
- `tags`: Etiquetas separadas por comas

## 🎨 Personalización de Diseño

### Colores Principales
```css
:root {
    --electric-blue: #0066ff;      /* Azul eléctrico principal */
    --electric-blue-dark: #0052cc; /* Azul más oscuro */
    --electric-blue-light: #3385ff; /* Azul más claro */
    --white: #ffffff;              /* Blanco */
    --light-gray: #f5f7fa;         /* Gris claro */
    --medium-gray: #e1e5e9;        /* Gris medio */
    --dark-gray: #64748b;          /* Gris oscuro */
}
```

### Tipografía
- **Fuente**: Inter (Google Fonts)
- **Tamaños**: Sistema escalable con rem
- **Pesos**: 300, 400, 500, 600, 700

### Responsive Breakpoints
- **Móvil**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Tecnologías Utilizadas

### Frontend Core
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Grid y Flexbox
- **JavaScript ES6+** - Funcionalidad dinámica

### Librerías CDN
- **Marked.js** - Procesamiento de Markdown
- **Highlight.js** - Resaltado de sintaxis
- **Font Awesome** - Iconos vectoriales
- **Google Fonts** - Tipografía web

### Servicios
- **GitHub Pages** - Hosting estático gratuito
- **GitHub API** - Carga automática de posts

## 📊 Modelo de Datos

### Estructura de Post
```javascript
{
    id: "nombre-archivo-sin-extension",
    title: "Título del Post",
    date: "2024-01-15",
    author: "Nombre del Autor",
    excerpt: "Descripción corta...",
    content: "Contenido completo en HTML",
    tags: ["tag1", "tag2", "tag3"],
    filename: "archivo-original.md"
}
```

### Configuración Global
```javascript
const CONFIG = {
    postsPerPage: 6,           // Posts por página
    postsDirectory: 'posts',   // Carpeta de posts
    githubRepo: 'auto',       // Detectado automáticamente
    currentPage: 1,           // Página actual
    totalPosts: 0,            // Total de posts
    allPosts: []              // Array de todos los posts
}
```

## 🔄 Características Próximas a Implementar

### Funcionalidades Pendientes
- [ ] **🔍 Buscador de posts** - Búsqueda por título y contenido
- [ ] **🏷️ Filtro por etiquetas** - Navegación por categorías
- [ ] **📱 PWA Support** - Instalable como app móvil
- [ ] **🌙 Modo oscuro** - Toggle de tema claro/oscuro
- [ ] **💬 Sistema de comentarios** - Integración con Disqus/utterances
- [ ] **📈 Analytics** - Integración con Google Analytics
- [ ] **🔗 Social sharing** - Botones para compartir en RRSS
- [ ] **📑 Tabla de contenidos** - Para posts largos
- [ ] **⏱️ Tiempo de lectura** - Estimación automática
- [ ] **🔔 RSS Feed** - Suscripción automática

### Mejoras Técnicas
- [ ] **⚡ Service Worker** - Cache offline
- [ ] **🗂️ Organización por fechas** - Archivo por año/mes
- [ ] **🖼️ Lazy loading** - Para imágenes
- [ ] **🔐 GitHub Actions** - Deploy automático
- [ ] **📝 Plantillas de post** - Templates predefinidos

## 🚀 Próximos Pasos Recomendados

### Para el Desarrollo
1. **Implementar búsqueda** usando Fuse.js o similar
2. **Agregar modo oscuro** con CSS custom properties
3. **Optimizar rendimiento** con lazy loading
4. **Mejorar SEO** con meta tags dinámicos
5. **Agregar PWA** con manifest y service worker

### Para el Contenido
1. **Escribir más posts** de ejemplo
2. **Crear plantillas** para diferentes tipos de contenido
3. **Documentar guías** de uso y personalización
4. **Optimizar imágenes** para web
5. **Crear contenido evergreen** que mantenga relevancia

## 📚 Recursos y Enlaces

### Documentación
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Docs](https://docs.github.com/es/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)

### Herramientas Útiles
- [Markdown Editor Online](https://dillinger.io/)
- [Color Palette Generator](https://coolors.co/)
- [Font Pairing Tool](https://fontjoy.com/)
- [Image Optimization](https://tinypng.com/)

## 🤝 Contribución

### Cómo Contribuir
1. Fork el repositorio
2. Crea una branch para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

### Reportar Issues
- Usa el template de issues de GitHub
- Incluye capturas de pantalla si es necesario
- Describe los pasos para reproducir el problema

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Marked.js** - Por el excelente parser de Markdown
- **Highlight.js** - Por el resaltado de sintaxis
- **Font Awesome** - Por los iconos vectoriales
- **GitHub** - Por el hosting gratuito con Pages
- **La comunidad** - Por el feedback y contribuciones

---

**📧 Contacto**: Si tienes preguntas o sugerencias, no dudes en abrir un issue o contactar al autor.

**⭐ ¿Te gusta el proyecto?** ¡Dale una estrella en GitHub y compártelo con otros desarrolladores!