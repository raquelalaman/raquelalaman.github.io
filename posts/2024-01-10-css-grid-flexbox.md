---
title: "CSS Grid vs Flexbox: Cuándo usar cada uno"
date: "2024-01-10"
author: "Autor del Blog"
excerpt: "Una guía práctica sobre las diferencias entre CSS Grid y Flexbox, con ejemplos reales de cuándo usar cada tecnología de layout."
tags: "css, grid, flexbox, layout, desarrollo-web"
---

# CSS Grid vs Flexbox: Cuándo usar cada uno

CSS Grid y Flexbox son dos tecnologías poderosas para crear layouts, pero muchos desarrolladores se preguntan cuándo usar cada una. En este post te explico las diferencias y cuándo aplicar cada tecnología.

## Resumen rápido

**Flexbox**: Perfecto para layouts **unidimensionales** (filas o columnas)  
**CSS Grid**: Ideal para layouts **bidimensionales** (filas y columnas simultáneamente)

## Flexbox: El maestro de una dimensión

Flexbox está diseñado para distribuir elementos a lo largo de **una sola dimensión** (horizontal o vertical).

### Cuándo usar Flexbox

✅ **Centrar contenido**
```css
.centrar {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

✅ **Barras de navegación**
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

✅ **Componentes de interfaz**
- Botones con iconos
- Cards con contenido alineado
- Formularios inline

✅ **Distribución espacial**
```css
.distribuir {
    display: flex;
    justify-content: space-around; /* o space-between, space-evenly */
}
```

### Ejemplo práctico: Card de producto

```html
<div class="product-card">
    <img src="producto.jpg" alt="Producto">
    <div class="content">
        <h3>Título del producto</h3>
        <p class="price">$99.99</p>
    </div>
    <button>Agregar al carrito</button>
</div>
```

```css
.product-card {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.content {
    flex: 1; /* Ocupa el espacio disponible */
}

button {
    margin-top: auto; /* Se empuja al final */
}
```

## CSS Grid: El maestro bidimensional

CSS Grid maneja **filas y columnas simultáneamente**, perfecto para layouts complejos.

### Cuándo usar CSS Grid

✅ **Layouts de página completa**
```css
.layout {
    display: grid;
    grid-template-areas: 
        "header header"
        "sidebar main"
        "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}
```

✅ **Galerías de imágenes**
```css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}
```

✅ **Formularios complejos**
```css
.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.full-width {
    grid-column: 1 / -1;
}
```

### Ejemplo práctico: Dashboard

```html
<div class="dashboard">
    <header class="header">Header</header>
    <aside class="sidebar">Sidebar</aside>
    <main class="main">Contenido principal</main>
    <footer class="footer">Footer</footer>
</div>
```

```css
.dashboard {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main"
        "sidebar footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: 60px 1fr 60px;
    height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Comparación práctica

### Centrar un elemento

**Con Flexbox:**
```css
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

**Con Grid:**
```css
.grid-center {
    display: grid;
    place-items: center;
}
```

### Layout de tres columnas

**Con Flexbox:**
```css
.tres-columnas-flex {
    display: flex;
}

.columna {
    flex: 1;
    padding: 1rem;
}

.sidebar {
    flex: 0 0 250px; /* No crece, no se encoge, 250px fijo */
}
```

**Con Grid:**
```css
.tres-columnas-grid {
    display: grid;
    grid-template-columns: 250px 1fr 250px;
    gap: 1rem;
}
```

## Casos de uso específicos

### 📱 Layouts responsive

**Grid para estructura general:**
```css
.container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

@media (min-width: 768px) {
    .container {
        grid-template-columns: 1fr 300px;
    }
}
```

**Flexbox para componentes:**
```css
.card {
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .card {
        flex-direction: row;
    }
}
```

### 🎨 Galerías y grids

**Grid para galería:**
```css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

/* Elementos destacados */
.featured {
    grid-column: span 2;
    grid-row: span 2;
}
```

### 🧭 Navegación

**Flexbox para navbar:**
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}
```

## Combinando ambas tecnologías

¡No tienes que elegir una sola! Es común combinar ambas:

```css
/* Grid para el layout principal */
.page-layout {
    display: grid;
    grid-template-areas:
        "header"
        "main"
        "footer";
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

/* Flexbox para el header */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

/* Grid para el contenido principal */
.main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

/* Flexbox para cada card */
.card {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

## Reglas de oro

### Usa Flexbox cuando:
- Necesites **alinear elementos** en una dimensión
- Quieras **distribuir espacio** entre elementos
- Trabajes con **componentes pequeños**
- Necesites **centrar contenido** fácilmente

### Usa CSS Grid cuando:
- Diseñes **layouts de página completa**
- Necesites control sobre **filas Y columnas**
- Crees **galerías o dashboards**
- Quieras **posicionamiento preciso**

## Soporte en navegadores

Ambas tecnologías tienen **excelente soporte**:

- **Flexbox**: 98%+ de navegadores modernos
- **CSS Grid**: 95%+ de navegadores modernos

Para proyectos nuevos, puedes usar ambas sin problemas.

## Recursos adicionales

### Herramientas útiles
- [Flexbox Froggy](https://flexboxfroggy.com/) - Juego para aprender Flexbox
- [CSS Grid Garden](https://cssgridgarden.com/) - Juego para aprender Grid
- [Grid by Example](https://gridbyexample.com/) - Ejemplos prácticos

### Generadores
- [CSS Grid Generator](https://cssgrid-generator.netlify.app/)
- [Flexbox Patterns](https://www.flexboxpatterns.com/)

## Conclusión

No hay una respuesta única sobre cuál usar. La clave está en entender las fortalezas de cada uno:

- **Flexbox** = Una dimensión + Alineación perfecta
- **CSS Grid** = Dos dimensiones + Control total del layout

Mi recomendación: **aprende ambos** y combínalos según las necesidades de cada proyecto.

¿Qué prefieres usar en tus proyectos? ¡Cuéntame en los comentarios! 🎯