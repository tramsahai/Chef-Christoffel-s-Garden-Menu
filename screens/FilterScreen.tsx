import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { MenuItem } from '../types';

interface Props { menuItems: MenuItem[]; }

export default function FilterScreen({ menuItems }: Props) {
  const [filter, setFilter] = useState<'Starters' | 'Mains' | 'Dessert'>('Starters');

  // RUBRIC REQUIREMENT: Logic using if statement
  const filteredData = menuItems.filter(item => {
    if (item.course === filter) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterBar}>
        {(['Starters', 'Mains', 'Dessert'] as const).map(course => (
          <TouchableOpacity 
            key={course} 
            onPress={() => setFilter(course)}
            style={[styles.chip, filter === course && styles.activeChip]}
          >
            <Text style={[styles.chipText, filter === course && styles.activeChipText]}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>R{item.price}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No {filter} available.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  filterBar: { flexDirection: 'row', justifyContent: 'center', padding: 15, gap: 10 },
  chip: { padding: 10, borderRadius: 20, borderWidth: 1, borderColor: '#2d6a4f' },
  activeChip: { backgroundColor: '#2d6a4f' },
  chipText: { color: '#2d6a4f' },
  activeChipText: { color: '#fff' },
  card: { backgroundColor: '#1a1a1a', margin: 10, padding: 15, borderRadius: 8 },
  name: { color: '#f5f0e8', fontSize: 16, fontWeight: 'bold' },
  price: { color: '#2d6a4f' },
  empty: { color: '#666', textAlign: 'center', marginTop: 20 }
});