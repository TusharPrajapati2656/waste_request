# Project Architecture & Engineering Guidelines

These custom instructions are permanent rules for the entire GreenCycle Waste Portal project. All agents, developers, and tools working on this codebase must strictly adhere to these 5 core tenets.

---

## 1. Follow the DRY (Don't Repeat Yourself) Principle
- **No Duplicate Logic or UI**: Avoid repeating identical markup, calculations, or status pipelines. If a pattern, validation, or component is used in two or more places, extract it into a reusable helper, hook, or shared component.
- **Centralized Data Stores & Constants**:
  - Always use centralized stores (such as [`requestStore.js`](file:///d:/Waste%20Portal/Tushar_Phase1/New%20folder/WasteRequest/src/services/requestStore.js)) as the single source of truth for request status, volume, quantities, and timelines.
  - Common status definitions (colors, steps, descriptions, labels) belong to [`STATUS_MAP`](file:///d:/Waste%20Portal/Tushar_Phase1/New%20folder/WasteRequest/src/services/requestStore.js).
- **Design Tokens & Units**:
  - Never hardcode arbitrary styling colors or unmanaged scales. Use the CSS variables defined in [`global.css`](file:///d:/Waste%20Portal/Tushar_Phase1/New%20folder/WasteRequest/src/style/global.css) (`var(--primary)`, `var(--container-width)`, `var(--radius-md)`, etc.).
  - Sizing is scaled via `rem` (`1rem = 8.5px` at `53.125%` root). Maintain container max-width at `1440px`.

---

## 2. Strict Separation of Concerns (UI, Data, Logic & Auth in Separate Files)
Always decouple components into distinct single-responsibility layers:

| Layer | Responsibility | Location & Naming | Example Files |
| :--- | :--- | :--- | :--- |
| **UI (Presentational)** | Pure JSX rendering, layout, styling, accessibility | `<page>/components/` or `<page>/views/` | `HeroSection.jsx`, `TrackRequestCard.jsx`, `OrganizerRequestCard.jsx` |
| **Data (Static / Config)** | Mock data, static arrays, category lists, rates, FAQs | `<page>/data/` or `common/*/Data.js` | `homeData.jsx`, `FooterData.js`, `HeaderData.js`, `organizerData.js`, `trackData.js` |
| **Logic (Hooks & Handlers)**| State, validation, filtering, user input calculations | `<page>/hooks/` (`use<Feature>.js`) | `useEstimator.js`, `useServicesBooking.js`, `useTrackRequests.js`, `useOrganizerDashboard.js` |
| **Auth & Storage Services** | Session auth, localStorage persistence, event dispatch | `services/` or `<page>/services/` | `requestStore.js`, `adminAuthStore.js`, `adminFleetStore.js`, `adminAuditStore.js` |

*Rule:* Components should primarily consume hooks and data rather than having massive 300+ line blocks of inline business logic, hardcoded arrays, and storage access embedded directly inside the JSX render tree.

---

## 3. Strict & Proper Folder Structure
The codebase follows a modular feature-folder structure under `src/`:

```
src/
├── assets/           # Media, brand icons, and 3D illustrations
│   └── image/
├── common/           # Universal, cross-cutting components (Header, Footer, Auth, Modals)
│   ├── header/       # Header.jsx, Header.css, HeaderData.js, AuthModal.jsx, AuthModal.css
│   └── Footer/       # Footer.jsx, Footer.css, FooterData.js
├── pages/            # Feature-specific page domains
│   ├── home/         # Landing page feature
│   │   ├── components/   # HeroSection, ServicesSection, AboutSection, etc.
│   │   ├── data/         # homeData.jsx
│   │   ├── hooks/        # useEstimator.js, useServicesBooking.js, useContactForm.js, useFaq.js
│   │   ├── Home.jsx      # Page root
│   │   └── Home.css      # Page styles
│   ├── organizer/    # Organizer / Dispatcher Dashboard
│   │   ├── components/   # OrganizerBanner, OrganizerControls, OrganizerRequestsList, etc.
│   │   ├── data/         # organizerData.js
│   │   ├── hooks/        # useOrganizerDashboard.js
│   │   ├── OrganizerDashboard.jsx
│   │   └── OrganizerDashboard.css
│   ├── track/        # Citizen Request Tracking
│   │   ├── components/   # TrackHeader, TrackFilterTabs, TrackRequestCard, TrackStepper, etc.
│   │   ├── data/         # trackData.js
│   │   ├── hooks/        # useTrackRequests.js
│   │   ├── TrackRequests.jsx
│   │   └── TrackRequests.css
│   ├── admin/        # Admin Portal
│   │   ├── components/   # AdminSidebar, AdminTopbar, AdminRequestModal, etc.
│   │   ├── views/        # AdminOverviewView, AdminRequestsView, AdminFleetView, etc.
│   │   ├── services/     # adminAuthStore, adminFleetStore, adminAuditStore, adminSettingsStore
│   │   ├── AdminApp.jsx
│   │   └── AdminDashboard.css
│   └── Legal.jsx     # Terms & Privacy policies
├── services/         # Global application services & stores (requestStore.js)
├── style/            # Global stylesheet, design system tokens, CSS reset (global.css)
├── App.jsx           # Main routing & scroll manager
└── main.jsx          # React DOM root entry
```

---

## 4. Keep Common Components in the `common/` Folder
- Any component, navigation element, modal, or layout wrapper shared across more than one page belongs in `src/common/` (e.g. `Header`, `Footer`, `AuthModal`).
- Feature pages must import common elements from `../../common/...` instead of re-implementing them.
- If a new global widget or modal is built (e.g. global alert, theme toggle, feedback banner), place it in `src/common/<ComponentName>/`.

---

## 5. Keep Page Components in their Own Dedicated Folder
- Every page has its own dedicated directory inside `src/pages/<page-name>/`.
- Subcomponents that belong exclusively to that page must live in `src/pages/<page-name>/components/`.
- Page-level CSS files must live alongside the page in `src/pages/<page-name>/<PageName>.css` or be scoped to their specific component.
- Never scatter page-specific helper components or child views across unrelated folders or into `src/` root.
