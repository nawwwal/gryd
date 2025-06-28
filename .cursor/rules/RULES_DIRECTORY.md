# THE GRYD Cursor Rules Directory

## Overview
This document lists all Cursor rules for THE GRYD magazine project, their descriptions, and when the AI agent should request them. All rules are set to `alwaysApply: false` and use agent-requested activation based on context relevance.

---

## 📁 Root Level Rules (`.cursor/rules/`)

### `magazine-design-philosophy.mdc`
THE GRYD magazine's design philosophy, creative vision, and aesthetic principles. Request for questions about design decisions, visual language, magazine aesthetics, interaction patterns, typography choices, or creative direction.

### `development-environment.mdc`
Development environment setup, commands, and project structure for THE GRYD. Request when setting up the project, development workflows, build processes, troubleshooting, project architecture questions, or environment configuration.

### `content-strategy.mdc`
Editorial voice, content strategy, and writing guidelines for THE GRYD magazine. Request for content creation, editorial decisions, writing style, magazine sections, button copy, SEO strategies, or brand voice questions.

### `mdx-content-system.mdc`
MDX system architecture, data flow, and frontend integration for THE GRYD magazine. Request for system architecture questions, React-Sanity integration, performance optimization systems, caching strategies, or content rendering pipeline.

### `sanity-cms-setup.mdc`
Sanity CMS infrastructure, studio configuration, and operational setup for THE GRYD. Request for CMS configuration, studio deployment, GROQ queries, API integration, security settings, or backend infrastructure operations.

### `deployment-workflow.mdc`
Deployment workflow for THE GRYD magazine including deployment procedures, production setup, environment variables, rollback procedures, or publishing workflows. **Note**: Manual rule - use `@deployment-workflow` to explicitly invoke.

---

## 📁 Component-Specific Rules (`src/components/.cursor/rules/`)

### `component-standards.mdc`
React component development standards, magazine design patterns, and performance guidelines for THE GRYD. Request when creating React components, component architecture, magazine design patterns, performance optimization, or component best practices.

---

## 📁 Styling Rules (`src/styles/.cursor/rules/`)

### `styling-system.mdc`
CSS styling system, magazine typography, paper texture effects, and responsive design patterns for THE GRYD. Request for CSS development, styling decisions, typography implementation, responsive design, magazine visual effects, or layout questions.

---

## 📁 Hooks Rules (`src/hooks/.cursor/rules/`)

### `custom-hooks.mdc`
Custom React hooks development patterns, magazine-specific functionality, and performance optimization for THE GRYD. Request when creating custom hooks, React state management, magazine-specific functionality, or hook architecture decisions.

### `mobile-optimization.mdc`
Mobile optimization strategies, touch interactions, connection-aware loading, and magazine mobile experience for THE GRYD. Request for mobile development, touch interactions, responsive design, performance optimization for mobile, or mobile-specific magazine features.

---

## 📁 Page Rules (`src/pages/.cursor/rules/`)

### `page-development.mdc`
Page component architecture, SEO optimization, magazine layout principles, and content strategy implementation for THE GRYD. Request when creating page components, SEO implementation, page structure, magazine layout, or routing decisions.

---

## 📁 MDX Rules (`src/components/mdx/.cursor/rules/`)

### `content-blocks.mdc`
MDX content blocks implementation and usage for THE GRYD magazine. Request when implementing MDX content blocks, rich content features, interactive components, or content block customization.

---

## 📁 Sanity Rules (`gryd/.cursor/rules/`)

### `sanity-schemas.mdc`
Sanity schema development, content type definition, rich content blocks, and validation patterns for THE GRYD. Request when creating Sanity schemas, content type definitions, validation rules, studio configuration, or backend content structure.

---

## 📁 Utils Rules (`src/utils/.cursor/rules/`)

### `performance-optimization.mdc`
Performance optimization utilities, caching strategies, image optimization, and service worker implementation for THE GRYD. Request for performance optimization, caching implementation, image handling, service workers, or utility function development.

