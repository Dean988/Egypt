import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Footprints, ArrowLeft, Share2, CheckCircle, MapPin } from 'lucide-react-native';
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
    setStartedRoute(true);
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
            <Footprints 
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
            <CheckCircle size={20} color={Colors.success} />
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
              icon={<CheckCircle size={20} color={Colors.card} />}
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
});