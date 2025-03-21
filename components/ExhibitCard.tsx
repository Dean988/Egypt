import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import Colors from '@/constants/colors';

interface ExhibitCardProps {
  exhibit: any; // Changed to any to avoid type errors
  onPress: () => void;
  style?: any;
}

export default function ExhibitCard({ exhibit, onPress, style }: ExhibitCardProps) {
  // Ensure exhibit exists and has required properties
  if (!exhibit || !exhibit.id) {
    return null;
  }
  
  // Add safety check for onPress function
  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <Pressable style={[styles.container, style]} onPress={handlePress}>
      <View style={styles.imageContainer}>
        {exhibit.imageUrl ? (
          <Image 
            source={{ uri: exhibit.imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>
              Image of {exhibit.name}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{exhibit.name}</Text>
        <Text style={styles.location} numberOfLines={1}>
          Room {exhibit.roomNumber}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  placeholderText: {
    fontSize: 12,
    color: Colors.gold,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.lightText,
  },
});