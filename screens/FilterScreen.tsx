import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { MenuItem } from '../types';

interface Props { menuItems: MenuItem[]; }

export default function FilterScreen({ menuItems }: Props) {
  // Tracks which course the guest has selected to filter by
  const [filter, setFilter] = useState<'Starters' | 'Mains' | 'Dessert'>('Starters');

  // Filters the menu array to only show dishes matching the selected course
  const filteredData = menuItems.filter(item => {
    if (item.course === filter) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.heading}>Filter by Course</Text>
      <Text style={styles.subheading}>Select a course to see its dishes</Text>

      {/* Large course selection buttons */}
      <View style={styles.filterBar}>
        {(['Starters', 'Mains', 'Dessert'] as const).map(course => (
          <TouchableOpacity
            key={course}
            onPress={() => setFilter(course)}
            style={[styles.chip, filter === course && styles.activeChip]}
          >
            <Text style={[styles.chipText, filter === course && styles.activeChipText]}>
              {course}
            </Text>
            {/* Shows how many dishes are in each course */}
            <Text style={[styles.chipCount, filter === course && styles.activeChipCount]}>
              {menuItems.filter(i => i.course === course).length} dishes
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List of dishes for the selected course */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No {filter} available yet.</Text>
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  heading: { color: '#f5f0e8', fontSize: 22, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20 },
  subheading: { color: '#666', fontSize: 13, paddingHorizontal: 20, marginBottom: 20, marginTop: 4 },
  // Filter buttons are large and stacked vertically so they're easy to tap
  filterBar: { flexDirection: 'row', paddingHorizontal: 15, gap: 10, marginBottom: 10 },
  chip: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2d6a4f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeChip: { backgroundColor: '#2d6a4f' },
  chipText: { color: '#2d6a4f', fontSize: 16, fontWeight: 'bold' },
  activeChipText: { color: '#fff' },
  chipCount: { color: '#2d6a4f', fontSize: 11, marginTop: 4 },
  activeChipCount: { color: '#a8d5b5' },
  card: { backgroundColor: '#1a1a1a', marginBottom: 12, padding: 16, borderRadius: 10, borderLeftWidth: 3, borderLeftColor: '#2d6a4f' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  name: { color: '#f5f0e8', fontSize: 16, fontWeight: 'bold' },
  price: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  desc: { color: '#999', lineHeight: 20 },
  empty: { color: '#666', textAlign: 'center', marginTop: 40, fontStyle: 'italic' },
});
