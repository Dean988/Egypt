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
  isSpecialChallenge?: boolean;
}

export default function TreasureHuntCard({ 
  treasureHunt, 
  progress = 0, 
  status = "Non iniziato", 
  onPress,
  isSpecialChallenge = false
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
        styles.regularContainer,
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
        <Text style={styles.descriptionText} numberOfLines={2}>
          {treasureHunt.description}
        </Text>
        
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
              { 
                color: getDifficultyColor(treasureHunt.difficulty),
                fontWeight: '600'  
              }
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
  specialContainer: {
    backgroundColor: 'rgba(35, 31, 32, 0.95)',
  },
  regularContainer: {
    backgroundColor: '#ffffff',
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
  },
  descriptionText: {
    fontSize: 14,
    color: '#231f20',
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#231f20',
    fontWeight: '500',
  },
  rewardsContainer: {
    marginBottom: 12,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rewardText: {
    fontSize: 14,
    color: '#231f20',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#231f20',
    fontWeight: '500',
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.gold,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    zIndex: 10,
  },
  progressBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    zIndex: 10,
  },
  inProgressBadge: {
    backgroundColor: Colors.gold,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.card,
  },
  catBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#231f20',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.gold,
    zIndex: 10,
  },
  egyptianBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  }
});