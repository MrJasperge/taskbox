# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Start Vite dev server
npm run build          # Production build
npm run storybook      # Start Storybook on port 6006
npm run build-storybook # Build static Storybook
npm run chromatic      # Deploy to Chromatic for visual testing
npx vitest             # Run all tests (story-based, via Playwright/Chromium)
```

Linting uses ESLint 9 — run via `npx eslint src/`.

## Architecture

This is a React + Redux task management app ("Taskbox") built with Storybook as the primary development environment.

**State**: Redux Toolkit (`src/lib/store.ts`) with a single `taskbox` slice. Tasks have three states: `TASK_INBOX`, `TASK_PINNED`, `TASK_ARCHIVED`. Data is fetched from a remote API via `createAsyncThunk`; the slice tracks `status: idle | loading | succeeded | failed`.

**Components** (`src/components/`): Follow a presentational/container split — `Task` and `TaskList` are pure presentational; `InboxScreen` is the container that dispatches the fetch thunk and reads Redux state.

**Testing**: Tests are story-based — no separate `.test.ts` files. Vitest runs stories as tests via `@storybook/addon-vitest` in a headless Chromium browser. Stories are colocated with components as `*.stories.tsx`.

**Mocking**: MSW is used in Storybook (`.storybook/preview.ts`) to intercept API calls with fixture data, keeping stories self-contained.

**Types**: Core domain type `TaskData` is defined in `src/types.ts`.
