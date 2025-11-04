import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from './src/contexts/ThemeContext';
import Todo from './src/components/Todo';
import Constants from 'expo-constants';

// Initialize Convex client
const convexUrl = Constants.expoConfig?.extra?.convexUrl || 
                  process.env.EXPO_PUBLIC_CONVEX_URL || 
                  "https://upbeat-ostrich-598.convex.cloud";

const convex = new ConvexReactClient(convexUrl);

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Todo />
        </View>
      </ThemeProvider>
    </ConvexProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
