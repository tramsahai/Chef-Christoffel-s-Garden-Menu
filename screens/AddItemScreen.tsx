import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, SafeAreaView, Alert
} from 'react-native';
// Picker gives us an actual dropdown list for course selection, suggested from mam feedback
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from '../types';

interface Props {
  menuItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (id: string) => void;
}

export default function AddItemScreen({ menuItems, onAddItem, onRemoveItem }: Props) {
  // Form field states each one tracks what the chef c has typed
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<'Starters' | 'Mains' | 'Dessert'>('Starters');

  // Creates a random ID for each new dish so we can identify and remove it later
  const generateId = (): string => {
    return Math.floor(Math.random() * 100000).toString();
  };

  // Validates the form and adds the new dish to the menu array
  const saveItem = () => {
    if (!name || !desc || !price) {
      Alert.alert('Missing Info', 'Please fill in all fields before adding a dish.');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }

    const newItem: MenuItem = {
      id: generateId(),
      name: name.trim(),
      description: desc.trim(),
      course: course,
      price: parsedPrice,
    };

    onAddItem(newItem);

    // Clear the form so the chef can add another dish
    setName('');
    setDesc('');
    setPrice('');
    setCourse('Starters');

    Alert.alert('Success', `${newItem.name} has been added to the menu!`);
  };

  // Renders each dish card in the list with a remove button
  const renderDish = ({ item }: { item: MenuItem }) => (
    <View style={styles.smallCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCourse}>{item.course} — R{item.price.toFixed(2)}</Text>
      </View>
      {/* Red X button removes the dish by passing its ID to App.tsx */}
      <TouchableOpacity style={styles.delBtn} onPress={() => onRemoveItem(item.id)}>
        <Text style={styles.delText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formArea}>

        <TextInput style={styles.box} placeholder="Dish Name" placeholderTextColor="#666" value={name} onChangeText={setName} />
        <TextInput style={[styles.box, { height: 70 }]} placeholder="Description" placeholderTextColor="#666" value={desc} onChangeText={setDesc} multiline />
        <TextInput style={styles.box} placeholder="Price (e.g. 85.00)" placeholderTextColor="#666" value={price} onChangeText={setPrice} keyboardType="numeric" />

        {/* Dropdown list for selecting the course - fixes Part 2 feedback */}
        <Text style={styles.pickLabel}>Select Course:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={course}
            onValueChange={(val) => setCourse(val)}
            style={styles.picker}
            dropdownIconColor="#2d6a4f"
          >
            {/* Each item has black background and white text, selected turns green */}
            <Picker.Item label="Starters" value="Starters" color="#fff" style={{ backgroundColor: course === 'Starters' ? '#2d6a4f' : '#121212' }} />
            <Picker.Item label="Mains" value="Mains" color="#fff" style={{ backgroundColor: course === 'Mains' ? '#2d6a4f' : '#121212' }} />
            <Picker.Item label="Dessert" value="Dessert" color="#fff" style={{ backgroundColor: course === 'Dessert' ? '#2d6a4f' : '#121212' }} />
          </Picker>
        </View>

        <TouchableOpacity style={styles.mainAddBtn} onPress={saveItem}>
          <Text style={styles.addText}>Add Dish</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.listHeading}>Existing Dishes ({menuItems.length})</Text>

      {/* FlatList loops through all menu items and renders each one using renderDish */}
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={renderDish}
        ListEmptyComponent={<Text style={styles.emptyText}>No dishes added yet. Add one above!</Text>}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  formArea: { padding: 20 },
  box: { backgroundColor: '#1a1a1a', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#2a2a2a' },
  pickLabel: { color: '#f5f0e8', marginBottom: 6, fontSize: 14 },
  pickerWrapper: {
    backgroundColor: '#121212',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2d6a4f',
    overflow: 'hidden',
  },
  picker: { color: '#fff', height: 50, backgroundColor: '#121212' },
  mainAddBtn: { backgroundColor: '#2d6a4f', padding: 15, borderRadius: 8, alignItems: 'center' },
  addText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  listHeading: { color: '#f5f0e8', marginLeft: 20, marginBottom: 8, fontSize: 18, fontWeight: 'bold' },
  smallCard: { flexDirection: 'row', backgroundColor: '#1a1a1a', marginHorizontal: 20, marginVertical: 5, padding: 12, borderRadius: 8, alignItems: 'center', borderLeftWidth: 3, borderLeftColor: '#2d6a4f' },
  itemName: { color: '#f5f0e8', fontWeight: 'bold', fontSize: 15 },
  itemCourse: { color: '#666', fontSize: 12, marginTop: 2 },
  delBtn: { backgroundColor: '#8b0000', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  delText: { color: '#fff', fontWeight: 'bold' },
  emptyText: { color: '#555', textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
});
