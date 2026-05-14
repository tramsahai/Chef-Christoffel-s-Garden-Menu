import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { MenuItem } from '../types';

interface Props {
  menuItems: MenuItem[];
}

export default function HomeScreen({ menuItems }: Props) {
  // Animation setup, adds effect
  const fadeValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeValue, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleValue, { toValue: 1, friction: 4, useNativeDriver: true })
    ]).start();
  }, [menuItems]);

  //  helper to find average price for specific courses main,starter and dessert
  const calcAvg = (courseName: string) => {
    const list = menuItems.filter(i => i.course === courseName);
    if (list.length === 0) return 0;
    const total = list.reduce((s, i) => s + i.price, 0);
    return total / list.length;
  };

  const showDish = ({ item }: { item: MenuItem }) => (
    <Animated.View style={[styles.card, { opacity: fadeValue, transform: [{ scale: scaleValue }] }]}>
      <View style={styles.row}>
        <Text style={styles.dishTitle}>{item.name}</Text>
        <Text style={styles.courseTag}>{item.course}</Text>
      </View>
      <Text style={styles.infoText}>{item.description}</Text>
      <Text style={styles.priceText}>R {item.price.toFixed(2)}</Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.topSection}>
        <Text style={styles.mainTitle}>Chef Christoffel's Garden Menu</Text>
        <Text style={styles.smallTitle}>Tonight's fresh selection</Text>
      </View>

      <View style={styles.statGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statVal}>{menuItems.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statVal}>R{calcAvg('Starters').toFixed(0)}</Text>
          <Text style={styles.statLabel}>Starters</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statVal}>R{calcAvg('Mains').toFixed(0)}</Text>
          <Text style={styles.statLabel}>Mains</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statVal}>R{calcAvg('Dessert').toFixed(0)}</Text>
          <Text style={styles.statLabel}>Desserts</Text>
        </View>
      </View>

      <FlatList
        data={menuItems}
        renderItem={showDish}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 15 }}
        ListEmptyComponent={<Text style={styles.nothingText}>No food added yet</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#121212' },
  topSection: { padding: 20, backgroundColor: '#1a1a1a' },
  mainTitle: { color: '#f5f0e8', fontSize: 22, fontWeight: 'bold' },
  smallTitle: { color: '#2d6a4f', fontSize: 14 },
  statGrid: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: '#161616' },
  statItem: { alignItems: 'center' },
  statVal: { color: '#2d6a4f', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 10 },
  card: { backgroundColor: '#1a1a1a', padding: 18, borderRadius: 12, marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  dishTitle: { color: '#f5f0e8', fontSize: 18, fontWeight: 'bold' },
  courseTag: { color: '#2d6a4f', fontSize: 12, fontStyle: 'italic' },
  infoText: { color: '#999', marginTop: 5, marginBottom: 10 },
  priceText: { color: '#f5f0e8', fontWeight: 'bold' },
  nothingText: { color: '#555', textAlign: 'center', marginTop: 40 }
});