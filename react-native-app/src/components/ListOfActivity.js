import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SortableItem = ({ item, checked, removeOne, onItemClick, drag, isDark }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const displayTitle = truncateText(item.text, 50);
  const displayDescription = truncateText(item.description, 80);

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        isDark ? styles.itemContainerDark : styles.itemContainerLight,
      ]}
      onPress={() => onItemClick(item)}
      onLongPress={drag}
      activeOpacity={0.8}
    >
      <TouchableOpacity
        onPress={() => checked(item._id)}
        style={styles.checkButton}
      >
        <View
          style={[
            styles.checkbox,
            item.status === 'Completed' && styles.checkboxChecked,
          ]}
        >
          {item.status === 'Completed' && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.itemContent}>
        <Text
          style={[
            styles.itemTitle,
            isDark ? styles.textDark : styles.textLight,
            item.status === 'Completed' && styles.textCompleted,
          ]}
        >
          {displayTitle}
        </Text>

        {item.description && (
          <Text
            style={[
              styles.itemDescription,
              isDark ? styles.descriptionDark : styles.descriptionLight,
              item.status === 'Completed' && styles.textCompleted,
            ]}
          >
            {displayDescription}
          </Text>
        )}

        {item.dueDate && (
          <Text style={styles.dueDate}>
            Due: {new Date(item.dueDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={() => removeOne(item._id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const ListOfActivity = ({
  list,
  filter,
  searchQuery,
  checked,
  removeOne,
  handleDrag,
  onItemClick,
  isDark,
}) => {
  const query = searchQuery?.trim().toLowerCase() || '';

  const filteredList = list.filter((item) => {
    let statusMatch = false;
    if (filter === 0) statusMatch = true;
    if (filter === 1) statusMatch = item.status === 'onProgress';
    if (filter === 2) statusMatch = item.status === 'Completed';

    if (!statusMatch) return false;

    if (!query) return true;

    const textMatch = item.text.toLowerCase().includes(query);
    const descMatch = item.description?.toLowerCase().includes(query) || false;
    return textMatch || descMatch;
  });

  const onDragEnd = ({ data }) => {
    handleDrag(data);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {query && (
        <View
          style={[
            styles.searchHeader,
            isDark ? styles.searchHeaderDark : styles.searchHeaderLight,
          ]}
        >
          <Text style={[styles.searchText, isDark && styles.textDark]}>
            {filteredList.length > 0
              ? `Showing ${filteredList.length} result${filteredList.length === 1 ? '' : 's'} for "${searchQuery}"`
              : `No results for "${searchQuery}"`}
          </Text>
        </View>
      )}

      {filteredList.length > 0 ? (
        <DraggableFlatList
          data={filteredList}
          keyExtractor={(item) => item._id}
          onDragEnd={onDragEnd}
          renderItem={({ item, drag }) => (
            <SortableItem
              item={item}
              checked={checked}
              removeOne={removeOne}
              onItemClick={onItemClick}
              drag={drag}
              isDark={isDark}
            />
          )}
        />
      ) : (
        <View
          style={[
            styles.emptyContainer,
            isDark ? styles.emptyContainerDark : styles.emptyContainerLight,
          ]}
        >
          <Text style={[styles.emptyText, isDark && styles.textDark]}>
            {query ? 'Try a different search term.' : 'No todos available.'}
          </Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  searchHeader: {
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  searchHeaderLight: {
    backgroundColor: '#FFFFFF',
  },
  searchHeaderDark: {
    backgroundColor: '#25273D',
  },
  searchText: {
    fontSize: 12,
    color: '#9495A5',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E4F1',
  },
  itemContainerLight: {
    backgroundColor: '#FFFFFF',
  },
  itemContainerDark: {
    backgroundColor: '#25273D',
    borderBottomColor: '#393A4B',
  },
  checkButton: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E4F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)',
    borderColor: '#C058F3',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  textLight: {
    color: '#494C6B',
  },
  textDark: {
    color: '#C8CBE7',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  descriptionLight: {
    color: '#9495A5',
  },
  descriptionDark: {
    color: '#767992',
  },
  dueDate: {
    fontSize: 12,
    color: '#9495A5',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 18,
    color: '#9495A5',
  },
  emptyContainer: {
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyContainerLight: {
    backgroundColor: '#FFFFFF',
  },
  emptyContainerDark: {
    backgroundColor: '#25273D',
  },
  emptyText: {
    fontSize: 14,
    color: '#9495A5',
  },
});

export default ListOfActivity;
