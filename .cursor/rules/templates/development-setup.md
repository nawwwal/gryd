# Development Setup for THE GRYD

## Quick Start

### Prerequisites
```bash
# Required versions
Node.js 18+
npm 9+
Git 2.30+
```

### Initial Setup
```bash
# Clone and install
git clone [repo-url]
cd gryd-echo-forge
npm install

# Install Sanity dependencies
cd gryd
npm install
cd ..

# Environment setup
cp .env.example .env
cp gryd/.env.local.example gryd/.env.local
```

### Environment Variables
```env
# Frontend (.env)
VITE_SANITY_PROJECT_ID=c0rjrvm3
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-06-21

# Sanity Studio (gryd/.env.local)
SANITY_PROJECT_ID=c0rjrvm3
SANITY_DATASET=production
```

## Development Workflow

### Daily Development
```bash
# Terminal 1: Frontend (runs on :8080)
npm run dev

# Terminal 2: Sanity Studio (runs on :3333)
cd gryd && npm run dev
```

### Code Quality
```bash
# Before committing
npm run lint
npm run lint:fix
npm run build  # ensure it builds
```

### Content Management
```bash
# Deploy schema changes
cd gryd && npx sanity schema deploy

# Deploy studio
cd gryd && npx sanity deploy
```

## Project Architecture

### Frontend Structure
```
src/
├── components/          # React components
│   ├── mdx/            # MDX content blocks
│   ├── ui/             # Shadcn/ui components
│   └── skeletons/      # Loading states
├── hooks/              # Custom React hooks
├── lib/                # Utilities and clients
├── pages/              # Route components
├── styles/             # CSS files
├── types/              # TypeScript definitions
└── utils/              # Helper functions
```

### Sanity Structure
```
gryd/
├── schemaTypes/        # Content schemas
│   ├── workProject.ts  # Work projects
│   └── playgroundExperiment.ts  # Experiments
├── sanity.config.ts    # Studio configuration
└── sanity.cli.ts       # CLI configuration
```

## Performance Features

### Caching Layers
1. **Browser Cache**: HTTP headers for static assets
2. **Service Worker**: Programmable cache for resources
3. **React Query**: Application-level state management
4. **Sanity Client**: Request-level deduplication

### Image Optimization
- Connection-aware quality adjustment
- WebP format conversion
- Responsive srcSet generation
- Lazy loading with Intersection Observer

### Build Optimization
- Code splitting with React.lazy()
- Bundle analysis with source-map-explorer
- Critical CSS inlining
- Asset compression

## Troubleshooting

### Common Issues

**Port conflicts**
```bash
# Kill processes on ports
lsof -ti:8080 | xargs kill -9
lsof -ti:3333 | xargs kill -9
```

**Sanity authentication**
```bash
cd gryd
npx sanity login
npx sanity projects list
```

**Build failures**
```bash
# Clear all caches
rm -rf node_modules package-lock.json
rm -rf gryd/node_modules gryd/package-lock.json
npm install
cd gryd && npm install
```

**TypeScript errors**
```bash
# Restart TypeScript server in VS Code
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Performance Debugging
```bash
# Bundle analysis
npm run build
npx source-map-explorer 'dist/assets/*.js'

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

## Deployment Checklist

### Pre-Deployment
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] All images have alt text
- [ ] Performance audit (Lighthouse > 90)
- [ ] Schema changes deployed
- [ ] Content is published

### Deployment
```bash
# Automatic via Git
git push origin main

# Manual deployment
npx vercel --prod
```

### Post-Deployment
- [ ] Frontend loads correctly
- [ ] Studio is accessible
- [ ] Images render properly
- [ ] Performance metrics maintained
