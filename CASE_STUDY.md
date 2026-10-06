# Northside Barber Co.

## Overview

Concept website developed for a fictional independent barbershop.

## Problem

A local barbershop needs a modern website that presents its services, pricing, opening hours and personality without feeling corporate or generic. The challenge was to make the site feel useful enough for a real shop while keeping the visual language distinctive enough for a front-end portfolio.

## Solution

Northside uses an editorial layout built around oversized serif typography, compact utility labels, quiet borders and an intentionally uneven image composition. The information is practical, but the page has a clear rhythm: arrive through the hero, understand the services, learn the shop’s point of view, browse the work, then visit or book.

- Strong typography creates the personality without relying on decorative graphics.
- A responsive layout moves from a staggered desktop composition into a clean single-column mobile experience.
- GSAP handles the intro sequence, reveal timing, image clips, marquee and magnetic interactions.
- ScrollTrigger connects section reveals and restrained image parallax to the page narrative.
- Lenis adds a premium but still quick-feeling scroll layer on capable devices.
- The booking drawer is a functional front-end demo with native form validation and a clearly labeled success state.
- The mobile menu uses a vertical clip reveal and staggered navigation rather than a generic side drawer.

## Technologies

HTML5  
CSS3  
JavaScript  
GSAP  
ScrollTrigger  
Lenis

## Features

- Semantic, responsive single-page architecture.
- Desktop navigation with scroll-aware blur.
- Short hero intro animation with clipped headline and image reveal.
- Fine-pointer hero parallax using `gsap.quickTo()`.
- Magnetic buttons for the main calls to action.
- Service list with hover movement, pricing and directional affordance.
- About section with overlapping photos, facts and parallax.
- Uneven gallery with image scaling and a restrained brightness change.
- Constant-speed marquee that is independent from page scroll, Lenis and ScrollTrigger.
- Testimonial presented as one large editorial quote rather than a card grid.
- Visit section with hours and conceptual location.
- Booking modal/drawer with form validation, Escape close and focus return.
- Mobile fullscreen navigation with staggered items.
- Nine locally generated photographs mapped to the real content of each section.
- Reduced motion support.

## Challenges

The biggest technical challenge was balancing movement with usability. Mouse interactions use `quickTo()` so pointer events do not create a new tween on every frame. The page also checks pointer capability and reduced-motion preferences before enabling the effects.

Another challenge was preserving content if JavaScript or the CDNs are unavailable. The CSS keeps content visible by default, and the JavaScript only adds the hidden/reveal state once the document is ready. The form still uses native HTML validation.

The gallery required careful CSS Grid placement so its asymmetry feels intentional on desktop while collapsing into predictable rows on smaller screens. No section depends on absolute positioning for its core content.

## What I learned

- Editorial layouts get their character from rhythm and restraint more than from adding effects.
- Small utility labels and deliberate whitespace can make a local-business concept feel specific.
- Interaction systems should be progressive enhancements, not prerequisites for reading or navigation.
- Reduced-motion behavior needs to be planned into the initial state, not patched in at the end.
- A demo booking flow should explain its boundaries clearly instead of pretending to be connected to a real backend.

## Result

The result is a complete fictional barbershop experience that is visually memorable, practical to navigate and ready to publish as a static site. The nine local editorial photographs can be replaced with a photographer's final set later, copy can be edited in the HTML, and the visual system lives in a small set of CSS variables.
