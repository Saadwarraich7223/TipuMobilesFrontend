# Project Context (Frontend)

## Purpose
React + Vite frontend for an e-commerce app. The current focus is a premium redesign with glassmorphism surfaces, pastel gradients, and refined micro-interactions.

## Redesign Status
- Design direction: glassmorphism + soft gradients + refined typography + subtle motion.
- Core reference: `REDESIGN_TODO.md` (phased checklist).
- Already redesigned: `src/components/common/ProductCard/ProductCard.jsx` (surface-raised card, hover quick add, simplified price, Lucide icons, Framer Motion image transitions).
- In progress / next: `src/components/common/CategorySlider/CategorySlider.jsx`, section containers, product details page, listing page, cart sidebar, checkout, profile/orders, footer, global transitions.

## Tech Stack
- React 19 + Vite 6
- React Router 7
- Redux Toolkit + React Redux
- TanStack React Query v5
- Tailwind CSS v4 via `@tailwindcss/vite`
- Axios for API calls
- UI libs: Framer Motion, Swiper, lucide-react, react-hot-toast, react-spinners, styled-components

## Scripts
- `npm run dev` - Vite dev server
- `npm run build` - Vite production build
- `npm run preview` - Vite preview server
- `npm run lint` - ESLint

## Environment
- `.env` uses `VITE_BACKEND_URL` (currently `http://localhost:3000`)

## App Entry + Initialization
- Entry: `src/main.jsx`
- Providers: React Query, Redux, React Router
- `src/App.jsx` on mount:
  - Applies theme (`applyTheme(getStoredTheme())`).
  - Initializes auth (`fetchProfile()`) and cart (`fetchCart()` or `initializeCart()` based on `cartToken`).
  - Renders `Toaster`, `ScrollToTop`, and routes.

## Routing
Routes in `src/routes/AppRoutes.jsx` using lazy loading with `Suspense`.
- Main layout (`src/layouts/MainLayout.jsx`): `/`, `/product/:id`, `/products/*`
- Bottom nav layout (`src/layouts/BottomNavLayout.jsx`): `/cart`, `/checkout`, `/order-submitted`, `/profile/*`, `/login`, `/register`
- Auth layout (`src/layouts/AuthLayout.jsx`): `/verifyAccount`, `/reset-password`
- Protected routes via `ProtectedRoute` with `authOnly` flag.

## State Management
- Store: `src/store/store.js`
- Slices:
  - `authSlice`: user profile, login/logout, wishlist, avatar/profile updates.
  - `cartSlice`: cart CRUD, cart token handling.
  - `uiSlice`: UI state (sidebars, etc.).
- Tokens stored in `localStorage`.

## Data Layer
- Axios client: `src/api/axiosClient.js`
  - Base URL from `VITE_BACKEND_URL`
  - Adds `x-cart-token` + `Authorization` headers if present
  - Response interceptor unwraps `response.data`
- API modules in `src/api/*`
- Query hooks in `src/queries/*`

## Styling + Themes
- Global styles in `src/index.css` with Tailwind v4 `@import "tailwindcss";`
- Theme tokens for glassmorphism + gradients in CSS variables.
- Theme system in `src/theme/themes.js` (themes: `atelier`, `slate`, `bloom`).
- Theme applied by setting `data-theme` on `documentElement`.
- Base font: "Montserrat" (assumed loaded elsewhere).
- Helper classes: `surface-raised`, `glass`, `text-gradient`, background grid/blobs.

## Structure (Key Directories)
- `src/api` - axios API wrappers
- `src/components` - UI components
- `src/pages` - route-level pages
- `src/layouts` - layout wrappers
- `src/queries` - React Query hooks
- `src/store` - Redux store + slices
- `src/hooks` - custom hooks
- `src/routes` - router setup
- `src/utlis` - utility helpers (note: folder name is `utlis`)
- `public` - static assets

## Notable Notes / Known Gaps
- `src/components/checkout/PaymentMethod.jsx` is empty (0 bytes).
- README is still the default Vite template.
