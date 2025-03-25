import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, Dimensions } from 'react-native';
import { ChevronRight, Clock, MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function FeaturedExhibit({ exhibit, onPress }) {
  // Ensure exhibit exists and has required properties
  if (!exhibit || !exhibit.id) {
    return null;
  }

  // Ensure onPress is a function before calling it
  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <Pressable 
      style={styles.container}
      onPress={handlePress}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: exhibit.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>In evidenza</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{exhibit.name}</Text>
        <Text style={styles.period}>{exhibit.period}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MapPin size={16} color={Colors.gold} />
            <Text style={styles.infoText}>{exhibit.location || 'Main Hall'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Clock size={16} color={Colors.gold} />
            <Text style={styles.infoText}>Floor {exhibit.floor}, Room {exhibit.roomNumber}</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={3}>
          {exhibit.description}
        </Text>
        
        <Pressable 
          style={styles.footer}
          onPress={handlePress}
        >
          <Text style={styles.viewDetails}>View Details</Text>
          <ChevronRight size={16} color={Colors.gold} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.gold,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 220,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  featuredBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.gold,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredText: {
    color: Colors.card,
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  period: {
    fontSize: 16,
    color: Colors.lightText,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(245, 197, 24, 0.3)',
  },
  viewDetails: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gold,
    marginRight: 8,
  },
});