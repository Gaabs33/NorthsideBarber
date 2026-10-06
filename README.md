# Northside Barber Co.

Northside Barber Co. is a fictional, editorial-style portfolio site for an independent Brooklyn barbershop. It is built to feel like a real local business: short copy, practical hours, a focused service list, a gallery of work, and a booking flow that clearly identifies itself as a demo.

> This is a fictional portfolio project. No real business is represented and no appointment is created.

## Screenshot

Add a project screenshot here when presenting the work:

<img width="1902" height="963" alt="image" src="https://github.com/user-attachments/assets/1539cc28-4ba4-4014-8bc2-46b8e7eec122" />


## Live Demo

[https://northsidebarber.netlify.app/]

## Technologies

- HTML5 semantic markup
- CSS3 with custom properties, Grid, `clamp()` and responsive breakpoints
- Vanilla JavaScript
- GSAP + ScrollTrigger via CDN
- Lenis via CDN
- Google Fonts: Playfair Display, DM Sans and DM Mono

## How to run

No build step is required.

1. Clone or download the repository.
2. Open `index.html` directly in a browser, or serve the folder with any simple static server.

For example, with Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

The CDN scripts need an internet connection for GSAP and Lenis. The page remains readable without them because the CSS includes a no-JavaScript base state.

## Structure

```text
/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── main.js
├── assets/
│   └── images/
│       └── IMAGE_GUIDE.md
├── CASE_STUDY.md
└── README.md
```

## Images

The page uses nine locally generated editorial photographs. The full mapping is in [assets/images/IMAGE_GUIDE.md](assets/images/IMAGE_GUIDE.md). Each `src` in `index.html` points directly to one of these local files, so the site does not depend on remote image hosts.

## Features

- Editorial hero with clipped intro reveal
- Subtle hero image/text mouse movement on fine pointers
- Magnetic primary buttons
- Lenis smooth scrolling synchronized with ScrollTrigger
- Service list with hover behavior instead of repeated cards
- Asymmetric About layout and internal image parallax
- Irregular gallery with restrained image hover treatment
- Single responsive marquee band
- Scroll-triggered reveals with reduced-motion support
- Fullscreen mobile menu with staggered links
- Accessible booking drawer with validation, Escape-to-close, focus return and demo success state
- Mobile, tablet and desktop breakpoints

## Publishing on Netlify

Drag the project folder into Netlify Drop, or connect the Git repository in Netlify. Because this is a static site, the publish directory is the project root and no build command is needed. If you use a local preview server, publish the same root folder that contains `index.html`.

## Accessibility

The page uses semantic sections, real form labels, alt text, a skip link, focus-visible browser behavior, keyboard-closeable modal behavior, an explicit mobile-menu state, and a `prefers-reduced-motion` mode that removes smooth scrolling, parallax, magnetic effects and long transitions. The site uses the browser's normal cursor.

## Author

Portfolio concept by **Gabriel Alves**.
