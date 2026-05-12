import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Map, Ticket, Compass, Trophy } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: '#B9AEA2',
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: 'rgba(212, 166, 74, 0.32)',
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          minWidth: 0,
          width: '20%',
          maxWidth: '20%',
          flexBasis: 0,
          paddingHorizontal: 0,
        },
        headerStyle: {
          backgroundColor: Colors.surface,
        },
        headerTitleStyle: {
          color: Colors.gold,
          fontWeight: '700',
        },
        headerTintColor: Colors.gold,
        headerShadowVisible: false,
        headerTitle: '',
        tabBarIconStyle: {
          width: 24,
          height: 24,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={23} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Mappa",
          tabBarIcon: ({ color }) => <Map size={23} color={color} />,
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: "Percorsi",
          tabBarIcon: ({ color }) => <Compass size={23} color={color} />,
        }}
      />
      <Tabs.Screen
        name="treasure-hunt"
        options={{
          title: "Tesori",
          tabBarIcon: ({ color }) => <Trophy size={23} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: "Biglietti",
          href: null,
          tabBarIcon: ({ color }) => <Ticket size={23} color={color} />,
        }}
      />
    </Tabs>
  );
}
