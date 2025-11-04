import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const TodoDetail = ({ item, onBack, onToggleComplete, onDelete, onUpdate, isDark }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);
  const [editedDescription, setEditedDescription] = useState(item.description || '');
  const [editedDueDate, setEditedDueDate] = useState(item.dueDate || '');

  const handleSave = () => {
    onUpdate({
      text: editedText,
      description: editedDescription,
      dueDate: editedDueDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(item.text);
    setEditedDescription(item.description || '');
    setEditedDueDate(item.dueDate || '');
    setIsEditing(false);
  };

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
    >
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDark && styles.textDark]}>
            Todo Details
          </Text>
        </View>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        {/* Title */}
        <View style={styles.section}>
          <Text style={styles.label}>TITLE</Text>
          {isEditing ? (
            <TextInput
              style={[
                styles.titleInput,
                isDark ? styles.inputDark : styles.inputLight,
              ]}
              value={editedText}
              onChangeText={setEditedText}
            />
          ) : (
            <Text
              style={[
                styles.titleText,
                isDark ? styles.textDark : styles.textLight,
                item.status === 'Completed' && styles.completedText,
              ]}
            >
              {item.text}
            </Text>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>DESCRIPTION</Text>
          {isEditing ? (
            <TextInput
              style={[
                styles.descriptionInput,
                isDark ? styles.inputDark : styles.inputLight,
              ]}
              value={editedDescription}
              onChangeText={setEditedDescription}
              multiline
              numberOfLines={4}
              placeholder="Add a description..."
              placeholderTextColor={isDark ? '#5B5E7E' : '#9495A5'}
            />
          ) : item.description ? (
            <Text
              style={[
                styles.descriptionText,
                isDark ? styles.textDark : styles.textLight,
                item.status === 'Completed' && styles.completedText,
              ]}
            >
              {item.description}
            </Text>
          ) : (
            <Text style={styles.emptyText}>No description</Text>
          )}
        </View>

        {/* Due Date */}
        <View style={styles.section}>
          <Text style={styles.label}>DUE DATE</Text>
          {isEditing ? (
            <TextInput
              style={[
                styles.dateInput,
                isDark ? styles.inputDark : styles.inputLight,
              ]}
              value={editedDueDate}
              onChangeText={setEditedDueDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={isDark ? '#5B5E7E' : '#9495A5'}
            />
          ) : item.dueDate ? (
            <Text style={[styles.dateText, isDark && styles.textDark]}>
              {new Date(item.dueDate).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          ) : (
            <Text style={styles.emptyText}>No due date</Text>
          )}
        </View>

        {/* Status */}
        <View style={styles.section}>
          <Text style={styles.label}>STATUS</Text>
          <View
            style={[
              styles.statusBadge,
              item.status === 'Completed'
                ? styles.statusCompleted
                : styles.statusInProgress,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === 'Completed'
                  ? styles.statusTextCompleted
                  : styles.statusTextInProgress,
              ]}
            >
              {item.status === 'Completed' ? 'Completed' : 'In Progress'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={[styles.actions, isDark && styles.actionsDark]}>
        {isEditing ? (
          <View style={styles.editActions}>
            <TouchableOpacity
              onPress={handleSave}
              style={[styles.button, styles.saveButton]}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={[
                styles.button,
                isDark ? styles.cancelButtonDark : styles.cancelButtonLight,
              ]}
            >
              <Text style={[styles.cancelButtonText, isDark && styles.textDark]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={onToggleComplete}
              style={[styles.button, styles.toggleButton]}
            >
              <Text style={styles.toggleButtonText}>
                {item.status === 'onProgress'
                  ? '✓ Mark as Completed'
                  : '○ Mark as In Progress'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDelete}
              style={[styles.button, styles.deleteButton]}
            >
              <Text style={styles.deleteButtonText}>✕ Delete Todo</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  containerLight: {
    backgroundColor: '#FFFFFF',
  },
  containerDark: {
    backgroundColor: '#25273D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E4F1',
  },
  headerDark: {
    borderBottomColor: '#393A4B',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: '#494C6B',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#494C6B',
  },
  textDark: {
    color: '#C8CBE7',
  },
  textLight: {
    color: '#494C6B',
  },
  editButton: {
    color: '#3A7CFD',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9495A5',
    marginBottom: 8,
    letterSpacing: 1,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: '600',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
  },
  descriptionInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  dateInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  dateText: {
    fontSize: 16,
  },
  inputLight: {
    backgroundColor: '#FAFAFA',
    borderColor: '#E3E4F1',
    color: '#494C6B',
  },
  inputDark: {
    backgroundColor: '#25273D',
    borderColor: '#393A4B',
    color: '#C8CBE7',
  },
  emptyText: {
    fontSize: 16,
    color: '#9495A5',
    fontStyle: 'italic',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusInProgress: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusTextCompleted: {
    color: '#065F46',
  },
  statusTextInProgress: {
    color: '#92400E',
  },
  actions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E3E4F1',
    gap: 12,
  },
  actionsDark: {
    borderTopColor: '#393A4B',
  },
  editActions: {
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#3A7CFD',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonLight: {
    backgroundColor: '#E5E7EB',
  },
  cancelButtonDark: {
    backgroundColor: '#393A4B',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#494C6B',
  },
  toggleButton: {
    backgroundColor: '#3A7CFD',
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
  deleteButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TodoDetail;
