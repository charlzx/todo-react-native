import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InformationAndFilter = ({
  list,
  options,
  removeCompleted,
  filter,
  setFilter,
  isDark,
}) => {
  return (
    <View>
      <View
        style={[
          styles.container,
          isDark ? styles.containerDark : styles.containerLight,
        ]}
      >
        <Text style={[styles.itemCount, isDark && styles.textDark]}>
          {list.length} {list.length === 1 ? 'item' : 'items'} left
        </Text>

        <View style={styles.filterOptions}>
          {options.map((item, i) => (
            <TouchableOpacity
              key={item}
              onPress={() => setFilter(i)}
              style={styles.filterButton}
            >
              <Text
                style={[
                  styles.filterText,
                  isDark && styles.textDark,
                  i === filter && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={removeCompleted}>
          <Text style={[styles.clearText, isDark && styles.textDark]}>
            Clear Completed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
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
  itemCount: {
    fontSize: 14,
    color: '#9495A5',
  },
  textDark: {
    color: '#5B5E7E',
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 16,
  },
  filterButton: {
    paddingVertical: 4,
  },
  filterText: {
    fontSize: 14,
    color: '#9495A5',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#3A7CFD',
    fontWeight: '700',
  },
  clearText: {
    fontSize: 14,
    color: '#9495A5',
  },
});

export default InformationAndFilter;
