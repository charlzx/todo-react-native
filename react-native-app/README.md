# React Native Todo App

This is the React Native version of the Todo application, converted from the web version.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- For iOS: Xcode and CocoaPods (Mac only)
- For Android: Android Studio and Android SDK

## Installation

1. Install dependencies:
```bash
cd react-native-app
npm install
```

2. Set up Convex environment:
   - Copy the `.env.local` file from the parent directory or create a new one
   - Add your Convex deployment URL:
```
EXPO_PUBLIC_CONVEX_URL=https://your-convex-deployment-url.convex.cloud
```

3. Start the Convex backend:
```bash
npm run dev:backend
```

4. In a new terminal, start the Expo development server:
```bash
npm start
```

## Running the App

### On iOS Simulator (Mac only)
```bash
npm run ios
```

### On Android Emulator
```bash
npm run android
```

### On Web
```bash
npm run web
```

### Using Expo Go App
1. Install Expo Go on your iOS or Android device
2. Scan the QR code shown in the terminal or Expo Dev Tools

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Add descriptions and due dates to todos
- ✅ Filter todos (All, Active, Completed)
- ✅ Search todos by title or description
- ✅ Drag and drop to reorder todos
- ✅ Dark mode support
- ✅ Real-time sync with Convex backend

## Key Differences from Web Version

1. **UI Components**: Replaced HTML elements with React Native components (View, Text, TouchableOpacity, etc.)
2. **Styling**: Converted Tailwind CSS to React Native StyleSheet
3. **Drag & Drop**: Using `react-native-draggable-flatlist` instead of `@dnd-kit`
4. **Theme**: Using React Native's `useColorScheme` and AsyncStorage for theme persistence
5. **Navigation**: Single-screen app with conditional rendering for detail view
6. **Images**: Would need to be added to `assets/images/` directory and imported using `require()`

## Project Structure

```
react-native-app/
├── App.js                          # Main app entry point
├── src/
│   ├── components/
│   │   ├── Todo.js                 # Main todo component
│   │   ├── InputArea.js            # Todo input form
│   │   ├── ListOfActivity.js      # Draggable todo list
│   │   ├── InformationAndFilter.js # Filter bar
│   │   └── TodoDetail.js          # Todo detail view
│   ├── contexts/
│   │   └── ThemeContext.js        # Theme context provider
│   └── assets/
│       └── images/                # App images
├── convex/                        # Convex backend (shared with web app)
├── package.json
├── app.json
└── babel.config.js
```

## Troubleshooting

### Convex Connection Issues
- Ensure your `EXPO_PUBLIC_CONVEX_URL` is correctly set
- Make sure the Convex backend is running (`npm run dev:backend`)

### Drag and Drop Not Working
- Ensure `react-native-gesture-handler` is properly installed
- On Android, you may need to add the handler to MainActivity

### Dark Mode Not Persisting
- Check that `@react-native-async-storage/async-storage` is installed correctly
- Clear app data and restart if issues persist

## License

MIT
