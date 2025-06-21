# THE GRYD — permanent issue 01

> **"the gryd is not a website. it is a living magazine"**

**THE GRYD** is a maximalist portfolio-magazine built like a haunted print zine. It's typeset in old ink, warped by scroll, textured by light — an archive dressed like a relic, coded like a contraption.

## Creative Vision

This isn't just another portfolio site. It's an experiment in digital publishing that treats the web like paper, pixels like ink, and interaction like turning pages in a forgotten design archive.

### Design Philosophy
- **tactile ui**: every element has surface, shadow, or slip
- **slow reading**: let people read, not just scroll
- **layout as voice**: use whitespace and weight to speak
- **forgotten archive**: feel like you stumbled into a design relic

### Editorial Approach
Written and designed by **Aditya Nawal** — a product designer with an engineer's mind and artist's eye. The work showcased here comes from a philosophy of studying why things fail when money's on the line, finding beauty in system edges, and making things that hold up in dark rooms, bad networks, and awkward human moments.

## Why These Technical Choices

Every line of code serves the magazine metaphor:

### Paper-Like Interactions
- **Intersection Observer** powers the [`ScrollFade`](src/components/ScrollFade.tsx) component that reveals content like ink bleeding through paper ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API))
- **Gyroscope-like pointer tracking** in [`useGyroscopic`](src/hooks/useGyroscopic.tsx) creates subtle paper-tilt effects as you move your cursor
- **Swipe gesture hooks** make mobile feel like flipping through magazine pages ([`useSwipeGesture`](src/hooks/useSwipeGesture.tsx))

### Textural Details
- **requestAnimationFrame** drives the animated texture dots in [`InteractiveBackground`](src/components/InteractiveBackground.tsx) that simulate paper grain ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame))
- **MDX support** via [`MDXComponents`](src/components/mdx/MDXComponents.tsx) enables rich editorial layouts with interactive content blocks
- **Custom typography system** using Platypi (serif headlines), Fraunces (body text), and JetBrains Mono (annotations) to create proper editorial hierarchy

### Performance as Craft
Built for reading, not just browsing:
- [React Query](https://tanstack.com/query/latest) handles content caching like a well-organized archive
- [Embla Carousel](https://www.embla-carousel.com/) creates smooth, lightweight image galleries
- Service worker implementation provides offline reading capabilities
- Adaptive image optimization responds to connection quality

## Content Strategy

The magazine is structured in sections, each with its own editorial voice:

- **work**: detailed project teardowns (not case studies) with footnotes and pullquotes
- **experiments**: live CSS toys, half-finished sketches, broken code playgrounds
- **about editor**: part résumé, part biography, part wandering letter
- **annotations**: timestamps, technical notes, design decisions

All content is managed through Sanity CMS with custom schemas that support rich editorial layouts while maintaining the magazine's tactile aesthetic.

## Technical Stack

### Core Technologies
- **React + TypeScript + Vite** for fast development and type safety
- **Sanity CMS** for content management with custom editorial schemas
- **Tailwind CSS** with custom design tokens for the magazine's visual system
- **React Query** for smart data fetching and caching

### UI Foundation
- [shadcn/ui](https://ui.shadcn.com/) components built on Radix primitives
- [Lucide React](https://lucide.dev/) icon set
- [clsx](https://github.com/lukeed/clsx) and [class-variance-authority](https://github.com/joe-bell/cva) for conditional styling

### Typography
Fonts from [Google Fonts](https://fonts.google.com/): [Platypi](https://fonts.google.com/specimen/Platypi) for headlines, [Fraunces](https://fonts.google.com/specimen/Fraunces) for body text, [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) for UI elements. Code blocks use [JetBrains Mono](https://fontsource.org/fonts/jetbrains-mono).

## Project Structure

```text
api/
public/
  lovable-uploads/
src/
  components/
  data/
  hooks/
  lib/
  pages/
  styles/
  types/
  utils/
index.html
vite.config.ts
tailwind.config.ts
vercel.json
```
- `api/` contains serverless functions such as [`login.ts`](api/login.ts).
- `public/` holds static assets, including images under `lovable-uploads/`.
- `src/` is the React app with components, pages, hooks and styling.

## Success Metrics

This project succeeds when:
- Someone reads a whole project page, then DMs about a footnote
- A recruiter says "wait, this is a real magazine?"
- Someone prints a PDF and pins it on their wall
- Someone remembers how it felt to scroll

---

*Built with care, designed for depth, optimized for the long read.*
