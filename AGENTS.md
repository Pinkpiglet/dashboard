# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this NetBird dashboard repository.

## Build & Development Commands

### Core Commands

- `npm run dev` - Start development server on port 3000
- `npm run turbo` - Start development server with Turbo mode
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run cypress:open` - Open Cypress test runner

### Testing Commands

- **Single test**: `node src/utils/version.test.ts` - Run version utility tests
- **Cypress**: `npm run cypress:open` - Interactive test runner
- Note: This project uses custom test runners rather than standard Jest/Vitest

### Copy Commands

- `npm run copy` - Copy OIDC service worker files
- `npm run copytrusted` - Copy trusted domains configuration

## Code Style Guidelines

### Import Organization

- Uses `simple-import-sort` ESLint plugin for automatic import sorting
- Import order groups:
  1. Side-effect imports (starting with `\u0000`)
  2. External libraries (starting with `@` or word characters)
  3. Internal modules (starting with anything except `.`)
  4. Relative imports (starting with `.`)
- Example:

```typescript
import { useEffect } from "react";
import { useOidc } from "@axa-fr/react-oidc";
import loadConfig from "@utils/config";
import { useApplicationContext } from "@/contexts/ApplicationProvider";
import "./styles.css";
```

### TypeScript Configuration

- Strict mode enabled
- Path aliases configured:
  - `@/*` → `./src/*`
  - `@components/*` → `./src/components/*`
  - `@hooks/*` → `./src/hooks/*`
  - `@utils/*` → `./src/utils/*`
  - `@config/*` → Various config files

### Component Patterns

- Use `forwardRef` for components that need ref forwarding
- Implement `displayName` for all components
- Use `class-variance-authority` (cva) for component variants
- Default props pattern with destructuring
- Example component structure:

```typescript
"use client";

import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Custom props
}

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant }), props.className)}
        {...props}
      />
    );
  }
);

Component.displayName = "Component";
export default Component;
```

### Styling Guidelines

- **Tailwind CSS** primary styling approach
- **Dark mode**: Uses `class` strategy with `dark:` prefixes
- **Custom colors**:
  - `nb-gray/*` - Gray scale palette
  - `netbird/*` - Brand orange colors
  - `nb-blue/*` - Blue accent colors
- **Utility function**: Use `cn()` from `@utils/helpers` for class merging
- **Component variants**: Use `class-variance-authority` for consistent variant patterns

### State Management

- **Context providers**: Use React Context for global state
- **Data fetching**: SWR for API calls with caching and revalidation
- **Provider pattern**: Create context with default value, export custom hook
- **Internationalization**: Use `LanguageProvider` for i18n with `useLanguage` hook
- **Translation function**: `t("key", "fallback")` for all UI text
- **Language toggle**: `SimpleLanguageToggle` component for switching EN/ZH
- **Supported languages**: English (en), Chinese (zh)
- Example:

```typescript
import { useLanguage } from "@/contexts/LanguageProvider";

const Context = React.createContext<{ value: T }>({ value: null });

export const useCustom = () => React.useContext(Context);

// For translations
const { t, currentLanguage, setLanguage } = useLanguage();
const translatedText = t("common.save", "Save");
```

### API Integration

- **Base API**: Custom `useFetchApi` hook built on SWR
- **Authentication**: OIDC with `@axa-fr/react-oidc`
- **Error handling**: Centralized error boundary context
- **Request structure**: Uses `apiRequest` function with method typing

### File Naming & Structure

- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`, `LanguageSwitcher.tsx`)
- **Utilities**: camelCase (e.g., `helpers.ts`, `api.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAccount.tsx`)
- **Contexts**: PascalCase with `Provider` suffix (e.g., `UsersProvider.tsx`, `LanguageProvider.tsx`)
- **Types**: Co-located with components or in dedicated `interfaces/` directory

### Error Handling

- **Boundaries**: React Error Boundary for component errors
- **API errors**: Centralized error handling in API layer
- **User feedback**: Toast notifications for user-facing errors
- **Validation**: Client-side validation with custom validator utilities

### Performance Guidelines

- **Code splitting**: Next.js automatic splitting, dynamic imports for large components
- **Image optimization**: Next.js Image component (unoptimized in static export)
- **Bundle analysis**: Monitor bundle size, avoid large dependencies
- **React optimization**: Use `React.memo`, `useMemo`, `useCallback` where appropriate

### Security Considerations

- **Authentication**: OIDC with proper token management
- **Environment variables**: Use Next.js env for sensitive data
- **Input validation**: Client-side validation with regex patterns
- **XSS prevention**: React's built-in XSS protection, avoid `dangerouslySetInnerHTML`

## Development Workflow

1. **Before committing**: Run `npm run lint` to ensure code quality
2. **Component development**: Follow established patterns from existing components
3. **API integration**: Use existing `useFetchApi` hook and error handling patterns
4. **Styling**: Use Tailwind with custom color palette, avoid inline styles
5. **Testing**: Write custom test runners following the `version.test.ts` pattern

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + custom design system
- **UI Components**: Radix UI primitives + custom components
- **State**: React Context + SWR for server state
- **Authentication**: OIDC with @axa-fr/react-oidc
- **Build**: Static export configuration
- **Linting**: ESLint with Next.js + Prettier + simple-import-sort
