const reactHooks = require('eslint-plugin-react-hooks');

module.exports = [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        __DEV__: 'readonly',
        FormData: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^React$|^View$|^Text$|^TouchableOpacity$|^ScrollView$|^TextInput$|^SafeAreaView$|^KeyboardAvoidingView$|^ActivityIndicator$|^StatusBar$|^GestureHandlerRootView$|^DraggableFlatList$|^ConvexProvider$|^ThemeProvider$|^Todo$|^ErrorBoundary$|^InputArea$|^ListOfActivity$|^Filter$|^TodoDetail$|^SortableItem$'
      }],
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'convex/_generated/**',
      'convex/**/*.js',
      'babel.config.js',
      '.expo/**',
      'dist/**',
    ],
  },
];
