# How to Generate APK File

## Method 1: EAS Build (Recommended - Cloud Build)

### Step 1: Login to Expo
```bash
cd /workspaces/todo-react-native/react-native-app
eas login
```

### Step 2: Configure EAS Build
```bash
eas build:configure
```

### Step 3: Build APK
```bash
# For development build (can be installed on any Android device)
eas build --platform android --profile preview

# For production build (optimized, smaller size)
eas build --platform android --profile production
```

### Step 4: Download APK
- After the build completes (takes 10-20 minutes)
- You'll get a download link in the terminal
- Or check https://expo.dev/accounts/[your-account]/projects/todo-react-native-app/builds

## Method 2: Local Build (Requires Android SDK)

### Prerequisites:
- Install Android Studio
- Install Android SDK
- Set ANDROID_HOME environment variable

### Build Command:
```bash
cd /workspaces/todo-react-native/react-native-app

# Install dependencies
npx expo install expo-dev-client

# Build locally
npx expo run:android --variant release
```

## Method 3: Export and Build Manually

### Step 1: Export the app
```bash
cd /workspaces/todo-react-native/react-native-app
npx expo export --platform android
```

### Step 2: Build with Android Studio
- Open Android Studio
- Import the android folder
- Build > Generate Signed Bundle / APK
- Select APK
- Follow the wizard

## Quick Start (Easiest):

Run these commands:
```bash
cd /workspaces/todo-react-native/react-native-app

# Login to Expo (create account if needed)
eas login

# Configure build
eas build:configure

# Build APK (takes 10-20 min)
eas build --platform android --profile preview
```

After the build completes, you'll get a download link for your APK!

## APK Types:

- **Preview**: For testing, larger size, easier to install
- **Production**: Optimized, smaller, requires signing for Play Store

## Notes:

- EAS Build is FREE for unlimited builds
- First build takes longer (15-20 min)
- Subsequent builds are faster (5-10 min)
- APK can be installed on any Android device
- No Android SDK needed on your machine for EAS Build
