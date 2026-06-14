import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { MenuItem } from '../types';

interface Props {
  menuItems: MenuItem[];
}

export default function HomeScreen({ menuItems }: Props) {
  // Animation values for the fade and scale effect on menu cards
  const fadeValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.9)).current;

  // Reruns the animation every time a dish is added or removed
  useEffect(() => {
    fadeValue.setValue(0);
    scaleValue.setValue(0.9);
    Animated.parallel([
      Animated.timing(fadeValue, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleValue, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();
  }, [menuItems]);

  // Calculates the average price for given course using a for loop
  const calcAverage = (courseName: string): number => {
    const filtered = menuItems.filter(item => item.course === courseName);
    if (filtered.length === 0) return 0;
    let total = 0;
    for (let i = 0; i < filtered.length; i++) {
      total += filtered[i].price;
    }
    return total / filtered.length;
  };

  // Renders a single dish card in the menu list
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <Animated.View style={[styles.card, { opacity: fadeValue, transform: [{ scale: scaleValue }] }]}>
      <View style={styles.cardRow}>
        <Text style={styles.dishTitle}>{item.name}</Text>
        <Text style={styles.courseTag}>{item.course}</Text>
      </View>
      <Text style={styles.descText}>{item.description}</Text>
      <Text style={styles.priceText}>R {item.price.toFixed(2)}</Text>
    </Animated.View>
  );

  // Header shown above the dish list contains the title and stats
  const ListHeader = () => (
    <View>
      <View style={styles.topSection}>
        <Text style={styles.mainTitle}>Chef Christoffel's Garden Menu</Text>
        <Text style={styles.subtitle}>Tonight's fresh selection</Text>
      </View>

      {/* Stats block showing total dishes and average price per course */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsHeading}>Menu Overview</Text>
        <View style={styles.statGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{menuItems.length}</Text>
            <Text style={styles.statLabel}>Total Dishes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>R{calcAverage('Starters').toFixed(0)}</Text>
            <Text style={styles.statLabel}>Avg Starters</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>R{calcAverage('Mains').toFixed(0)}</Text>
            <Text style={styles.statLabel}>Avg Mains</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>R{calcAverage('Dessert').toFixed(0)}</Text>
            <Text style={styles.statLabel}>Avg Dessert</Text>
          </View>
        </View>
      </View>

      <Text style={styles.menuHeading}>Tonight's Menu</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.main}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ padding: 15 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No dishes yet. Add some from Manage Menu!</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#121212' },
  topSection: { padding: 20, backgroundColor: '#1a1a1a', marginBottom: 2 },
  mainTitle: { color: '#f5f0e8', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#2d6a4f', fontSize: 14, marginTop: 4 },
  // Stats section has a green border to make it stand out clearly
  statsContainer: { backgroundColor: '#1e2d25', margin: 12, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#2d6a4f' },
  statsHeading: { color: '#2d6a4f', fontSize: 13, fontWeight: 'bold', letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' },
  statGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { alignItems: 'center', backgroundColor: '#121212', borderRadius: 10, padding: 12, flex: 1, marginHorizontal: 3 },
  statNumber: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#2d6a4f', fontSize: 10, marginTop: 4, textAlign: 'center' },
  menuHeading: { color: '#f5f0e8', fontSize: 18, fontWeight: 'bold', marginLeft: 4, marginBottom: 8, marginTop: 4 },
  card: { backgroundColor: '#1a1a1a', padding: 18, borderRadius: 12, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#2d6a4f' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  dishTitle: { color: '#f5f0e8', fontSize: 18, fontWeight: 'bold' },
  courseTag: { color: '#2d6a4f', fontSize: 12, fontStyle: 'italic', backgroundColor: '#1e2d25', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  descText: { color: '#999', marginBottom: 10, lineHeight: 20 },
  priceText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  emptyText: { color: '#555', textAlign: 'center', marginTop: 40, fontStyle: 'italic' },
});
