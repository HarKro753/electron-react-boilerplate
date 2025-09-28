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
- `src/renderer/` - React renderer process code with organized folder structure:
  - `pages/` - Main application pages and routes
  - `components/` - Reusable React components
  - `Widgets/` - Small UI widgets and form elements
  - `Templates/` - Layout templates and higher-order components
  - `hooks/` - Custom React hooks
  - `context/` - React context providers
  - `models/` - TypeScript type definitions and interfaces
  - `api/` - API client functions and external service integrations
  - `repository/` - Data access layer and business logic
- `assets/` - Application icons and resources
- `release/` - Build output and packaging configuration
- `.erb/` - Build system configuration (webpack, scripts, DLL bundling)

#### Renderer Folder Details

- **`pages/`** - Top-level application views and routes. Contains the main screens users navigate to.
- **`components/`** - Reusable React components like AppBar, ChatWindow, PatientData, etc.
- **`Widgets/`** - Small, focused UI elements like buttons, cards, checkboxes, and form controls.
- **`Templates/`** - Layout components and wrappers that provide structure to pages and sections.
- **`hooks/`** - Custom React hooks for shared logic like useAudioLevels, useChat, etc.
- **`context/`** - React context providers for global state management.
- **`models/`** - TypeScript interfaces and type definitions for data structures.
- **`api/`** - Functions for external API calls and service integrations.
- **`repository/`** - Data access layer containing business logic and data retrieval functions.

### Key Components

- **Main Process** (`src/main/main.ts`): Handles window creation, app lifecycle, IPC communication, auto-updater
- **Renderer Process** (`src/renderer/App.tsx`): React app with routing and navigation between pages
- **Preload Script** (`src/main/preload.ts`): Secure bridge between main and renderer processes
- **Menu Builder** (`src/main/menu.ts`): Application menu configuration

#### Main Application Pages

- **MainPage** (`src/renderer/pages/MainPage.tsx`): Primary patient management interface with patient list, patient info display, document viewer, and integrated chat window. Features patient selection, document organization, and AI assistant integration.
- **SprechstundeAssistent** (`src/renderer/pages/SprechstundeAssistent.tsx`): Audio recording and analysis interface for consultation sessions. Includes microphone selection, real-time audio level visualization, recording controls, and analysis configuration for different consultation types.
- **SprechstundeVorlage** (`src/renderer/pages/SprechstundeVorlage.tsx`): Template page for consultation workflows (currently minimal implementation).

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
