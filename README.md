# GRYD Echo Forge

**GRYD Echo Forge** is a design-focused magazine site built with React and Vite. The source mixes interactive articles with a lightweight CMS and is ready to deploy on Vercel.

## Techniques

- **Intersection Observer** is used in [`ScrollFade`](src/components/ScrollFade.tsx) for element reveal on scroll ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)).
- **requestAnimationFrame** drives the animated dots in [`InteractiveBackground`](src/components/InteractiveBackground.tsx) ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)).
- **Gyroscope-like pointer tracking** in [`useGyroscopic`](src/hooks/useGyroscopic.tsx) tilts elements in response to mouse movement.
- **Swipe gesture hooks** provide touch navigation in [`useSwipeGesture`](src/hooks/useSwipeGesture.tsx).
- **MDX support** via [`MDXComponents`](src/components/mdx/MDXComponents.tsx) enables rich article formatting.

## Libraries of Note

- [shadcn/ui](https://ui.shadcn.com/) components, built on Radix primitives
- [React Query](https://tanstack.com/query/latest) for data fetching
- [Embla Carousel](https://www.embla-carousel.com/) for lightweight carousels
- [clsx](https://github.com/lukeed/clsx) and [class-variance-authority](https://github.com/joe-bell/cva) for conditional class handling
- [Lucide React](https://lucide.dev/) icon set

Fonts come from [Google Fonts](https://fonts.google.com/): [Platypi](https://fonts.google.com/specimen/Platypi), [Fraunces](https://fonts.google.com/specimen/Fraunces), and [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk). Code blocks use [JetBrains Mono](https://fontsource.org/fonts/jetbrains-mono).

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

