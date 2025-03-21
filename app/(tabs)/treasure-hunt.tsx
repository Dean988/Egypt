import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Trophy, Clock, MapPin, ChevronRight, Sparkles, Award } from 'lucide-react-native';
import Colors from '@/constants/colors';
import TreasureHuntCard from '@/components/TreasureHuntCard';
import treasureHunts from '@/mocks/treasure-hunts';
import { useUserStore } from '@/store/user-store';
import { LinearGradient } from 'expo-linear-gradient';

export default function TreasureHuntScreen() {
  const router = useRouter();
  const { treasureHuntProgress } = useUserStore();
  
  const navigateToTreasureHunt = (id) => {
    router.push(`/treasure-hunt/${id}`);
  };

  const getProgressPercentage = (treasureHuntId) => {
    if (!treasureHuntProgress) return 0;
    
    const huntProgress = treasureHuntProgress[treasureHuntId];
    if (!huntProgress) return 0;
    
    const { currentStep, completed } = huntProgress;
    const treasureHunt = treasureHunts.find(t => t.id === treasureHuntId);
    if (!treasureHunt) return 0;
    
    const totalSteps = treasureHunt.clues ? treasureHunt.clues.length : 3;
    if (completed) return 100;
    return Math.round((currentStep / totalSteps) * 100);
  };

  const getStatusText = (treasureHuntId) => {
    if (!treasureHuntProgress) return 'Non iniziato';
    
    const huntProgress = treasureHuntProgress[treasureHuntId];
    if (!huntProgress) return 'Non iniziato';
    if (huntProgress.completed) return 'Completato';
    if (huntProgress.currentStep > 0) return 'In corso';
    return 'Non iniziato';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Caccia al Tesoro</Text>
        <Text style={styles.subtitle}>Scopri i tesori nascosti del museo</Text>
      </View>

      <View style={styles.featuredContainer}>
        <ImageBackground 
          source={{ uri: 'https://i.imgur.com/Wb48y2z.jpeg' }} 
          style={styles.featuredImage}
          imageStyle={{ borderRadius: 12 }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
            style={styles.featuredGradient}
          />
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredContent}>
              <View style={styles.featuredBadge}>
                <Sparkles size={14} color={Colors.card} />
                <Text style={styles.featuredBadgeText}>Sfida Speciale</Text>
              </View>
              <Text style={styles.featuredSubtitle}>La Tomba del Faraone</Text>
              <View style={styles.featuredDetails}>
                <View style={styles.featuredDetail}>
                  <Clock size={16} color={Colors.gold} />
                  <Text style={styles.featuredDetailText}>60 min</Text>
                </View>
                <View style={styles.featuredDetail}>
                  <MapPin size={16} color={Colors.gold} />
                  <Text style={styles.featuredDetailText}>Piano 2</Text>
                </View>
                <View style={styles.featuredDetail}>
                  <Award size={16} color={Colors.gold} />
                  <Text style={styles.featuredDetailText}>300 punti</Text>
                </View>
              </View>
              <Pressable 
                style={({ pressed }) => [
                  styles.featuredButton,
                  pressed && styles.featuredButtonPressed
                ]}
                onPress={() => navigateToTreasureHunt(treasureHunts[0].id)}
              >
                <Text style={styles.featuredButtonText}>Inizia la sfida</Text>
                <ChevronRight size={16} color={Colors.card} />
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tutte le sfide</Text>
        
        <View style={styles.treasureHuntsContainer}>
          {treasureHunts.map(treasureHunt => (
            <TreasureHuntCard 
              key={treasureHunt.id} 
              treasureHunt={treasureHunt}
              progress={getProgressPercentage(treasureHunt.id)}
              status={getStatusText(treasureHunt.id)}
              onPress={() => navigateToTreasureHunt(treasureHunt.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.papyrus,
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightText,
  },
  featuredContainer: {
    margin: 16,
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 16,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
    gap: 4,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.card,
  },
  featuredSubtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  featuredDetails: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  featuredDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredDetailText: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gold,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  featuredButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  featuredButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.card,
    marginRight: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  treasureHuntsContainer: {
    gap: 16,
  },
  spacer: {
    height: 100,
  },
});