# DSV React CRUD Application

A simple, extensible React-based CRUD application for managing user data. This project is built with React (Vite), TypeScript, Node.js, Express, and MongoDB.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete users.
- **Form Validation**: Validation for required fields and data formats (Email, Phone).
- **Extensible Architecture**: 
  - The UI is configuration-driven using a central schema (`userFormSchema.ts`).
  - Adding a new field (e.g., "Address") only requires updating the schema; the Form and Table update automatically.
- **Modern UI**: Built with Material-UI (MUI).
- **Responsive Design**: Adapts to different screen sizes.

## Project Structure

```
/
├── backend/          # Node.js/Express Backend
│   ├── models/       # Mongoose Models
│   ├── routes/       # API Routes
│   └── server.js     # Entry point
└── client/           # React Frontend
    ├── src/
    │   ├── components/
    │   ├── schemas/  # Configuration schemas for forms/tables
    │   └── types/    # TypeScript interfaces
```

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (Running locally or Compass/Atlas URI)

### 1. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (if not exists) and add your MongoDB URI:
   ```env
   PORT=5005
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/dsv_react_crud?retryWrites=true&w=majority
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5005`.

### 2. Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Extensibility Guide

To add a new field (e.g., "City"):

1. Open `client/src/schemas/userFormSchema.ts`.
2. Add a new object to the `userFormSchema` array:
   ```typescript
   {
     name: "city",
     label: "City",
     type: "text",
     required: true,
     helperText: "Enter city name",
   }
   ```
3. (Optional) Update the `User` interface in `client/src/types/user.ts` and the Backend Mongoose Model `backend/models/User.js` to persist the new field.

**No changes are required in `UserForm.tsx` or `UserTable.tsx` components!**

## Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder.

### Backend (Render/Heroku/Railway)
1. Deploy the `backend` folder.
2. Set environment variables (`MONGO_URI`, `PORT`) in the hosting platform.

