import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';

const InputArea = ({
  handleSubmit,
  searchQuery,
  setSearchQuery,
  showSearch,
  setShowSearch,
  isDark,
}) => {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const trimmedInput = input.trim();
  const showSearchIcon = !showDetails && trimmedInput.length === 0;

  const resetFormFields = () => {
    setInput('');
    setDescription('');
    setDueDate('');
    setShowDetails(false);
  };

  const collapseSearch = () => {
    if (showSearch) {
      setShowSearch(false);
    }
    if (searchQuery) {
      setSearchQuery('');
    }
  };

  const handleFormSubmit = () => {
    handleSubmit(input, description, dueDate);
    resetFormFields();
  };

  const handleSearchToggle = () => {
    if (showSearch) {
      setShowSearch(false);
      setSearchQuery('');
    } else {
      setShowSearch(true);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isDark ? styles.inputContainerDark : styles.inputContainerLight,
          showDetails && styles.inputContainerExpanded,
        ]}
      >
        <View style={styles.inputRow}>
          <View style={styles.circle} />
          <TextInput
            style={[
              styles.input,
              isDark ? styles.inputDark : styles.inputLight,
            ]}
            value={input}
            onChangeText={(value) => {
              setInput(value);
              if (value.trim().length > 0) {
                collapseSearch();
              }
            }}
            placeholder="Create a new todo..."
            placeholderTextColor={isDark ? '#5B5E7E' : '#9495A5'}
            onFocus={() => {
              setShowDetails(true);
              collapseSearch();
            }}
          />
          {showSearchIcon && (
            <TouchableOpacity onPress={handleSearchToggle} style={styles.searchButton}>
              <Text style={styles.searchIcon}>🔍</Text>
            </TouchableOpacity>
          )}
        </View>

        {showDetails && (
          <View style={styles.detailsContainer}>
            <TextInput
              style={[
                styles.textarea,
                isDark ? styles.textareaDark : styles.textareaLight,
              ]}
              value={description}
              onChangeText={setDescription}
              placeholder="Add description (optional)..."
              placeholderTextColor={isDark ? '#5B5E7E' : '#9495A5'}
              multiline
              numberOfLines={3}
            />
            <View style={styles.actionRow}>
              <TextInput
                style={[
                  styles.dateInput,
                  isDark ? styles.dateInputDark : styles.dateInputLight,
                ]}
                value={dueDate}
                onChangeText={setDueDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={isDark ? '#5B5E7E' : '#9495A5'}
              />
              <TouchableOpacity
                onPress={() => {
                  resetFormFields();
                  collapseSearch();
                }}
                style={styles.cancelButton}
              >
                <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFormSubmit} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {showSearch && (
        <View
          style={[
            styles.searchContainer,
            isDark ? styles.searchContainerDark : styles.searchContainerLight,
          ]}
        >
          <TextInput
            style={[
              styles.searchInput,
              isDark ? styles.inputDark : styles.inputLight,
            ]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search todos..."
            placeholderTextColor={isDark ? '#5B5E7E' : '#9495A5'}
            autoFocus
          />
          {searchQuery && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  inputContainer: {
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainerLight: {
    backgroundColor: '#FFFFFF',
  },
  inputContainerDark: {
    backgroundColor: '#25273D',
  },
  inputContainerExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3E4F1',
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  inputLight: {
    color: '#494C6B',
  },
  inputDark: {
    color: '#C8CBE7',
  },
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 20,
  },
  detailsContainer: {
    marginTop: 16,
  },
  textarea: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  textareaLight: {
    borderColor: '#E3E4F1',
    backgroundColor: '#FAFAFA',
    color: '#494C6B',
  },
  textareaDark: {
    borderColor: '#393A4B',
    backgroundColor: '#25273D',
    color: '#C8CBE7',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateInput: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
  },
  dateInputLight: {
    borderColor: '#E3E4F1',
    backgroundColor: '#FAFAFA',
    color: '#494C6B',
  },
  dateInputDark: {
    borderColor: '#393A4B',
    backgroundColor: '#25273D',
    color: '#C8CBE7',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#494C6B',
  },
  buttonTextDark: {
    color: '#C8CBE7',
  },
  addButton: {
    backgroundColor: '#3A7CFD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    marginTop: 16,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainerLight: {
    backgroundColor: '#FFFFFF',
  },
  searchContainerDark: {
    backgroundColor: '#25273D',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 8,
  },
  clearText: {
    fontSize: 18,
    color: '#9495A5',
  },
});

export default InputArea;
