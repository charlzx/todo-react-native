#!/bin/bash

echo "🚀 Setting up React Native Todo App..."
echo ""

# Navigate to the react-native-app directory
cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp .env.example .env.local
    echo "📝 Please edit .env.local and add your Convex deployment URL"
    echo ""
fi

# Check if convex directory exists
if [ ! -d "../convex" ]; then
    echo "⚠️  Convex directory not found in parent directory"
    echo "📝 Make sure to copy your convex folder here"
    echo ""
fi

echo "✨ Setup complete!"
echo ""
echo "📱 To run the app:"
echo "   1. Make sure your .env.local has the correct EXPO_PUBLIC_CONVEX_URL"
echo "   2. Start Convex backend: npm run dev:backend"
echo "   3. In a new terminal, start Expo: npm start"
echo ""
echo "Then choose your platform:"
echo "   - Press 'i' for iOS simulator"
echo "   - Press 'a' for Android emulator"
echo "   - Scan QR code with Expo Go app on your device"
echo ""
