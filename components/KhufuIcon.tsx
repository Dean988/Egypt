import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from '@/constants/colors';

interface KhufuIconProps {
  size?: number;
  style?: any;
}

export default function KhufuIcon({ size = 24, style }: KhufuIconProps) {
  // URL dell'immagine del gatto egizio
  const imageUrl = "https://i.imgur.com/QF3SblP.png";
  
  return (
    <View style={[
      styles.container, 
      { width: size, height: size },
      style
    ]}>
      <Image 
        source={{ uri: imageUrl }} 
        style={[styles.image, { width: size * 0.9, height: size * 0.9 }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    borderRadius: 4,
  }
});