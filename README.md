## Hotel Booking UI

### Tech
- Next.js App Router (TypeScript)
- React 19
- Zustand for client state (with `persist`)
- Tailwind CSS v4

---

## Features implemented
- Create bookings via a validated form (name, email, dates, guests, room type, optional phone/notes)
- View bookings list and a dedicated detail page
- Deep link detail page: `/booking/[id]`
- Pagination with URL syncing: `?page=&size=`
- Delete booking (detail page shows a not-found state after deletion)
- Persist state in `localStorage`
- Design system tokens (colors, surface, border), utilities and components:
  - Buttons: `btn`, `btn-primary`, `btn-secondary`, `btn-danger`
  - Form controls: `label`, `input`, `select`, `textarea`, `help`, `error`
  - Layout and patterns: `card`, `chip`, `row`, `h1`, `h2`, `page`, `page-header`
- Clear interaction states (hover, focus-visible, active, disabled)
- Day/Night themes with an icon toggle in the header (Sun/Moon). Header colors adapt via CSS vars; default is Day.

---

## Getting started

Requirements: Node 18.18+ or 20+

Install and run:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Root redirects to `/bookings`.

Production:

```bash
npm run build
npm start
```

---

## App structure

Routes:
- `/bookings` — main list with pagination and actions
- `/booking/new` — create a new booking (navigates to the created detail)
- `/booking/[id]` — booking detail page

Key files:
- State
  - `src/store/bookings.ts` — bookings store (create/delete), persisted
  - `src/store/theme.ts` — theme store (`"day" | "night"`, tokens applied via CSS vars)
- UI
  - `src/components/BookingForm.tsx`
  - `src/components/BookingList.tsx`
  - `src/components/BookingDetails.tsx`
  - `src/components/Pagination.tsx`
  - `src/components/BookingsSection.tsx` (list + pagination with URL sync)
  - `src/components/PageHeader.tsx`, `src/components/HeaderNav.tsx`
  - `src/components/ThemeToggle.tsx`, `src/components/ThemeApply.tsx`
- Styling
  - `src/app/globals.css` — design tokens (CSS variables), utilities, and component classes
 - Routing/context
  - `src/contexts/BookingIdContext.tsx` — provides `bookingId` from the route to client components

---

## State shape (bookings)

```ts
type RoomType = "standard" | "deluxe" | "suite";
interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone?: string;
  guests: number;
  roomType: RoomType;
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  notes?: string;
  createdAt: string; // ISO
}
```

Persistence: bookings are saved in `localStorage` under the key `hotel-bookings`.

---

## Design system reference

Tokens (CSS variables):
- Background, foreground, primary, secondary, danger, surface, border
- Theme-scoped header tokens: `--header-bg`, `--header-fg`, `--header-border`

Utilities/components:
- Buttons: `btn`, `btn-primary`, `btn-secondary`, `btn-danger`
- Inputs: `label`, `input`, `select`, `textarea`, `help`, `error`
- Layout: `card`, `chip`, `row`
- Typography/spacing: `h1`, `h2`, `page`, `page-header`, `subtle`

Interaction states (global):
- Buttons: focus-visible ring, hover darken, active translate, disabled opacity/cursor
- Inputs: hover border, strong focus ring, error ring (via `aria-invalid`), disabled styles
- Rows: hover background and pressed translate

---

## Themes (Day/Night)
- Theme store: `src/store/theme.ts` with `"day" | "night"` and `toggle()`
- Apply current theme to the DOM: `src/components/ThemeApply.tsx` (sets `data-theme`)
- Toggle control: `src/components/ThemeToggle.tsx` (Sun/Moon icon button in header)
- CSS tokens are defined per theme in `src/app/globals.css` (`[data-theme="day"]`, `[data-theme="night"]`)

---

## Pagination
- Client-side pagination with URL query sync.
- Controls live in `Pagination.tsx`.
- Data slicing is handled by `BookingList` via `page` and `pageSize` props.

---

## Assumptions & notes
- Data is client-only (no backend). Zustand persists to `localStorage`.
- Selection is route-driven (`/booking/[id]`), not list-state driven.
- IDs use `uuid` (npm package); no server IDs.
- Tailwind v4 with custom CSS tokens; header colors read CSS vars for theme.
- I used Cursor AI for it.

## Time spent 
 - 3 hours approximately 