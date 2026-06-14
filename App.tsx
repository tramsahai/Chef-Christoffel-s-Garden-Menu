import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import FilterScreen from './screens/FilterScreen';
import { MenuItem } from './types';

const Tab = createBottomTabNavigator();

// Logo shown on the left side of the header
const HeaderLogo = () => (
  <View style={{ marginLeft: 15 }}>
    <Image
      source={require('./assets/logo.png')}
      style={{ width: 80, height: 80, borderRadius: 40 }}
    />
  </View>
);

export default function App() {
  // Main menu array shared across all screens
  const [fullMenu, setFullMenu] = useState<MenuItem[]>([]);

  // Adds a new dish to the menu array
  const handleAdd = (newItem: MenuItem) => {
    setFullMenu(prev => [...prev, newItem]);
  };

  // Removes a dish from the menu array by its ID
  const handleRemove = (id: string) => {
    setFullMenu(prev => prev.filter(item => item.id !== id));
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a1a', height: 90 },
          headerTintColor: '#f5f0e8',
          headerLeft: () => <HeaderLogo />,
          headerTitleAlign: 'right',
          headerTitleStyle: { fontSize: 18, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#1a1a1a' },
          tabBarActiveTintColor: '#2d6a4f',
        }}
      >
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} menuItems={fullMenu} />}
        </Tab.Screen>
        <Tab.Screen name="Manage Menu">
          {(props) => <AddItemScreen {...props} menuItems={fullMenu} onAddItem={handleAdd} onRemoveItem={handleRemove} />}
        </Tab.Screen>
        <Tab.Screen name="Filter">
          {(props) => <FilterScreen {...props} menuItems={fullMenu} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
