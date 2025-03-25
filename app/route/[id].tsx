import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable, Modal, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Route as RouteIcon, Plus, Check, Calendar, Clock, Users, MapPin, MessageSquare, Headphones, X, Share2, ArrowLeft } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import Button from '@/components/Button';
import ExhibitCard from '@/components/ExhibitCard';
import routes from '@/mocks/routes';
import exhibits from '@/mocks/exhibits';
import { useUserStore } from '@/store/user-store';
import { LinearGradient } from 'expo-linear-gradient';

export default function RouteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [startedRoute, setStartedRoute] = useState(false);
  const [showAudioGuideModal, setShowAudioGuideModal] = useState(false);
  
  const route = routes.find(r => r.id === id);
  const visitedRoutes = useUserStore(state => state.progress.visitedRoutes);
  const markRouteAsVisited = useUserStore(state => state.markRouteAsVisited);
  
  const isVisited = visitedRoutes.includes(id);
  
  if (!route) {
    return (
      <View style={styles.notFound}>
        <Text style={Typography.h2}>Route not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }
  
  const routeExhibits = exhibits.filter(exhibit => route.exhibits.includes(exhibit.id));
  
  const handleStartRoute = () => {
    setShowAudioGuideModal(true);
  };
  
  const handleCompleteRoute = () => {
    markRouteAsVisited(id);
    setStartedRoute(false);
  };
  
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
  
  const renderHeader = () => (
    <>
      <View style={styles.imageContainer}>
        <Image source={{ uri: route.imageUrl }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageGradient}
        />
        <View style={styles.imageContent}>
          {route.thematic && (
            <View style={[styles.thematicBadge, { backgroundColor: route.themeColor || Colors.gold }]}>
              <Text style={styles.thematicText}>Thematic Route</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={Typography.h1}>{route.name}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Clock size={20} color={Colors.nileBlue} />
            <Text style={styles.infoText}>{route.duration} min</Text>
          </View>
          
          <View style={styles.infoItem}>
            <RouteIcon 
              size={20} 
              color={getDifficultyColor(route.difficulty)} 
            />
            <Text style={[
              styles.infoText, 
              { color: getDifficultyColor(route.difficulty) }
            ]}>
              {route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1)}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <MapPin size={20} color={Colors.nileBlue} />
            <Text style={styles.infoText}>
              {route.exhibits.length} exhibits
            </Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <Text style={Typography.body}>{route.description}</Text>
        
        {isVisited && (
          <View style={styles.completedBadge}>
            <Check size={20} color={Colors.success} />
            <Text style={styles.completedText}>You've completed this route</Text>
          </View>
        )}
        
        {startedRoute && !isVisited && (
          <View style={styles.routeProgress}>
            <Text style={styles.routeProgressTitle}>Route Progress</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.progressText}>Follow the exhibits in order</Text>
          </View>
        )}
        
        <Text style={[Typography.h3, styles.exhibitsTitle]}>
          Exhibits on this Route
        </Text>
      </View>
    </>
  );

  // Audio Guide Coming Soon Modal
  const renderAudioGuideModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showAudioGuideModal}
      onRequestClose={() => setShowAudioGuideModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Audio Guide Coming Soon</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowAudioGuideModal(false)}
            >
              <X size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
          
          <Image 
            source={{ uri: 'https://i.imgur.com/omIl34C.png' }}
            style={styles.audioGuideImage}
            resizeMode="contain"
          />
          
          <Text style={styles.modalDescription}>
            Our immersive audio guide for this route is currently in development. Soon you'll be able to explore the museum with expert narration and fascinating insights about each exhibit.
          </Text>
          
          <View style={styles.audioFeatures}>
            <View style={styles.audioFeature}>
              <Headphones size={20} color={Colors.gold} />
              <Text style={styles.audioFeatureText}>Professional narration</Text>
            </View>
            <View style={styles.audioFeature}>
              <MapPin size={20} color={Colors.gold} />
              <Text style={styles.audioFeatureText}>Location-based content</Text>
            </View>
            <View style={styles.audioFeature}>
              <Clock size={20} color={Colors.gold} />
              <Text style={styles.audioFeatureText}>Available 24/7</Text>
            </View>
          </View>
          
          <Button 
            title="Start Route Without Audio" 
            onPress={() => {
              setShowAudioGuideModal(false);
              setStartedRoute(true);
            }}
            style={styles.startRouteButton}
          />
          
          <TouchableOpacity 
            style={styles.notifyButton}
            onPress={() => {
              setShowAudioGuideModal(false);
            }}
          >
            <Text style={styles.notifyButtonText}>Notify me when available</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: route.name,
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <ArrowLeft size={24} color={Colors.text} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => {}} style={styles.headerButton}>
              <Share2 size={24} color={Colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <FlatList
          data={routeExhibits}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View>
              {startedRoute && index > 0 && (
                <View style={styles.routeConnector}>
                  <View style={styles.routeConnectorLine} />
                  <Text style={styles.routeConnectorText}>{Math.floor(Math.random() * 50) + 20}m</Text>
                </View>
              )}
              <ExhibitCard exhibit={item} />
            </View>
          )}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.footer}>
          {!startedRoute && !isVisited ? (
            <Button 
              title="Start Route" 
              onPress={handleStartRoute} 
              fullWidth
              icon={<MapPin size={20} color={Colors.card} />}
            />
          ) : startedRoute ? (
            <Button 
              title="Complete Route" 
              onPress={handleCompleteRoute} 
              fullWidth
              variant="secondary"
              icon={<Check size={20} color={Colors.card} />}
            />
          ) : (
            <Button 
              title="Start Again" 
              onPress={handleStartRoute} 
              fullWidth
              variant="outline"
              icon={<MapPin size={20} color={Colors.gold} />}
            />
          )}
        </View>

        {/* Audio Guide Coming Soon Modal */}
        {renderAudioGuideModal()}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.papyrus,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
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
    height: '50%',
  },
  imageContent: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  thematicBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  thematicText: {
    color: Colors.card,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.nileBlue,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gold,
    marginBottom: 16,
  },
  exhibitsTitle: {
    marginTop: 24,
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.gold,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  completedText: {
    color: Colors.success,
    fontWeight: '600',
  },
  routeProgress: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  routeProgressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: Colors.text,
  },
  routeConnector: {
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  routeConnectorLine: {
    width: 2,
    height: 40,
    backgroundColor: Colors.gold,
    marginBottom: 4,
  },
  routeConnectorText: {
    fontSize: 12,
    color: Colors.lightText,
    fontWeight: '500',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: Colors.papyrus,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 500,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  closeButton: {
    padding: 4,
  },
  audioGuideImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  audioFeatures: {
    width: '100%',
    marginBottom: 24,
  },
  audioFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  audioFeatureText: {
    fontSize: 16,
    color: Colors.text,
  },
  startRouteButton: {
    width: '100%',
    marginBottom: 12,
  },
  notifyButton: {
    padding: 8,
  },
  notifyButtonText: {
    fontSize: 14,
    color: Colors.gold,
    textDecorationLine: 'underline',
  },
});