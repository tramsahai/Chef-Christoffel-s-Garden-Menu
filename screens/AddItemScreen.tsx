import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { MenuItem } from '../types';

interface Props {
  menuItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (id: string) => void;
}

export default function AddItemScreen({ menuItems, onAddItem, onRemoveItem }: Props) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<'Starters' | 'Mains' | 'Dessert'>('Starters');

  // Simple random id for the items
  const makeId = () => Math.floor(Math.random() * 10000).toString();

  const saveItem = () => {
    if (!name || !desc || !price) {
      Alert.alert('Hold on', 'Please fill in all the details first');
      return;
    }

    const itemObj: MenuItem = {
      id: makeId(),
      name: name.trim(),
      description: desc.trim(),
      course: course,
      price: parseFloat(price)
    };

    onAddItem(itemObj);
    setName('');
    setDesc('');
    setPrice('');
    Alert.alert('Nice', 'Dish added to the menu');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formArea}>
        <TextInput style={styles.box} placeholder="Dish Name" placeholderTextColor="#666" value={name} onChangeText={setName} />
        <TextInput style={[styles.box, { height: 60 }]} placeholder="Description" placeholderTextColor="#666" value={desc} onChangeText={setDesc} multiline />
        <TextInput style={styles.box} placeholder="Price" placeholderTextColor="#666" value={price} onChangeText={setPrice} keyboardType="numeric" />
        
        <Text style={styles.pickLabel}>Choose Course:</Text>
        <View style={styles.btnRow}>
          {['Starters', 'Mains', 'Dessert'].map((c: any) => (
            <TouchableOpacity key={c} style={[styles.choiceBtn, course === c && styles.choiceBtnActive]} onPress={() => setCourse(c)}>
              <Text style={{ color: course === c ? '#fff' : '#2d6a4f' }}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.mainAddBtn} onPress={saveItem}>
          <Text style={styles.addText}>Add Dish</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listHeading}>Existing Dishes ({menuItems.length})</Text>
      
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.smallCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={{ color: '#666', fontSize: 12 }}>{item.course}</Text>
            </View>
            <TouchableOpacity 
              style={styles.delBtn} 
              onPress={() => onRemoveItem(item.id)} // fixed the remove button
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  formArea: { padding: 20 },
  box: { backgroundColor: '#1a1a1a', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 },
  pickLabel: { color: '#f5f0e8', marginBottom: 10 },
  btnRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  choiceBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#2d6a4f', alignItems: 'center' },
  choiceBtnActive: { backgroundColor: '#2d6a4f' },
  mainAddBtn: { backgroundColor: '#2d6a4f', padding: 15, borderRadius: 8, alignItems: 'center' },
  addText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  listHeading: { color: '#f5f0e8', marginLeft: 20, fontSize: 18, fontWeight: 'bold' },
  smallCard: { flexDirection: 'row', backgroundColor: '#1a1a1a', marginHorizontal: 20, marginVertical: 5, padding: 12, borderRadius: 8, alignItems: 'center' },
  itemName: { color: '#f5f0e8', fontWeight: 'bold' },
  delBtn: { backgroundColor: '#8b0000', width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }
});