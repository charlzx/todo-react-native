import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { ThemeContext } from '../contexts/ThemeContext';
import InputArea from './InputArea';
import ListOfActivity from './ListOfActivity';
import Filter from './InformationAndFilter';
import TodoDetail from './TodoDetail';

const Todo = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  // Query todos from Convex
  const list = useQuery(api.todos.getTodos) || [];

  // Mutations
  const createTodo = useMutation(api.todos.createTodo);
  const toggleTodoMutation = useMutation(api.todos.toggleTodo);
  const deleteTodoMutation = useMutation(api.todos.deleteTodo);
  const updateTodoMutation = useMutation(api.todos.updateTodo);
  const updateTodoOrder = useMutation(api.todos.updateTodoOrder);
  const deleteCompletedMutation = useMutation(api.todos.deleteCompleted);

  const [filter, setFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Sync selectedTodo with updated list data
  useEffect(() => {
    if (selectedTodo && list.length > 0) {
      const updatedTodo = list.find((item) => item._id === selectedTodo._id);
      if (updatedTodo && JSON.stringify(updatedTodo) !== JSON.stringify(selectedTodo)) {
        setSelectedTodo(updatedTodo);
      }
    }
     
  }, [list]);

  const handleSubmit = async (input, description = '', dueDate = '') => {
    const trimmedInput = input.trim();
    const trimmedDescription = description.trim();

    if (trimmedInput === '' && trimmedDescription === '') {
      return;
    }

    const todoText = trimmedInput || trimmedDescription;

    await createTodo({
      text: todoText,
      description: trimmedInput ? trimmedDescription : '',
      dueDate: dueDate || undefined,
    });
  };

  const checked = async (itemId) => {
    if (!itemId) return;

    await toggleTodoMutation({ id: itemId });

    if (selectedTodo && selectedTodo._id === itemId) {
      const updatedTodo = list.find((item) => item._id === itemId);
      if (updatedTodo) {
        setSelectedTodo(updatedTodo);
      }
    }
  };

  const toggleComplete = async (itemId) => {
    await toggleTodoMutation({ id: itemId });
    const updatedTodo = list.find((item) => item._id === itemId);
    if (updatedTodo) {
      setSelectedTodo(updatedTodo);
    }
  };

  const openTodoDetail = (item) => {
    setSelectedTodo(item);
  };

  const removeOne = async (itemId) => {
    if (!itemId) return;
    await deleteTodoMutation({ id: itemId });
  };

  const deleteTodo = async (itemId) => {
    await deleteTodoMutation({ id: itemId });
    setSelectedTodo(null);
  };

  const updateTodo = async (itemId, updates) => {
    await updateTodoMutation({
      id: itemId,
      text: updates.text,
      description: updates.description,
      dueDate: updates.dueDate,
    });
  };

  const removeCompleted = async () => {
    await deleteCompletedMutation();
  };

  const handleDrag = async (data) => {
    const updates = data.map((item, index) => ({
      id: item._id,
      order: index,
    }));

    await updateTodoOrder({ updates });
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <SafeAreaView
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.header}>
          <Text style={styles.title}>T O D O</Text>
          <TouchableOpacity onPress={toggleTheme}>
            <Text style={styles.themeIcon}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <InputArea
            handleSubmit={handleSubmit}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            isDark={isDark}
          />

          {selectedTodo ? (
            <TodoDetail
              item={selectedTodo}
              onBack={() => setSelectedTodo(null)}
              onToggleComplete={() => toggleComplete(selectedTodo._id)}
              onDelete={() => deleteTodo(selectedTodo._id)}
              onUpdate={(updates) => updateTodo(selectedTodo._id, updates)}
              isDark={isDark}
            />
          ) : (
            <>
              <ListOfActivity
                list={list}
                filter={filter}
                searchQuery={searchQuery}
                checked={checked}
                removeOne={removeOne}
                handleDrag={handleDrag}
                onItemClick={openTodoDetail}
                isDark={isDark}
              />

              <Filter
                list={list}
                options={['All', 'Active', 'Completed']}
                removeCompleted={removeCompleted}
                filter={filter}
                setFilter={setFilter}
                isDark={isDark}
              />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: '#FAFAFA',
  },
  containerDark: {
    backgroundColor: '#161722',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 10,
  },
  themeIcon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Todo;
