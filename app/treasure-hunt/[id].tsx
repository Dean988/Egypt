import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, Modal } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, MapPin, Trophy, ArrowLeft, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import EgyptianPattern from '@/components/EgyptianPattern';
import treasureHunts from '@/mocks/treasure-hunts';

export default function TreasureHuntDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isComingSoonVisible, setIsComingSoonVisible] = useState(false);

  // Find the treasure hunt by ID or use the first one as fallback
  const treasureHunt = treasureHunts.find(hunt => hunt.id === id) || treasureHunts[0];

  if (!treasureHunt) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            title: "Treasure Hunt",
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={styles.backButton}>
                <ArrowLeft size={24} color={Colors.text} />
              </Pressable>
            ),
          }}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Treasure hunt not found</Text>
          <Button title="Go Back" onPress={() => router.back()} style={styles.errorButton} />
        </View>
      </SafeAreaView>
    );
  }

  const handleStartHunt = () => {
    // Show coming soon modal instead of navigating
    setIsComingSoonVisible(true);
  };

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.description}>{treasureHunt.description}</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Clock size={20} color={Colors.gold} />
          <Text style={styles.infoText}>{treasureHunt.duration} minutes</Text>
        </View>
        <View style={styles.infoItem}>
          <MapPin size={20} color={Colors.gold} />
          <Text style={styles.infoText}>{treasureHunt.locations} locations</Text>
        </View>
        <View style={styles.infoItem}>
          <Trophy size={20} color={Colors.gold} />
          <Text style={styles.infoText}>{treasureHunt.difficulty} difficulty</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What You'll Discover</Text>
        <Text style={styles.sectionText}>
          Follow the clues to uncover the secrets of ancient Egypt. Each step will lead you to a new artifact or location within the museum, where you'll learn fascinating facts and solve puzzles.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepContainer}>
          {[1, 2, 3].map(step => (
            <View key={step} style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step}</Text>
              </View>
              <Text style={styles.stepTitle}>
                {step === 1 ? 'Follow the Clues' : step === 2 ? 'Solve Puzzles' : 'Earn Rewards'}
              </Text>
              <Text style={styles.stepDescription}>
                {step === 1 
                  ? 'Each clue will guide you to a specific location or exhibit in the museum.'
                  : step === 2 
                    ? 'At each location, solve a puzzle or answer a question to proceed.'
                    : 'Complete all steps to earn a special digital badge and a small prize at the museum shop.'
                }
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      <Button 
        title="Start the Hunt" 
        onPress={handleStartHunt}
        style={styles.startButton}
      />
    </View>
  );

  const renderReviewsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.reviewsTitle}>Reviews from Adventurers</Text>
      
      {[
        {
          id: 1,
          name: "Marco B.",
          rating: 5,
          comment: "Un'esperienza fantastica per tutta la famiglia! I bambini si sono divertiti molto a risolvere gli enigmi e hanno imparato tante cose nuove sull'antico Egitto.",
          date: "2 weeks ago"
        },
        {
          id: 2,
          name: "Giulia T.",
          rating: 4,
          comment: "Molto divertente e ben organizzato. Alcune sfide sono un po' difficili per i bambini più piccoli, ma nel complesso è stata un'ottima esperienza.",
          date: "1 month ago"
        },
        {
          id: 3,
          name: "Alessandro M.",
          rating: 5,
          comment: "La caccia al tesoro ha reso la visita al museo molto più coinvolgente. I miei figli non volevano più andare via!",
          date: "2 months ago"
        }
      ].map(review => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>{review.name}</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <Text key={star} style={[styles.star, star <= review.rating && styles.starFilled]}>★</Text>
              ))}
            </View>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen 
        options={{
          title: treasureHunt.name,
          headerLeft: () => (
            <Pressable onPress={() => router.push("/treasure-hunt")} style={styles.backButton}>
              <ArrowLeft size={24} color={Colors.text} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: treasureHunt.imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Featured</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{treasureHunt.name}</Text>
          
          <View style={styles.tabsContainer}>
            <Pressable 
              style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
              onPress={() => setActiveTab('overview')}
            >
              <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
            </Pressable>
            <Pressable 
              style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Reviews</Text>
            </Pressable>
          </View>
          
          <EgyptianPattern color={Colors.gold} />
          
          {activeTab === 'overview' ? renderOverviewTab() : renderReviewsTab()}
        </View>
      </ScrollView>

      {/* Coming Soon Modal */}
      <Modal
        visible={isComingSoonVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsComingSoonVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Coming Soon!</Text>
              <Pressable 
                style={styles.closeButton} 
                onPress={() => setIsComingSoonVisible(false)}
              >
                <X size={24} color={Colors.text} />
              </Pressable>
            </View>
            
            <EgyptianPattern color={Colors.gold} />
            
            <View style={styles.modalContent}>
              <Image 
                source={{ uri: 'https://i.imgur.com/0O8COhb.png' }} 
                style={styles.comingSoonImage}
                resizeMode="contain"
              />
              
              <Text style={styles.comingSoonTitle}>
                Treasure Hunt Under Construction
              </Text>
              
              <Text style={styles.comingSoonText}>
                Our team of archaeologists is working hard to prepare an exciting treasure hunt experience for you. This feature will be available soon!
              </Text>
              
              <Button 
                title="I'll Check Back Later" 
                onPress={() => setIsComingSoonVisible(false)}
                style={styles.comingSoonButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.papyrus,
  },
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  badgeContainer: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  badgeText: {
    color: Colors.card,
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.gold,
  },
  tabText: {
    fontSize: 16,
    color: Colors.lightText,
  },
  activeTabText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  tabContent: {
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  stepContainer: {
    gap: 16,
  },
  step: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.card,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.lightText,
  },
  startButton: {
    marginTop: 8,
    marginBottom: 32,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: Colors.border,
    marginLeft: 2,
  },
  starFilled: {
    color: Colors.gold,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.lightText,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
  },
  errorButton: {
    minWidth: 120,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  modalContent: {
    padding: 16,
    alignItems: 'center',
  },
  comingSoonImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  comingSoonButton: {
    minWidth: 200,
  },
});