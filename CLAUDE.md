# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
nuxt dev          # Start dev server
nuxt build        # Build for production
nuxt generate     # Static site generation
nuxt preview      # Preview production build
nuxt prepare      # Generate Nuxt types (runs automatically post-install)
```

No dedicated test or lint commands are configured in `package.json`. Lint uses `@antfu/eslint-config`.

## Environment Setup

Copy `.env.example` to `.env` and fill in:
```
NUXT_MONGODB_URI=''   # MongoDB connection string
NUXT_SECRET_KEY=''    # JWT secret for auth tokens
```

## Architecture

**Postoko** is a Nuxt 3 inventory/point-of-sale app ("Puppet") using:
- **UI**: Quasar v2 (q-table, q-dialog, q-btn, q-notify, q-loading)
- **State**: Vuex 4 with vuex-persist (AES-encrypted cookies)
- **Backend**: Nuxt Nitro server with MongoDB/Mongoose
- **Auth**: @sidebase/nuxt-auth (JWT)

### Store Pattern

Every domain module under `store/[module]/` follows this exact structure:
```
state.ts → mutations.ts → actions.ts → getters.ts → index.ts
```
Actions use `useFetch` to call the API, commit mutations for loading/data/errors, and call `showNotify`/`showErorrDialog` from `utils/` for UI feedback.

### API Route Pattern

Server routes live in `server/api/[resource]/` with HTTP method suffixes:
- `index.ts` → GET all
- `index.post.ts` → POST create
- `[id].ts` → GET by ID
- `[id].put.ts` → PUT update
- `index.delete.ts` → DELETE

All API handlers return `ApiResponse<T, K>` from `server/types/`.

### Page Pattern

Pages use `<script setup>` with TypeScript. Protected pages declare:
```ts
definePageMeta({ middleware: "auth" })
```
Layouts: `default.vue` (with sidebar/header) or `empty.vue` (login). Form state lives in the Vuex module — pages dispatch actions and read state via `computed()` from store getters.

### Permissions

`utils/hasPermissions.ts` checks activity-based permissions (view/create/edit/delete). The `ActivityPermissions` component and the store `activity` module manage which menu items and actions are accessible per user role.

### Adding a New Module

Follow the pattern of an existing module (e.g., `satuan` or `produk`):
1. `server/models/[Model].ts` — Mongoose schema
2. `server/api/[resource]/` — CRUD route files
3. `store/[module]/` — state, mutations, actions, getters, index
4. `pages/[section]/[module]/` — list page + form page
5. Register the store module in `plugins/vuex.ts`
