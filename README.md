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
- **Intersection Observer** powers the [`ScrollFade`](src/components/ScrollFade.tsx) component that reveals content like ink bleeding through paper.
- **Gyroscope-based pointer tracking** in [`useGyroscopic`](src/hooks/useGyroscopic.tsx) creates subtle paper-tilt effects as you move your cursor.
- **Swipe gesture hooks** in [`useSwipeGesture`](src/hooks/useSwipeGesture.tsx) make mobile navigation feel like flipping through magazine pages.
- **Haptic feedback** via `haptics.ts` provides tactile responses on supported mobile devices.

### Textural Details
- **`requestAnimationFrame`** drives the animated texture dots in [`InteractiveBackground`](src/components/InteractiveBackground.tsx) that simulate paper grain.
- **MDX support** via [`MDXComponents`](src/components/mdx/MDXComponents.tsx) enables rich editorial layouts with interactive content blocks.
- **Custom typography system** using Platypi (serif headlines), Fraunces (body text), and Schibsted Grotesk (UI text) to create a proper editorial hierarchy.

### Performance as Craft
Built for reading, not just browsing:
-   **Advanced Caching**: The [`useContentQuery`](src/hooks/useContentQuery.tsx) hook leverages React Query for intelligent, multi-layered caching of content from Sanity CMS, ensuring data is fresh and load times are minimal.
-   **Optimized Content Loading**: The [`contentLoader.ts`](src/utils/contentLoader.ts) utility efficiently prefetches and loads page data.
-   **Adaptive Image Optimization**: The [`imageUtils.ts`](src/utils/imageUtils.ts) utility serves connection-aware image quality, delivering high-resolution assets on fast networks and smaller versions on slower connections.
-   **Offline First**: A robust **Service Worker** (`serviceWorker.ts`) implementation caches assets aggressively, making the magazine available offline and resilient to poor network conditions.

### Mobile-First Experience
-   **Dedicated Mobile Hooks**: `useMobileOptimization.tsx` and `useMobileNavigationState.tsx` ensure a smooth and intuitive experience on smaller screens.
-   **Native Feel**: The application is designed to feel like a native app on mobile, with gesture-based navigation and haptic feedback.

## Content Strategy

The magazine is structured in sections, each with its own editorial voice:

- **work**: detailed project teardowns (not case studies) with footnotes and pullquotes
- **experiments**: live CSS toys, half-finished sketches, broken code playgrounds
- **about editor**: part résumé, part biography, part wandering letter
- **annotations**: timestamps, technical notes, design decisions

All content is managed through Sanity CMS with custom schemas that support rich editorial layouts while maintaining the magazine's tactile aesthetic.

## Technical Stack

### Core Technologies
- **React + TypeScript + Vite** for fast development and type safety.
- **Sanity CMS** for headless content management with custom editorial schemas.
- **Tailwind CSS** with custom design tokens for the magazine's visual system.
- **React Query** (`@tanstack/react-query`) for sophisticated data fetching, caching, and state management.

### UI Foundation
- **shadcn/ui** components built on Radix primitives for a robust and accessible UI.
- **Lucide React** for a clean and consistent icon set.
- **clsx** and **class-variance-authority** for conditional and variant-based styling.

### Analytics
- **Microsoft Clarity** for user behavior analytics, via `clarityMagazineTracking.ts` and `clarityService.ts`.

### Typography
Fonts from [Google Fonts](https://fonts.google.com/): [Platypi](https://fonts.google.com/specimen/Platypi) for headlines, [Fraunces](https://fonts.google.com/specimen/Fraunces) for body text, [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) for UI elements. Code blocks use [JetBrains Mono](https://fontsource.org/fonts/jetbrains-mono).

## Project Structure

```text
gryd/               # Sanity Studio CMS
public/             # Static assets
src/                # React application source
  components/       # UI components
  hooks/            # Custom React hooks
  lib/              # Shared libraries (e.g., Sanity client)
  pages/            # Page components
  styles/           # Global styles and CSS
  types/            # TypeScript type definitions
  utils/            # Utility functions and services
package.json
vite.config.ts
tailwind.config.ts
```

- `gryd/` contains the Sanity Studio for content management.
- `public/` holds static assets.
- `src/` is the React app with components, pages, hooks and styling.

## Success Metrics

This project succeeds when:
- Someone reads a whole project page, then DMs about a footnote
- A recruiter says "wait, this is a real magazine?"
- Someone prints a PDF and pins it on their wall
- Someone remembers how it felt to scroll

## Development

**Quick Start:**
```bash
npm install
npm run dev
```
*Built with care, designed for depth, optimized for the long read.*
