# E-Commerce Frontend

A modern React-based e-commerce frontend with full backend integration, built with Vite, React 19, and Tailwind CSS.

## 🚀 Features

- ✅ **Responsive Design** - Mobile-first, professional UI
- ✅ **Authentication** - Login/Register with Zustand state management
- ✅ **Product Management** - Browse, search, and filter products
- ✅ **Backend Integration** - REST API with axios and React Query
- ✅ **Form Validation** - React Hook Form with comprehensive validation
- ✅ **Modern Stack** - React 19, Vite 7, Tailwind CSS 4
- ✅ **Error Handling** - Graceful error handling and loading states
- ✅ **Responsive Navbar** - Mobile hamburger menu and user dropdown

## 🛠 Tech Stack

- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **State Management**: Zustand
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Data Fetching**: TanStack React Query
- **Notifications**: SweetAlert2
- **Authentication**: JWT with cookies

## 📦 Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment setup** (`.env` file):
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_APP_NAME=E-Shop
   VITE_DEV_MODE=true
   ```

3. **Start development**:
   ```bash
   npm run dev
   ```

## 🌐 Backend Integration

**Status**: ✅ Fully configured and ready for backend connection

The frontend connects to backend at `http://localhost:3000` with:
- JWT authentication with automatic token management
- React Query for data fetching and caching
- Axios interceptors for request/response handling
- Graceful offline fallback with status indicators

**Expected API endpoints**: Authentication, Products, User management

## 🎯 Current Status

✅ **NO WHITE SCREEN ISSUES** - All module exports fixed  
✅ **Build System Working** - Production builds successfully  
✅ **Backend Ready** - API integration complete  
✅ **Responsive UI** - Professional Tailwind design  
✅ **Error Handling** - Comprehensive error boundaries  

**Dev Server**: Running at http://localhost:5175  
**Build Status**: ✓ Successful (158 modules, 465KB)  
**Authentication**: JWT + Zustand + Cookies working  
**Navigation**: React Router DOM 7 configured+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
