import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong.</Text>
          {this.state.error && (
            <ScrollView style={styles.scrollView}>
              <Text style={styles.errorTitle}>Error:</Text>
              <Text style={styles.errorText}>{this.state.error.toString()}</Text>
              <Text style={styles.errorTitle}>Component Stack:</Text>
              <Text style={styles.errorText}>{this.state.errorInfo?.componentStack}</Text>
            </ScrollView>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8d7da',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  errorText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default ErrorBoundary;
