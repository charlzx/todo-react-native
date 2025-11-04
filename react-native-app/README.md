# 📱 Todo App - React Native Mobile

A full-featured todo application built with React Native and Expo, powered by Convex for real-time backend synchronization.

## ✨ Features

- ✅ **Create, Edit, Delete Todos** - Full CRUD operations
- 📝 **Rich Todo Details** - Add descriptions and due dates
- ✔️ **Toggle Completion** - Mark todos as complete/incomplete
- 🔍 **Search** - Search todos by title or description
- 🎯 **Filter** - View All, Active, or Completed todos
- 🎨 **Drag & Drop** - Long-press and drag to reorder
- 🌓 **Dark Mode** - Auto-detects system theme with manual toggle
- ⚡ **Real-time Sync** - Changes sync instantly with Convex backend
- 📱 **Native Mobile Experience** - Built with React Native

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- [Expo Go](https://expo.dev/client) app on your mobile device

### Installation

1. **Install dependencies:**
```bash
cd react-native-app
npm install
```

2. **Set up environment variables:**
   - The `.env.local` file is already configured with the production Convex URL
   - If needed, update it in `app.json` under `extra.convexUrl`

3. **Start the development server:**
```bash
npm start
```

4. **Run on your device:**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `w` for web, `i` for iOS simulator, `a` for Android emulator

## 📦 Building APK

### For Testing (Development Build)

```bash
# Login to Expo
eas login

# Build APK
eas build --platform android --profile preview
```

### For Production

```bash
eas build --platform android --profile production
```

After the build completes (10-15 minutes), download the APK from the provided link.

**See [BUILD_APK_GUIDE.md](./BUILD_APK_GUIDE.md) for detailed instructions.**

## 📂 Project Structure

```
react-native-app/
├── App.js                           # App entry with Convex & Theme providers
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
├── .env.local                       # Environment variables
├── src/
│   ├── components/
│   │   ├── Todo.js                  # Main container component
│   │   ├── InputArea.js             # Create/edit todo form
│   │   ├── ListOfActivity.js        # Draggable todo list
│   │   ├── InformationAndFilter.js  # Filters & item counter
│   │   ├── TodoDetail.js            # Todo detail view
│   │   └── ErrorBoundary.js         # Error handling component
│   ├── contexts/
│   │   └── ThemeContext.js          # Dark mode management
│   └── assets/
│       └── images/                  # SVG icons and images
└── convex/                          # Backend functions (shared with web)
    ├── schema.ts                    # Database schema
    └── todos.ts                     # Todo CRUD functions
```

## 🛠️ Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Convex** - Real-time backend
- **React Context** - State management
- **AsyncStorage** - Local persistence
- **react-native-draggable-flatlist** - Drag & drop functionality
- **react-native-gesture-handler** - Touch gestures

## 🔧 Configuration

### Convex Backend

The app is configured to use the production Convex deployment:
- URL: `https://upbeat-ostrich-598.convex.cloud`
- Configured in: `app.json` > `extra.convexUrl`

### App Identifiers

- **Bundle ID (iOS):** `com.charlzx.todoapp`
- **Package Name (Android):** `com.charlzx.todoapp`

## 📱 Running on Physical Devices

### Android

1. Install Expo Go from Google Play Store
2. Scan QR code from the terminal
3. App loads automatically

Or install the built APK directly.

### iOS

1. Install Expo Go from App Store
2. Open Camera app and scan QR code
3. Tap notification to open in Expo Go

## 🐛 Troubleshooting

### White Screen on App Launch

The app includes an ErrorBoundary that will display error details. If you see a white screen:
1. Check if Convex URL is correctly configured
2. Ensure you have internet connection
3. Rebuild the app with `eas build`

### Build Failures

```bash
# Check for configuration errors
npx expo-doctor

# Fix dependency versions
npx expo install --check
```

### Connection Issues

- Verify `extra.convexUrl` in `app.json`
- Check network connectivity
- Ensure Convex deployment is active

## 📄 Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run on web browser
```

## 🔄 Sync with Web App

This mobile app shares the same Convex backend with the web application. Changes made on mobile sync in real-time with the web version and vice versa.

## 📧 Support

For issues or questions, please open an issue in the repository.
