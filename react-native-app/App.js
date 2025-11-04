import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from './src/contexts/ThemeContext';
import Todo from './src/components/Todo';
import ErrorBoundary from './src/components/ErrorBoundary';

// Initialize Convex client with hardcoded production URL
const CONVEX_URL = "https://upbeat-ostrich-598.convex.cloud";

export default function App() {
  const [convex, setConvex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const client = new ConvexReactClient(CONVEX_URL);
      setConvex(client);
    } catch (err) {
      console.error("Convex initialization error:", err);
      setError(err.message);
    }
  }, []);

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.errorText}>Convex URL: {CONVEX_URL}</Text>
      </View>
    );
  }

  if (!convex) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3A7CFD" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Todo />
          </View>
        </ThemeProvider>
      </ConvexProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    padding: 20,
    textAlign: 'center',
  },
});
