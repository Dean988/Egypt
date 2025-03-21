import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Clock, Footprints, MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';

interface RouteCardProps {
  route: any; // Changed to any to avoid type errors
  onPress: () => void;
}

export default function RouteCard({ route, onPress }: RouteCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return Colors.success;
      case 'medium':
        return Colors.warning;
      case 'hard':
        return Colors.error;
      default:
        return Colors.lightText;
    }
  };

  // Safely access exhibits array with a fallback to empty array
  const exhibitsCount = route.exhibits ? route.exhibits.length : 0;
  
  return (
    <Pressable 
      style={[
        styles.container, 
        route.thematic && { borderLeftColor: route.themeColor || Colors.gold, borderLeftWidth: 4 }
      ]} 
      onPress={onPress}
      android_ripple={{ color: Colors.border }}
    >
      <Image source={{ uri: route.imageUrl }} style={styles.image} />
      {route.recommended && (
        <View style={styles.recommendedBadge}>
          <Text style={styles.recommendedText}>Recommended</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={Typography.h3} numberOfLines={1}>{route.name}</Text>
        <Text style={Typography.bodySmall} numberOfLines={2}>{route.description}</Text>
        
        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Clock size={16} color={Colors.lightText} />
            <Text style={[Typography.caption, styles.infoText]}>{route.duration} min</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Footprints size={16} color={getDifficultyColor(route.difficulty)} />
            <Text style={[
              Typography.caption, 
              styles.infoText, 
              { color: getDifficultyColor(route.difficulty) }
            ]}>
              {route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1)}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <MapPin size={16} color={Colors.nileBlue} />
            <Text style={[Typography.caption, styles.infoText]}>
              {exhibitsCount} exhibits
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.egyptianBorder} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.desertSand,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    color: Colors.lightText,
  },
  recommendedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    zIndex: 5,
  },
  recommendedText: {
    color: Colors.card,
    fontSize: 12,
    fontWeight: 'bold',
  },
  egyptianBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.gold,
  },
});