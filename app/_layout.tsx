import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ backgroundColor: Colors.surface }}>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.surface,
            },
            headerTintColor: Colors.gold,
            headerTitleStyle: {
              fontWeight: '700',
            },
            contentStyle: {
              backgroundColor: Colors.surface,
            },
            headerBackTitle: '',
            headerTitle: '',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
});
