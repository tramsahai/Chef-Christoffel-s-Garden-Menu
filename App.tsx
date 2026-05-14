import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import FilterScreen from './screens/FilterScreen';
import { MenuItem } from './types';

const Tab = createBottomTabNavigator();

export default function App() {
  // Main list for the whole app
  const [fullMenu, setFullMenu] = useState<MenuItem[]>([]);

  // adding new dish to the array
  const handleAdd = (newItem: MenuItem) => {
    setFullMenu(prev => [...prev, newItem]);
  };

  // removing dish by its id
  const handleRemove = (id: string) => {
    setFullMenu(prev => prev.filter(item => item.id !== id));
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#f5f0e8',
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