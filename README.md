# raquelalaman.github.io

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://raquelalaman.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Lloc web personal i professional de Raquel Alamán** - Enginyera informàtica, docent, investigadora i coordinadora de formació professional en desenvolupament d'aplicacions.

🌐 **URL del lloc**: [https://raquelalaman.github.io](https://raquelalaman.github.io)

---

## 📋 Sobre el Projecte

Aquest repositori conté el codi font del meu lloc web personal, desenvolupat com una Single Page Application (SPA) moderna i responsive. El lloc combina la meva trajectòria professional, projectes de recerca, reflexions sobre tecnologia i educació, i un blog amb contingut sobre desenvolupament i innovació digital.

### Característiques Principals

- ✅ **Disseny 100% responsive** - Adaptat a mòbils, tablets i desktop
- ✅ **Navegació dinàmica** - SPA sense recarregues de pàgina
- ✅ **Blog integrat** - Sistema de publicació de posts en Markdown
- ✅ **Multilingüe** - Contingut principal en català
- ✅ **Optimitzat SEO** - Meta tags, estructura semàntica
- ✅ **Rendiment optimitzat** - Càrrega ràpida i eficient
- ✅ **Paleta de colors moderna** - Disseny professional amb azul elèctric (#0066ff)

---

## 🗂️ Estructura del Projecte

```
raquelalaman.github.io/
│
├── index.html              # Pàgina principal
├── qui-soc.html           # Secció "Qui soc?"
├── projectes.html         # Projectes de recerca i desenvolupament
├── blog.html              # Blog amb reflexions digitals
│
├── css/
│   └── style.css          # Estils globals i responsive
│
├── js/
│   └── main.js            # JavaScript per funcionalitat dinàmica
│
├── posts/                 # Articles del blog en Markdown
│   ├── 2024-01-15-bienvenido-blog.md
│   ├── 2024-01-12-guia-markdown.md
│   ├── 2024-01-10-css-grid-flexbox.md
│   └── 2024-01-08-javascript-moderno.md
│
├── images/                # Recursos multimèdia
│
├── _config.yml           # Configuració GitHub Pages
└── README.md             # Aquest document
```

---

## 🚀 Tecnologies Utilitzades

### Frontend Core
- **HTML5** - Estructura semàntica
- **CSS3** - Estils moderns amb Grid i Flexbox
- **JavaScript ES6+** - Funcionalitat dinàmica i interactiva

### Llibreries Externes (CDN)
- **[Marked.js](https://marked.js.org/)** - Parser de Markdown a HTML
- **[Highlight.js](https://highlightjs.org/)** - Ressaltat de sintaxi per blocs de codi
- **[Font Awesome](https://fontawesome.com/)** - Icones vectorials
- **[Google Fonts](https://fonts.google.com/)** - Tipografia Inter

### Hosting i Deployment
- **GitHub Pages** - Hosting estàtic gratuït
- **GitHub API** - Càrrega automàtica de posts del blog

---

## 🎨 Paleta de Colors

El disseny utilitza una paleta de colors moderna i professional:

```css
:root {
    --electric-blue: #0066ff;       /* Azul elèctric principal */
    --electric-blue-dark: #0052cc;  /* Azul més fosc (hovers) */
    --electric-blue-light: #3385ff; /* Azul més clar (accents) */
    --white: #ffffff;               /* Blanc pur */
    --light-gray: #f5f7fa;          /* Gris clar (fons) */
    --medium-gray: #e1e5e9;         /* Gris mitjà (separadors) */
    --dark-gray: #64748b;           /* Gris fosc (text secundari) */
    --black: #1e293b;               /* Gris molt fosc (text principal) */
}
```

---

## 📝 Com Afegir Posts al Blog

### 1. Format del Nom de Fitxer

Els posts han de seguir aquesta convenció:

```
YYYY-MM-DD-titol-del-post.md
```

**Exemple**: `2024-12-12-intel·ligencia-artificial-educacio.md`

### 2. Estructura del Post (Front Matter)

Cada post ha de començar amb metadades en format YAML:

```markdown
---
title: "Títol del Post"
date: "2024-12-12"
author: "Raquel Alamán"
excerpt: "Breu descripció del contingut que apareixerà a la llista de posts"
tags: "intel·ligència artificial, educació, innovació"
---

# El teu contingut aquí

Escriu el teu post utilitzant **Markdown** estàndard...
```

### 3. Camps Front Matter

| Camp | Requerit | Descripció |
|------|----------|------------|
| `title` | Sí | Títol del post |
| `date` | Sí | Data en format YYYY-MM-DD |
| `author` | Sí | Nom de l'autor |
| `excerpt` | Sí | Resum breu per a la llista |
| `tags` | No | Etiquetes separades per comes |

### 4. Pujar el Post

1. Crea el fitxer `.md` a la carpeta `posts/`
2. Fes commit i push al repositori
3. GitHub Pages actualitzarà automàticament el lloc

---

## 🛠️ Instal·lació i Desenvolupament Local

### Prerequisits

No cal instal·lar dependències. Només necessites un navegador web modern.

### Clonar el Repositori

```bash
git clone https://github.com/raquelalaman/raquelalaman.github.io.git
cd raquelalaman.github.io
```

### Executar Localment

**Opció 1: Servidor HTTP simple amb Python**
```bash
python -m http.server 8000
```

**Opció 2: Live Server de VS Code**
- Instal·la l'extensió "Live Server"
- Obre `index.html` i fes clic a "Go Live"

Accedeix a `http://localhost:8000` al teu navegador.

---

## 📱 Responsive Design

El lloc s'adapta a diferents mides de pantalla:

| Dispositiu | Breakpoint | Característiques |
|-----------|------------|------------------|
| **Mòbil** | < 768px | Navegació hamburguesa, columna única |
| **Tablet** | 768px - 1024px | Grid de 2 columnes |
| **Desktop** | > 1024px | Grid de 3 columnes, navegació completa |

---

## 🎯 Funcionalitats Principals

### Sistema de Navegació SPA
- Navegació dinàmica sense recarregar la pàgina
- URL hash routing (`#about-section`, `#projects-section`)
- Transicions suaus entre seccions

### Blog Dinàmic
- Càrrega automàtica de posts des de la carpeta `posts/`
- Renderització de Markdown a HTML
- Paginació automàtica (6 posts per pàgina)
- Sistema d'etiquetes per categoritzar contingut

### Optimitzacions
- Lazy loading d'imatges
- Minificació de recursos
- Cache de navegador optimitzat
- Fonts web precarregades

---

## 📚 Recursos i Referències

### Documentació
- [GitHub Pages Documentation](https://docs.github.com/es/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [HTML5 Best Practices](https://www.w3.org/TR/html5/)

### Eines de Desenvolupament
- [VS Code](https://code.visualstudio.com/) - Editor recomanat
- [Dillinger](https://dillinger.io/) - Editor de Markdown online
- [TinyPNG](https://tinypng.com/) - Optimització d'imatges
- [Can I Use](https://caniuse.com/) - Compatibilitat de navegadors

---

## 🤝 Contribucions

Tot i que aquest és un lloc web personal, les contribucions per millorar el codi són benvingudes!

### Com Contribuir

1. **Fork** el repositori
2. Crea una **branch** per la teva feature:
   ```bash
   git checkout -b feature/millora-interessant
   ```
3. **Commit** els teus canvis:
   ```bash
   git commit -am 'Afegir nova funcionalitat'
   ```
4. **Push** a la branch:
   ```bash
   git push origin feature/millora-interessant
   ```
5. Obre un **Pull Request**

### Reportar Issues

Si trobes errors o tens suggeriments:
- Obre un [issue a GitHub](https://github.com/raquelalaman/raquelalaman.github.io/issues)
- Descriu el problema o la millora proposada
- Inclou captures de pantalla si és necessari

---

## 👤 Sobre l'Autora

**Raquel Alamán**  
Enginyera Informàtica | Docent | Investigadora

- 💼 Docent i coordinadora de cicles de desenvolupament a l'Institut Tecnològic de Barcelona (ITB)
- 🔬 Investigadora en bioinformàtica i intel·ligència artificial
- 🎓 Coordinadora del programa de mobilitat Erasmus+
- 💻 Més de 15 anys d'experiència en desenvolupament web i gestió de projectes

### Contacte

- 🌐 Web: [raquelalaman.github.io](https://raquelalaman.github.io)
- 📧 Email: [Contacta a través del web](https://raquelalaman.github.io/qui-soc.html)
- 🐙 GitHub: [@raquelalaman](https://github.com/raquelalaman)

---

## 📄 Llicència

Aquest projecte està sota la Llicència MIT. Consulta el fitxer [LICENSE](LICENSE) per a més detalls.

```
MIT License

Copyright (c) 2024 Raquel Alamán

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Agraïments

- **[GitHub Pages](https://pages.github.com/)** - Per l'hosting gratuït i fiable
- **[Marked.js](https://marked.js.org/)** - Per l'excel·lent parser de Markdown
- **[Highlight.js](https://highlightjs.org/)** - Per el ressaltat de sintaxi
- **[Font Awesome](https://fontawesome.com/)** - Per les icones vectorials
- **La comunitat de desenvolupadors** - Per la inspiració i el feedback constant

---

## 🌟 Donar Suport

Si aquest projecte t'ha estat útil:
- ⭐ Dona una estrella al repositori
- 🔀 Comparteix-lo amb altres desenvolupadors
- 📝 Obre issues amb suggeriments de millora
- 🤝 Contribueix amb pull requests

---

**Fet amb ❤️ i ☕ per Raquel Alamán**

*Última actualització: Desembre 2025*
