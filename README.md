# PetCare Hub · Landing Page

Landing estática de PetCare Hub (NexoShift, UPC 1ASI0728). HTML, CSS y JavaScript sin frameworks, lista para GitHub Pages, con i18n en español e inglés.

## Estructura

```
landing/
├── index.html              # Página única con todas las secciones
├── css/
│   ├── styles.css          # Punto de entrada (importa todo lo demás)
│   ├── base/               # variables (paleta, tipografía, espaciado), reset, tipografía, layout
│   ├── components/         # botones, header, tarjetas, footer
│   └── sections/           # hero, cómo funciona, IA, beneficios, planes, equipo, FAQ, CTA
├── js/
│   ├── config.js           # URL de la app web y rutas de login/registro
│   ├── i18n.js             # Cambio de idioma ES/EN
│   └── main.js             # Menú móvil, header, enlace activo, animaciones
├── i18n/
│   ├── es.json             # Textos en español
│   └── en.json             # Textos en inglés
└──  assets/img/
    ├── brand/              # isotipo.svg y logo-petcarehub.png
    └── team/               # Fotos de los 5 integrantes

```

## Secciones

Header con selector ES/EN · Hero · Cómo funciona · Funciones IA (Computer Vision y LLM) · Beneficios · Planes ($9, $29, $79 USD) · Equipo · Preguntas frecuentes · CTA final · Footer.

## Guía de estilo aplicada (TP1, 6.1)

| Token | Valor |
| --- | --- |
| Primario (azul marino) | `#032B59` |
| Secundario (azul profundo) | `#023A65` |
| Acento (turquesa) | `#0BC3BD` |
| Texto principal / secundario | `#1C2430` / `#667085` |
| Tipografía | Inter 400, 500, 600 y 700 |
| Espaciado | múltiplos de 8 px |

Todos los valores están en `css/base/variables.css`.

## i18n

Cada texto traducible lleva `data-i18n="seccion.clave"` (o `data-i18n-html` / `data-i18n-attr`). Para agregar un texto:

1. Ponerlo en el HTML con su atributo `data-i18n`.
2. Agregar la misma clave en `i18n/es.json` y `i18n/en.json`.

El idioma elegido se guarda en el navegador. El HTML ya trae el español, así que la página se ve completa aunque no carguen los JSON.
