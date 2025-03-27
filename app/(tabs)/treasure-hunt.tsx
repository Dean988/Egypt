import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Trophy, Clock, MapPin, ChevronRight, Sparkles, Award, Search, Filter, Users } from 'lucide-react-native';
import Colors from '@/constants/colors';
import TreasureHuntCard from '@/components/TreasureHuntCard';
import treasureHunts from '@/mocks/treasure-hunts';
import { useUserStore } from '@/store/user-store';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TreasureHuntScreen() {
  const router = useRouter();
  const { treasureHuntProgress } = useUserStore();
  const [activeFilter, setActiveFilter] = useState('all');
  
  const navigateToTreasureHunt = (id: string) => {
    router.push(`/treasure-hunt/${id}`);
  };

  const getProgressPercentage = (treasureHuntId: string) => {
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

  const getStatusText = (treasureHuntId: string) => {
    if (!treasureHuntProgress) return 'Non iniziato';
    
    const huntProgress = treasureHuntProgress[treasureHuntId];
    if (!huntProgress) return 'Non iniziato';
    if (huntProgress.completed) return 'Completato';
    if (huntProgress.currentStep > 0) return 'In corso';
    return 'Non iniziato';
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Header */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: 'https://www.animazione-bomba.it/wp-content/uploads/2019/03/caccia-al-tesoro.jpeg' }} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <View style={styles.bannerTitleContainer}>
              <Text style={styles.bannerTitle}>CACCIA AL TESORO</Text>
              <View style={styles.bannerUnderline} />
            </View>
            <Text style={styles.bannerSubtitle}>Diventa un vero esploratore!</Text>
          </View>
        </View>

        {/* Egyptian-themed header section */}
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Trophy size={24} color={Colors.gold} />
          </View>
          <Text style={styles.headerTitle}>Caccia al Tesoro</Text>
          <Text style={styles.headerSubtitle}>
            Risolvi enigmi e indovinelli per trovare tesori nascosti nel museo
          </Text>
        </View>

        {/* Difficulty Filters */}
        <View style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <Filter size={16} color={Colors.gold} />
            <Text style={styles.filterTitle}>Difficoltà:</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterButtonsContainer}
          >
            <Pressable 
              style={[styles.filterButton, activeFilter === 'all' && styles.filterButtonActive]}
              onPress={() => setActiveFilter('all')}
            >
              <Text style={[styles.filterButtonText, activeFilter === 'all' && styles.filterButtonTextActive]}>
                Tutti
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.filterButton, activeFilter === 'easy' && styles.filterButtonActive]}
              onPress={() => setActiveFilter('easy')}
            >
              <Text style={[styles.filterButtonText, activeFilter === 'easy' && styles.filterButtonTextActive]}>
                Facile
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.filterButton, activeFilter === 'medium' && styles.filterButtonActive]}
              onPress={() => setActiveFilter('medium')}
            >
              <Text style={[styles.filterButtonText, activeFilter === 'medium' && styles.filterButtonTextActive]}>
                Medio
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.filterButton, activeFilter === 'hard' && styles.filterButtonActive]}
              onPress={() => setActiveFilter('hard')}
            >
              <Text style={[styles.filterButtonText, activeFilter === 'hard' && styles.filterButtonTextActive]}>
                Difficile
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.filterButton, activeFilter === 'family' && styles.filterButtonActive]}
              onPress={() => setActiveFilter('family')}
            >
              <Text style={[styles.filterButtonText, activeFilter === 'family' && styles.filterButtonTextActive]}>
                Per famiglie
              </Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Featured Challenge */}
        <View style={styles.featuredContainer}>
          <ImageBackground 
            source={{ uri: 'https://i.imgur.com/Wb48y2z.jpeg' }} 
            style={styles.featuredImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
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
                  <View style={styles.featuredDetail}>
                    <Users size={16} color={Colors.gold} />
                    <Text style={styles.featuredDetailText}>2-4 giocatori</Text>
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

        {/* All Challenges */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>TUTTE LE SFIDE</Text>
            <View style={styles.sectionTitleUnderline} />
          </View>
          
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231f20',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // Banner styling
  bannerContainer: {
    height: 240,
    width: '100%',
    position: 'relative',
    borderBottomWidth: 3,
    borderBottomColor: Colors.gold,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitleContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.8)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 30,
    paddingVertical: 20,
    position: 'relative',
    marginHorizontal: 20,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 4,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textTransform: 'uppercase',
  },
  bannerUnderline: {
    height: 4,
    width: 120,
    backgroundColor: Colors.gold,
    marginBottom: 16,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    borderRadius: 2,
  },
  bannerSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  // Header styling
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8,
  },
  headerSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffff',
    paddingHorizontal: 32,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  // Filter styling
  filterContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.gold,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 0.5,
  },
  filterButtonsContainer: {
    paddingBottom: 8,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(35, 31, 32, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    borderColor: Colors.gold,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  filterButtonTextActive: {
    color: Colors.gold,
    fontWeight: 'bold',
  },
  // Featured Challenge styling
  featuredContainer: {
    margin: 16,
    height: 260,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderWidth: 2,
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
    paddingVertical: 5,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
    gap: 4,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.card,
  },
  featuredSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 1,
  },
  featuredDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gold,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  featuredButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  featuredButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#231f20',
    marginRight: 6,
  },
  // Section styling
  section: {
    paddingHorizontal: 16,
  },
  sectionTitleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  sectionTitleUnderline: {
    height: 3,
    width: 80,
    backgroundColor: Colors.gold,
    borderRadius: 1.5,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  treasureHuntsContainer: {
    gap: 16,
  },
  spacer: {
    height: 100,
  },
});