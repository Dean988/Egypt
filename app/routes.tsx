import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, ImageBackground, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Clock, MapPin, Users, Star, Filter, Search } from 'lucide-react-native';
import Colors from '@/constants/colors';
import routes from '@/mocks/routes';

const { width } = Dimensions.get('window');

export default function RoutesScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Tutti');

  const filters = ['Tutti', 'Principali', 'Tematici', 'Famiglia', 'Brevi'];

  // Function to render filter buttons
  const renderFilterButton = (title) => (
    <TouchableOpacity 
      key={title}
      style={[
        styles.filterButton, 
        selectedFilter === title ? styles.filterButtonActive : null
      ]}
      onPress={() => setSelectedFilter(title)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === title ? styles.filterButtonTextActive : null
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  // Function to render route card
  const renderRouteCard = ({ item }) => (
    <Pressable 
      style={styles.routeCard}
      onPress={() => router.push(`/route/${item.id}`)}
    >
      {/* Elemento decorativo egizio (angolo superiore sinistro) */}
      <View style={styles.egyptianCorner} />
      
      <View style={styles.routeImageContainer}>
        <Image 
          source={{ uri: item.imageUrl || 'https://i.imgur.com/PgFbi2Q.png' }}
          style={styles.routeImage}
          resizeMode="cover"
        />
        <View style={styles.routeDuration}>
          <Clock size={14} color="#d4af37" />
          <Text style={styles.routeDurationText}>{item.duration || '45 min'}</Text>
        </View>
      </View>
      
      <View style={styles.routeContent}>
        <Text style={styles.routeName}>{item.name}</Text>
        
        <View style={styles.routeDetails}>
          <View style={styles.routeDetailItem}>
            <MapPin size={14} color="#d4af37" />
            <Text style={styles.routeDetailText}>{item.exhibits || '7'} esposizioni</Text>
          </View>
          
          <View style={styles.routeDetailItem}>
            <Users size={14} color="#d4af37" />
            <Text style={styles.routeDetailText}>{item.difficulty || 'Facile'}</Text>
          </View>
          
          <View style={styles.routeRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={14} 
                color={star <= (item.rating || 4) ? "#d4af37" : "rgba(212, 175, 55, 0.3)"} 
                fill={star <= (item.rating || 4) ? "#d4af37" : "transparent"}
              />
            ))}
          </View>
        </View>
        
        <Text style={styles.routeDescription} numberOfLines={2}>
          {item.description || "Esplora le meraviglie dell'antico Egitto attraverso questo percorso che ti guiderà tra i manufatti più importanti del museo."}
        </Text>
        
        <TouchableOpacity style={styles.viewRouteButton}>
          <View style={styles.hieroglyphicAccent} />
          <Text style={styles.viewRouteButtonText}>SCOPRI IL PERCORSO</Text>
          <View style={styles.hieroglyphicAccent} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://www.transparenttextures.com/patterns/papyrus.png' }}
        style={styles.backgroundPattern}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={24} color="#d4af37" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerDecorLeft} />
            <Text style={styles.headerTitle}>PERCORSI GUIDATI</Text>
            <View style={styles.headerDecorRight} />
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Main banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://i.imgur.com/PgFbi2Q.png' }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <View style={styles.bannerTextContainer}>
              <View style={styles.ankh} />
              <Text style={styles.bannerTitle}>SCOPRI I TESORI DEL MUSEO</Text>
              <View style={styles.titleUnderline} />
              <Text style={styles.bannerSubtitle}>
                Esplora la nostra collezione attraverso percorsi tematici studiati per te
              </Text>
            </View>
          </View>
        </View>

        {/* Filter section */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {filters.map(renderFilterButton)}
          </ScrollView>
          
          <TouchableOpacity style={styles.filterIconButton}>
            <Filter size={20} color="#d4af37" />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color="rgba(212, 175, 55, 0.7)" />
            <Text style={styles.searchPlaceholder}>Cerca percorsi...</Text>
          </View>
        </View>

        {/* Routes list */}
        <FlatList
          data={routes.length > 0 ? routes : Array(5).fill({})}
          renderItem={renderRouteCard}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          contentContainerStyle={styles.routesList}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
      
      {/* Elementi decorativi sugli angoli della pagina */}
      <View style={styles.cornerTopLeft} />
      <View style={styles.cornerTopRight} />
      <View style={styles.cornerBottomLeft} />
      <View style={styles.cornerBottomRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231f20',
    position: 'relative', // Per posizionare gli elementi decorativi agli angoli
  },
  backgroundPattern: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(35, 31, 32, 0.95)',
    borderBottomWidth: 2,
    borderBottomColor: '#d4af37',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDecorLeft: {
    width: 15,
    height: 2,
    backgroundColor: '#d4af37',
    marginRight: 10,
  },
  headerDecorRight: {
    width: 15,
    height: 2,
    backgroundColor: '#d4af37',
    marginLeft: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d4af37',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bannerContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#d4af37',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTextContainer: {
    padding: 20,
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.5)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  ankh: {
    width: 24,
    height: 36,
    borderWidth: 2,
    borderColor: '#d4af37',
    borderRadius: 12,
    position: 'absolute',
    top: -24,
    backgroundColor: '#231f20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleUnderline: {
    height: 3,
    width: 100,
    backgroundColor: '#d4af37',
    marginBottom: 12,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  filterScrollContent: {
    paddingRight: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.8)',
  },
  filterButtonText: {
    color: '#d4af37',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#231f20',
    fontWeight: 'bold',
  },
  filterIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  searchPlaceholder: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 8,
  },
  routesList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  routeCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d4af37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    position: 'relative',
  },
  egyptianCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 16,
    height: 16,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#d4af37',
    zIndex: 1,
  },
  routeImageContainer: {
    width: 120,
    position: 'relative',
  },
  routeImage: {
    width: '100%',
    height: '100%',
  },
  routeDuration: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d4af37',
    zIndex: 2,
  },
  routeDurationText: {
    color: '#d4af37',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  routeContent: {
    flex: 1,
    padding: 14,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  routeDetails: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  routeDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  routeDetailText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
  },
  routeRating: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  routeDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 14,
    lineHeight: 20,
  },
  viewRouteButton: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#d4af37',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hieroglyphicAccent: {
    width: 4,
    height: 10,
    backgroundColor: '#d4af37',
    opacity: 0.6,
    marginHorizontal: 6,
  },
  viewRouteButtonText: {
    color: '#d4af37',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderTopLeftRadius: 2,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderTopRightRadius: 2,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderBottomLeftRadius: 2,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderBottomRightRadius: 2,
  },
}); 