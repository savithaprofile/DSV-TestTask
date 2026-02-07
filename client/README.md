# DSV React CRUD - Frontend

This is the frontend client for the DSV React CRUD application, built with **React**, **TypeScript**, **Vite**, and **Material-UI (MUI)**.

## Features

- **Dynamic Forms & Tables**: UI is generated from a central schema (`userFormSchema.ts`), allowing for easy extensibility.
- **Validation**: Comprehensive form validation using configuration rules.
- **Responsive Design**: Clean and modern UI that works on all devices.
- **State Management**: React Hooks (`useState`) for local state management.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The application will run at [http://localhost:5173](http://localhost:5173).

### Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Extensibility Guide

The application is designed to be easily extensible. To add a new field to the User entity (e.g., "Address" or "Date of Birth"), you **only** need to modify the schema configuration.

### How to Add a New Field

1. Open `src/schemas/userFormSchema.ts`.
2. Add a new field object to the `userFormSchema` array.

**Example: Adding an "Address" field**

```typescript
export const userFormSchema: FormField[] = [
  // ... existing fields
  {
    name: "address",           // API/Model field name
    label: "Address",          // UI Label
    type: "text",              // Input type: "text" | "email" | "tel" | "date"
    required: false,           // Is it mandatory?
    helperText: "Enter your full address", // Helper text
  },
];
```

**That's it!** The "Address" field will automatically appear in:
- The **Add User Form** (with validation if `required: true`).
- The **User List Table** (as a new column).
- The **Edit User Mode** (as an editable input).

## Project Structure

```
src/
├── components/
│   └── users/
│       ├── UserForm.tsx    # Dynamic form component
│       └── UserTable.tsx   # Dynamic table component
├── schemas/
│   └── userFormSchema.ts   # Central configuration for fields
├── services/
│   └── userService.ts      # API calls (Axios)
├── types/
│   └── user.ts             # TypeScript interfaces
├── App.tsx                 # Main layout
└── main.tsx                # Entry point
```
