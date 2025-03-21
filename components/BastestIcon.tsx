import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface BastestIconProps {
  size?: number;
}

export default function BastestIcon({ size = 24 }: BastestIconProps) {
  // URL dell'immagine del gatto egizio
  const imageUrl = "https://i.imgur.com/V83X0J1.jpeg";
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image 
        source={{ uri: imageUrl }} 
        style={[styles.image, { width: size, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 4,
  }
});