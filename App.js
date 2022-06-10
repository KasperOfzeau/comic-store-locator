import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './config/themeContext';
import theme from './config/theme';

import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import ListScreen from "./screens/ListScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {

  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
      setMode(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    }
  })

  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light} >
      <NavigationContainer theme = {mode === true ? DarkTheme : DefaultTheme}>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              // headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Kaart"
            component={MapScreen}
            options={{
              // headerShown: false,
              tabBarLabel: 'Map',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="map" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Alle winkels"
            component={ListScreen}
            options={{
              // headerShown: false,
              tabBarLabel: 'List',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Instellingen"
            component={SettingsScreen}
            options={{
              // headerShown: false,
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}