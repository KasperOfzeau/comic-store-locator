import React, { useState, useEffect } from "react";
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './config/themeContext';
import theme from './config/theme';

// Imports Screens and Components
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import ListScreen from "./screens/ListScreen";
import Reviews from "./screens/Reviews";
import DarkModeSwitch from "./components/DarkModeSwitch";

const Tab = createBottomTabNavigator();

export default function App() {

  // Color theme mode
  const [mode, setMode] = useState(false);

  // Change theme 
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
        {/* Navigation bar */}
        <Tab.Navigator>
          <Tab.Screen
            name="Startpagina"
            component={HomeScreen}
            options={{
              headerRight: () => (
                <DarkModeSwitch/>
              ),
              tabBarLabel: 'Start',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Kaart"
            component={MapScreen}
            options={{
              headerRight: () => (
                <DarkModeSwitch/>
              ),
              tabBarLabel: 'Kaart',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="map" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Alle winkels"
            component={ListScreen}
            options={{
              headerRight: () => (
                <DarkModeSwitch/>
              ),
              tabBarLabel: 'Lijst',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Reviews"
            component={Reviews}
            options={{
              headerRight: () => (
                <DarkModeSwitch/>
              ),
              tabBarLabel: 'Reviews',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="star-half" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}