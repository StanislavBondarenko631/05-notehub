# 📝 NoteHub Application

**NoteHub** is a modern React application designed for managing personal notes, featuring complete CRUD capabilities including note creation, deletion, pagination, and keyword filtering. The project is built on the **React + TypeScript + Vite** stack, utilizing advanced libraries for server-state management, form validation, and user interface component synchronization.

---

## 🚀 Key Features

- **REST API Integration:** Fully connected to a remote backend service using secure `Bearer` token authentication.
- **Server-State Management (TanStack Query):** Efficient data caching, automated cache invalidation upon mutations, and seamless page transitions without UI flickering.
- **Live Search with Debounce:** Input-driven note filtering optimized using `use-debounce` to eliminate redundant API requests while typing.
- **Reactive Pagination:** Page-by-page collection management built with the `react-paginate` library.
- **Robust Forms:** Secure note submission utilizing `Formik` coupled with strict schema validation powered by `Yup`.
- **Accessible Modals:** A reusable modal window architecture implemented via `createPortal`, supporting seamless dismissals via the `Escape` key and backdrop clicks.
- **Status Indicators:** Custom animated CSS spinners for active network requests, along with informative error views and empty-state placeholders.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript (Strictly Typed)
- **Build Tool:** Vite
- **Data Fetching:** TanStack Query v5 (React Query)
- **HTTP Client:** Axios
- **Forms & Validation:** Formik + Yup
- **Styling:** CSS Modules + `modern-normalize`
- **Utility Packages:** `react-paginate`, `use-debounce`, `react-hot-toast`

---

## 🏗️ Architecture & Refactoring

The application architecture strictly adheres to production standards, establishing a clean **Separation of Concerns**:

1. **Global Types (`src/types/`):** Core application entities (`Note`, `NoteTag`) are declared in isolated type files, strictly matching the server's expected casing schema (`'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'`).
2. **Presentational Components:** Structural layout blocks, such as `NoteList`, operate as purely "dumb" components. They accept clean data arrays via props and contain zero fetching side-effects, ensuring maximum reusability.
3. **State Management in Containers:** All core business logic, active queries, and layout states are handled at the root level within the main `App.tsx` container.
4. **UX Optimization (`placeholderData`):** Integrated `keepPreviousData` mechanics inside queries to keep old data visible while loading new pages, preventing layout jumps and flickering.

---

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com
cd react-notehub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory of your project and append your personal authorization token:

```env
VITE_NOTEHUB_TOKEN=your_personal_bearer_token_here
```

### 4. Run the app in development mode

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```
