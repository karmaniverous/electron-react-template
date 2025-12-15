# Electron React Template

A modern Electron + React starter built on **Electron Forge** and **Vite**, with a batteries-included TypeScript/tooling setup for shipping production desktop apps.

## What you get

### Runtime stack

- **Electron** app with:
  - Main process entry: `src/main.ts`
  - Preload entry: `src/preload.ts`
  - React renderer entry: `src/renderer.tsx` (mounted into `index.html`)
- **React 19** renderer (Vite + `@vitejs/plugin-react`)
- **TypeScript** across main/preload/renderer

### Build, dev, and packaging

- **Electron Forge** (`@electron-forge/cli`) for lifecycle scripts:
  - `npm start` → dev (Forge + Vite dev server)
  - `npm run package` → packaged app (asar)
  - `npm run make` → platform installers/artifacts
  - `npm run publish` → publish flow (requires your own publishing config/credentials)
- **Electron Forge Vite plugin** (`@electron-forge/plugin-vite`) with separate Vite configs:
  - `vite.main.config.ts` (main)
  - `vite.preload.config.ts` (preload)
  - `vite.renderer.config.ts` (renderer)

### Security posture (packaging-time hardening)

- **ASAR enabled** (`packagerConfig.asar: true`)
- **Electron Fuses flipped at package time** via `@electron/fuses` (see `forge.config.ts`) including:
  - `OnlyLoadAppFromAsar: true`
  - `EnableEmbeddedAsarIntegrityValidation: true`
  - Cookie encryption enabled
  - Disables Node CLI inspect/environment hooks in production

This keeps the default template aligned with shipping a hardened binary (while still allowing full dev ergonomics).

### Quality tooling

- **ESLint v9 flat config** (`eslint.config.ts`) with:
  - `typescript-eslint` strict + type-aware rules
  - `eslint-plugin-prettier` to enforce Prettier formatting
  - `eslint-plugin-simple-import-sort` for deterministic import ordering
- **Prettier** (`.prettierrc.json`)
- **Vitest** (`vitest.config.ts`) with example component tests under `src/ui/*.test.tsx`
- **Knip** (`knip.json`) to detect unused files/exports/dependencies

### Release / automation (optional but included)

- **release-it** config in `package.json`:
  - Runs `typecheck`, `lint`, and `package` in release hooks
  - Creates GitHub releases
  - Creates and pushes a `release/<version>` branch after releasing
- **auto-changelog** for changelog generation (`npm run changelog`)

### DX extras

- Node version hints:
  - `.nvmrc` / `.node-version` included (recommended local Node version)
  - `package.json` requires Node `>=20`
- VS Code workspace defaults in `.vscode/` (recommended extensions + formatting/lint settings)
- **Lefthook** installed (see `lefthook.yml` and `.lefthook/` scripts) for optional Git hooks

## Project structure

```text
.
├─ src/
│  ├─ main.ts          # Electron main process
│  ├─ preload.ts       # Preload script (secure IPC surface belongs here)
│  ├─ renderer.tsx     # React entrypoint
│  ├─ index.css        # Renderer styles
│  └─ ui/
│     ├─ App.tsx
│     ├─ Greeting.tsx
│     └─ *.test.tsx
├─ forge.config.ts
├─ vite.*.config.ts
├─ eslint.config.ts
└─ vitest.config.ts
```

## Getting started

### Prerequisites

- Node.js `>= 20` (see `.nvmrc` / `.node-version` for the recommended version)
- npm (or your preferred package manager; this repo uses npm scripts by default)

### Install

```bash
npm install
```

### Run in development

```bash
npm start
```

This launches Electron via Forge and loads the renderer from the Vite dev server.

### Run checks

```bash
# TypeScript (no emit)
npm run typecheck

# Lint (ESLint + Prettier + import sorting)
npm run lint

# Auto-fix lint/format issues where possible
npm run lint:fix

# Tests
npm test

# Unused files/exports/deps
npm run knip
```

### Package / make installers

```bash
# Package the app (creates an unpacked packaged application)
npm run package

# Build distributables (platform-specific makers)
npm run make
```

Makers configured in `forge.config.ts` include:

- Windows: Squirrel
- macOS: ZIP
- Linux: DEB + RPM

## Customizing the template

Common starting points:

- App window behavior: `src/main.ts`
  - The template currently opens DevTools by default (adjust as desired).
- Preload / IPC surface: `src/preload.ts`
  - Prefer exposing a small, explicit API via `contextBridge` and keeping Node/Electron privileges out of the renderer.
- Renderer UI: `src/ui/*` and `src/renderer.tsx`
- Product metadata:
  - `package.json`: `name`, `productName`, `description`, `version`

## Notes

- Windows install/uninstall shortcut handling is enabled via `electron-squirrel-startup` (see `src/main.ts`).
- Electron fuses are flipped during packaging (see `forge.config.ts`). If you change hardening settings, keep dev vs package behavior in mind.

## License

BSD-3-Clause (see `package.json`).

---

Built for you with ❤️ on Bali! Find more great tools & templates on [my GitHub Profile](https://github.com/karmaniverous).
