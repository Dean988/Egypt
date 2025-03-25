import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Cat } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface CatLogoProps {
  size?: number;
  color?: string;
  style?: any;
}

export default function CatLogo({ size = 32, color = Colors.gold, style }: CatLogoProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.circle, { width: size, height: size }]}>
        <Cat size={size * 0.6} color={color} />
      </View>
      <Text style={[styles.text, { fontSize: size * 0.4 }]}>Bastet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  circle: {
    borderRadius: 999,
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  text: {
    marginTop: 4,
    fontWeight: 'bold',
    color: Colors.gold,
  },
});