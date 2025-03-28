import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Map, Ticket, Compass, Trophy } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.lightText,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopWidth: 1,
          borderTopColor: Colors.gold,
        },
        tabBarShowLabel: false, // Hide labels
        headerStyle: {
          backgroundColor: '#231f20',
        },
        headerTitleStyle: {
          color: Colors.gold,
          fontWeight: 'bold',
        },
        headerTintColor: Colors.gold,
        headerShadowVisible: false,
        // Hide the header title to remove the "(tabs)" text
        headerTitle: '',
        // Remove top padding/margin
        // Increase icon size
        tabBarIconStyle: {
          width: 28,
          height: 28,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <Map size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: "Routes",
          tabBarIcon: ({ color }) => <Compass size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="treasure-hunt"
        options={{
          title: "Treasure",
          tabBarIcon: ({ color }) => <Trophy size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: "Tickets",
          tabBarIcon: ({ color }) => <Ticket size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}