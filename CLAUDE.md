# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is an Electron React Boilerplate application built with:

- **Electron** for desktop app framework
- **React 19** with React Router for the UI
- **TypeScript** for type safety
- **Webpack** with custom configuration via ERB (Electron React Boilerplate) build system
- **Jest** for testing

### Project Structure

- `src/main/` - Electron main process code (main.ts, menu.ts, preload.ts, util.ts)
- `src/renderer/` - React renderer process code (App.tsx, index.tsx, App.css)
- `assets/` - Application icons and resources
- `release/` - Build output and packaging configuration
- `.erb/` - Build system configuration (webpack, scripts, DLL bundling)

### Key Components

- **Main Process** (`src/main/main.ts`): Handles window creation, app lifecycle, IPC communication, auto-updater
- **Renderer Process** (`src/renderer/App.tsx`): Simple React app with routing and basic UI
- **Preload Script** (`src/main/preload.ts`): Secure bridge between main and renderer processes
- **Menu Builder** (`src/main/menu.ts`): Application menu configuration

## Development Commands

### Core Development

- `npm start` - Start development environment (builds main process, then starts renderer with hot reload)
- `npm run start:main` - Start main process in watch mode with electronmon
- `npm run start:renderer` - Start renderer development server only

### Building

- `npm run build` - Build both main and renderer for production
- `npm run build:main` - Build main process only
- `npm run build:renderer` - Build renderer process only
- `npm run build:dll` - Build development DLL bundle (for faster dev builds)

### Code Quality

- `npm run lint` - Run ESLint on all TypeScript/JavaScript files
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm test` - Run Jest tests

### Packaging & Distribution

- `npm run package` - Package application for distribution (includes build step)
- `npm run rebuild` - Rebuild native dependencies for Electron

## Build System Notes

The project uses a custom ERB build system with:

- **Webpack configurations** in `.erb/configs/` for different environments and processes
- **DLL bundling** for faster development builds
- **TypeScript compilation** with ts-node for build scripts
- **Hot module replacement** for renderer process during development

The application is built into the `release/` directory structure:

- `release/app/` - Contains packaged application
- `release/build/` - Contains final distributables

## Testing

Tests are configured with Jest and use jsdom environment. Test files should be placed alongside source files or in a `__tests__` directory. The testing setup includes:

- React Testing Library
- Jest DOM matchers
- Module name mapping for static assets
- TypeScript support via ts-jest

## IPC Communication

The app includes a basic IPC example in `main.ts` (`ipc-example` channel) showing communication pattern between main and renderer processes through the preload script.
