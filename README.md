# Todo App - React Web & React Native Mobile

A full-stack todo application with real-time synchronization. This repository contains both the **React web app** (main folder) and **React Native mobile app** (react-native-app folder), both powered by a shared Convex backend.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![React Native](https://img.shields.io/badge/React%20Native-Expo-000020)
![Convex](https://img.shields.io/badge/Convex-Backend-orange)

## 📱 Features

✅ **Create & Manage Todos** - Add todos with titles, descriptions, and due dates  
✅ **Real-time Sync** - Changes sync instantly across web and mobile  
✅ **Search & Filter** - Search todos and filter by status (All/Active/Completed)  
✅ **Drag & Drop** - Reorder todos with drag-and-drop on web, long-press on mobile  
✅ **Detail View** - View, edit, and delete todos with full details  
✅ **Dark Mode** - Toggle between light and dark themes  
✅ **Cross-Platform** - Works on web browsers, iOS, and Android  
✅ **Offline Support** - Convex handles offline caching automatically


## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- For mobile: [Expo Go app](https://expo.dev/client) on your phone

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/charlzx/todo-react-native.git
cd todo-react-native
\`\`\`

### 2. Set Up Convex Backend (Shared)

\`\`\`bash
# Install web app dependencies (includes Convex)
npm install

# Login to Convex (create free account if needed)
npx convex dev

# This will deploy functions and give you a deployment URL
\`\`\`

Copy your Convex deployment URL from the output.

### 3. Run React Web App (Main Folder)

\`\`\`bash
# Create .env.local in root directory
echo "VITE_CONVEX_URL=https://your-deployment.convex.cloud" > .env.local

# Start web development server
npm run dev
\`\`\`

Open http://localhost:5173 in your browser.

### 4. Run React Native Mobile App

\`\`\`bash
cd react-native-app

# Install dependencies
npm install

# Create environment file
echo "EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud" > .env.local

# Start Expo
npx expo start
\`\`\`

**To test on your phone:**
- Install Expo Go app
- Scan the QR code shown in terminal
- App will load on your device!

**To test in browser:**
- Press \`w\` in the terminal

## 📦 Building APK (Android)

\`\`\`bash
cd react-native-app

# Login to Expo (create free account)
eas login

# Configure build
eas build:configure

# Build APK (takes 10-15 minutes)
eas build --platform android --profile preview

# Download APK from the link provided
\`\`\`

See \`react-native-app/BUILD_APK_GUIDE.md\` for detailed instructions.

## 🛠️ Tech Stack

### Web App (Main Folder)
- **React** 18.3.1 - UI framework
- **Vite** 6.1.8 - Build tool & dev server
- **Tailwind CSS** 3.4.14 - Utility-first styling
- **@dnd-kit** - Drag and drop functionality
- **Material-UI** - UI components

### Mobile App (react-native-app/)
- **React Native** 0.76.3 - Mobile framework
- **Expo** SDK 52 - Development platform
- **StyleSheet** - Mobile styling
- **react-native-draggable-flatlist** - Drag and drop for mobile
- **AsyncStorage** - Local data persistence

### Backend (Shared)
- **Convex** 1.28.2 - Real-time database & serverless functions
- **TypeScript** - Type-safe backend code

## 🔧 Development

### Web Development (Main Folder)
\`\`\`bash
# From root directory
npm run dev          # Start Vite dev server on http://localhost:5173
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
\`\`\`

### Mobile Development (react-native-app/)
\`\`\`bash
cd react-native-app
npx expo start       # Start Expo dev server
npx expo start --web # Run in web browser
npx expo start --ios # Run iOS simulator (Mac only)
npx expo start --android # Run Android emulator
\`\`\`

### Convex Backend (Shared)
\`\`\`bash
# From root directory
npx convex dev       # Start dev mode (auto-deploys on changes)
npx convex deploy    # Deploy to production
npx convex dashboard # Open Convex dashboard
\`\`\`

## 🌐 Environment Variables

### Web App (Root \`.env.local\`)
\`\`\`env
VITE_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=dev:your-dev-deployment  # For Convex dev mode
\`\`\`

### Mobile App (\`react-native-app/.env.local\`)
\`\`\`env
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
\`\`\`

**Note:** The web and mobile apps can use the same Convex deployment URL for real-time sync, or you can use separate dev/prod deployments.

## 🎯 Key Features Explained

### Real-time Synchronization
Convex provides automatic real-time updates. When you create, update, or delete a todo on the web app, it instantly appears on all connected mobile devices, and vice versa.

### Offline Support
Convex handles offline scenarios automatically. Changes made offline are queued and synced when connection is restored.

### Cross-Platform Architecture
- **Web App (Main)**: Built with React + Vite + Tailwind CSS for desktop/mobile browsers
- **Mobile App (Separate)**: Built with React Native + Expo for iOS/Android native apps
- **Shared Backend**: Both apps connect to the same Convex deployment for real-time sync

### Drag & Drop
- **Web**: @dnd-kit with HTML5 drag-and-drop
- **Mobile**: Long-press gesture to activate drag mode

## 📚 API Reference

### Convex Functions

**Queries** (read data, auto-subscribe to changes)
- \`api.todos.getTodos\` - Get all todos
- \`api.todos.getTodo(id)\` - Get single todo

**Mutations** (write data)
- \`api.todos.createTodo(args)\` - Create new todo
- \`api.todos.updateTodo(id, args)\` - Update todo
- \`api.todos.deleteTodo(id)\` - Delete todo
- \`api.todos.toggleTodo(id)\` - Toggle completion status
- \`api.todos.updateTodoOrder(updates)\` - Reorder todos
- \`api.todos.deleteCompleted()\` - Delete all completed todos

---

Made with ❤️ using React, React Native, and Convex
