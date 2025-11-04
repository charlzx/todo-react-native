# 📱 React Native Mobile App

## Quick Start

This directory contains the **React Native mobile version** of your todo app!

### Installation

```bash
cd react-native-app
./setup.sh
```

Or manually:
```bash
cd react-native-app
npm install
cp .env.example .env.local
# Edit .env.local with your Convex URL
```

### Running

```bash
# Start Convex backend
npm run dev:backend

# In another terminal, start Expo
npm start
```

Then:
- Press **`i`** for iOS simulator
- Press **`a`** for Android emulator  
- Scan QR code with **Expo Go** app on your phone

## 📚 Documentation

- **[README.md](./README.md)** - Complete setup guide
- **[SUMMARY.md](./SUMMARY.md)** - Overview of what was converted
- **[CONVERSION_GUIDE.md](./CONVERSION_GUIDE.md)** - Technical details
- **[WEB_VS_NATIVE_COMPARISON.md](./WEB_VS_NATIVE_COMPARISON.md)** - Side-by-side comparison

## ✨ Features

All web app features converted to native mobile:
- ✅ Create, edit, delete todos
- ✅ Mark complete/incomplete  
- ✅ Search & filter
- ✅ Drag to reorder (touch-optimized!)
- ✅ Dark mode
- ✅ Real-time sync via Convex

## 🎯 What's Inside

```
react-native-app/
├── App.js                    # Entry point
├── src/
│   ├── components/          # All UI components
│   ├── contexts/            # Theme management
│   └── assets/              # Images, fonts, etc.
├── package.json
├── app.json                 # Expo config
└── babel.config.js
```

## 🚀 Next Steps

1. Run on your phone with Expo Go
2. Test all features work smoothly
3. Customize colors/styles as needed
4. Build standalone app (see Expo docs)

## 🆘 Need Help?

Check the documentation files above or the [Expo documentation](https://docs.expo.dev/).

---

**Happy coding!** 🎉
