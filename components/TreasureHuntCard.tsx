import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Trophy, Sparkles, Cat, MapPin, Award } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { useUserStore } from '@/store/user-store';
import { LinearGradient } from 'expo-linear-gradient';
import EgyptianPattern from './EgyptianPattern';

interface TreasureHuntCardProps {
  treasureHunt: any;
  progress?: number;
  status?: string;
  onPress?: () => void;
}

export default function TreasureHuntCard({ 
  treasureHunt, 
  progress = 0, 
  status = "Non iniziato", 
  onPress 
}: TreasureHuntCardProps) {
  const router = useRouter();
  
  // Check if this treasure hunt is completed
  const isCompleted = status === 'Completato';
  const isStarted = status === 'In corso';
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/treasure-hunt/${treasureHunt.id}`);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
      case 'facile':
        return Colors.success;
      case 'medium':
      case 'medio':
        return Colors.warning;
      case 'hard':
      case 'difficile':
        return Colors.error;
      default:
        return Colors.lightText;
    }
  };
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed
      ]} 
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: treasureHunt.imageUrl }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.imageGradient}
        />
        
        {isCompleted && (
          <View style={styles.completedBadge}>
            <Trophy size={16} color={Colors.card} />
            <Text style={styles.badgeText}>Completato</Text>
          </View>
        )}
        
        {isStarted && !isCompleted && (
          <View style={[styles.progressBadge, styles.inProgressBadge]}>
            <Sparkles size={16} color={Colors.card} />
            <Text style={styles.badgeText}>In Corso</Text>
          </View>
        )}
        
        <View style={styles.imageContent}>
          <Text style={styles.huntName}>{treasureHunt.name || treasureHunt.title}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={Colors.gold} />
            <Text style={styles.locationText}>
              {treasureHunt.location || "Museo Egizio"}
            </Text>
          </View>
        </View>
        
        {(treasureHunt.name?.toLowerCase().includes('geroglifici') || 
          treasureHunt.title?.toLowerCase().includes('geroglifici')) && (
          <View style={styles.catBadge}>
            <Cat size={20} color={Colors.gold} />
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.descriptionText} numberOfLines={2}>{treasureHunt.description}</Text>
        
        {isStarted && !isCompleted && progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progress)}% completato
            </Text>
          </View>
        )}
        
        <View style={styles.rewardsContainer}>
          <View style={styles.rewardItem}>
            <Award size={16} color={Colors.gold} />
            <Text style={styles.rewardText}>
              {treasureHunt.points || 100} punti
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Clock size={16} color={Colors.gold} />
            <Text style={styles.infoText}>
              {treasureHunt.estimatedTime || treasureHunt.duration || "30 min"}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={[
              styles.infoText, 
              { color: getDifficultyColor(treasureHunt.difficulty) }
            ]}>
              {treasureHunt.difficulty ? 
                treasureHunt.difficulty.charAt(0).toUpperCase() + treasureHunt.difficulty.slice(1) : 
                "Medio"}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>
              Età: {treasureHunt.ageRecommendation || treasureHunt.ageRange || "6+"}
            </Text>
          </View>
        </View>
      </View>
      <EgyptianPattern style={styles.egyptianBorder} color={Colors.gold} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(35, 31, 32, 0.95)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginHorizontal: 0,
    borderWidth: 2,
    borderColor: Colors.gold,
    height: 320,
  },
  containerPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  imageContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  huntName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.card,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: Colors.card,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  content: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  descriptionText: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  progressText: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 4,
  },
  rewardsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  rewardText: {
    fontSize: 12,
    color: Colors.gold,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    zIndex: 10,
  },
  progressBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    zIndex: 10,
  },
  inProgressBadge: {
    backgroundColor: Colors.warning,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.card,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 3,
  },
  catBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gold,
    zIndex: 10,
  },
  egyptianBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 8,
  },
});