### `content-workflows.mdc`
Content management workflows, optimization strategies, and performance patterns for THE GRYD. Request for content management processes, workflow optimization, content quality validation, backup strategies, or content migration.

---

## 📁 Template Files (`.cursor/rules/templates/`)

### Reference Templates
- `component-template.tsx` - React component template with magazine patterns
- `hook-template.tsx` - Custom hook template with proper TypeScript
- `page-template.tsx` - Page component template with SEO and layout
- `style-template.css` - CSS stylesheet template with magazine effects
- `mobile-template.tsx` - Mobile-optimized component template
- `magazine-examples.css` - Magazine design effect examples and implementations
- `content-examples.md` - Editorial voice and content strategy examples
- `development-setup.md` - Complete development environment guide
- `content-block-examples.tsx` - MDX content block implementations
- `workflow-examples.ts` - Content management utility implementations

---

## 🎯 Agent Request Guidelines

### High-Priority Rules (Frequently Relevant)
- `magazine-design-philosophy.mdc` - Core to all design decisions
- `component-standards.mdc` - Essential for React development
- `styling-system.mdc` - Critical for any visual implementation

### Context-Specific Rules
- `mobile-optimization.mdc` - When working on mobile features
- `content-blocks.mdc` - When implementing rich content
- `sanity-schemas.mdc` - When working with CMS structure
- `performance-optimization.mdc` - When addressing performance issues

### Workflow Rules
- `development-environment.mdc` - For setup and troubleshooting
- `content-strategy.mdc` - For editorial and content decisions
- `content-workflows.mdc` - For content management processes

### Infrastructure Rules
- `mdx-content-system.mdc` - For system architecture questions
- `sanity-cms-setup.mdc` - For CMS configuration and management
- `deployment-workflow.mdc` - For production deployment (manual)

---

## 🔄 Rule Activation Strategy

The AI agent should request rules based on:

1. **File Context**: Automatically consider rules based on current file location
2. **Question Type**: Match question intent to relevant rule descriptions
3. **Technical Domain**: Include domain-specific rules (React, CSS, CMS, etc.)
4. **Project Phase**: Development vs. deployment vs. content creation
5. **Complexity**: Simple questions may need fewer rules, complex issues may need multiple

### Example Activation Scenarios

**Creating a new React component:**
- `component-standards.mdc` (primary)
- `magazine-design-philosophy.mdc` (design guidance)
- `styling-system.mdc` (if styling involved)

**Mobile optimization question:**
- `mobile-optimization.mdc` (primary)
- `performance-optimization.mdc` (performance aspects)
- `component-standards.mdc` (component patterns)

**Content management workflow:**
- `content-workflows.mdc` (primary)
- `sanity-cms-setup.mdc` (CMS aspects)
- `content-strategy.mdc` (editorial guidance)

---

## 📊 Rule Metrics

- **Total Rules**: 11 agent-requested + 1 manual
- **Average Rule Size**: ~200-350 lines (optimized, well under 500-line target)
- **Template Files**: 10 reference implementations
- **Coverage Areas**: Design, Development, Content, Performance, Mobile, CMS
- **Overlap Status**: ✅ Eliminated duplicated content across rules

## 🔄 Recent Refactoring (2024)

**Eliminated Content Overlap:**
- **Rich Content Blocks**: Moved detailed implementations to `@content-blocks`
- **Content Workflows**: Moved detailed processes to `@content-workflows`
- **Schema Patterns**: Moved development patterns to `@sanity-schemas`

**Improved Focus:**
- `sanity-cms-setup.mdc` → CMS infrastructure and configuration
- `mdx-content-system.mdc` → System architecture and integration
- Domain rules → Specific implementation details

This distributed system ensures the AI gets precisely the right context for any question while maintaining THE GRYD's unique magazine aesthetic and technical standards.
