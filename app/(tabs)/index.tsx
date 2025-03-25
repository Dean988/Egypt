import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Clock, MapPin, Trophy, Sparkles, Award, Star, Compass, Calendar } from 'lucide-react-native';
import Colors from '@/constants/colors';
import FeaturedExhibit from '@/components/FeaturedExhibit';
import ExhibitCard from '@/components/ExhibitCard';
import exhibits from '@/mocks/exhibits';
import routes from '@/mocks/routes';
import treasureHunts from '@/mocks/treasure-hunts';
import RouteCard from '@/components/RouteCard';
import Button from '@/components/Button';
import TreasureHuntCard from '@/components/TreasureHuntCard';
import KhufuIcon from '@/components/KhufuIcon';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  
  const featuredExhibit = exhibits[0] ? {
    ...exhibits[0],
    name: "Esposizioni da non perdere",
    description: "Un viaggio attraverso le meraviglie dell'antico Egitto. Scopri i simboli del potere, i rituali sacri e l'eredità eterna dei sovrani che hanno plasmato una delle più grandi civiltà della storia.",
  } : null;
  
  // Philosophical exhibit names - REMOVED L'Oltretomba Egizio
  const philosophicalExhibits = exhibits.slice(1, 5).map((exhibit, index) => {
    const customExhibits = [
      {
        name: "Il Linguaggio degli Dei",
        description: "Un'immersione nei geroglifici e nei sistemi di scrittura che hanno permesso agli egizi di comunicare con le divinità e preservare la loro conoscenza attraverso i millenni."
      },
      {
        name: "Equilibrio Cosmico: Ma'at",
        description: "Scopri il concetto di Ma'at, il principio di verità, giustizia ed equilibrio cosmico che governava ogni aspetto della vita e della morte nell'antico Egitto."
      },
      {
        name: "Divinità e Trasformazione",
        description: "Un'esplorazione delle divinità egizie e del loro potere di trasformazione, rappresentate attraverso statue, amuleti e oggetti rituali."
      },
      {
        name: "Architettura Monumentale",
        description: "Esplora le meraviglie architettoniche dell'antico Egitto, dalle piramidi ai templi, e scopri i segreti della loro costruzione e il loro significato simbolico."
      }
    ];
    
    return {
      ...exhibit,
      ...(customExhibits[index] || {})
    };
  });
  
  // Only show 1 featured route
  const featuredRoutes = routes.slice(0, 1);
  
  // Featured treasure hunt
  const featuredTreasureHunt = treasureHunts[0];

  const navigateToExhibit = (id) => {
    if (id) {
      router.push(`/exhibit/${id}`);
    }
  };

  const navigateToRoute = (id) => {
    if (id) {
      router.push(`/route/${id}`);
    }
  };

  const navigateToAllRoutes = () => {
    router.push('/routes');
  };
  
  const navigateToTreasureHunt = (id) => {
    if (id) {
      router.push(`/treasure-hunt/${id}`);
    }
  };
  
  const navigateToAllTreasureHunts = () => {
    router.push('/treasure-hunt');
  };
  
  const navigateToKhufuGame = () => {
    router.push('/khufu-game');
  };
  
  const navigateToCustomRoute = () => {
    router.push('/custom-route');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Enhanced header with background */}
      <View style={styles.headerWrapper}>
        <ImageBackground 
          source={{ uri: 'https://www.transparenttextures.com/patterns/papyrus.png' }} 
          style={styles.headerBackground}
          imageStyle={{ opacity: 0.1 }}
        >
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://i.imgur.com/J3xdgIL.jpeg' }} 
              style={styles.logo}
              resizeMode="contain"
            />
            {/* New subtitle text added below the logo */}
            <Text style={styles.headerSubtitle}>
              Scopri l'antico Egitto nella sua essenza
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Featured exhibit with enhanced styling */}
      {featuredExhibit && (
        <View style={styles.featuredWrapper}>
          <Text style={styles.featuredTitle}>Esposizione in Evidenza</Text>
          <FeaturedExhibit 
            exhibit={featuredExhibit} 
            onPress={() => navigateToExhibit(featuredExhibit.id)} 
          />
        </View>
      )}

      {/* Recent exhibitions section - UPDATED TITLE */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Novità ed eventi</Text>
          {/* Removed "Vedi tutte" button as requested */}
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.exhibitsContainer}
        >
          {philosophicalExhibits.map(exhibit => (
            <ExhibitCard 
              key={exhibit.id} 
              exhibit={exhibit} 
              onPress={() => navigateToExhibit(exhibit.id)} 
              style={styles.exhibitCard}
            />
          ))}
        </ScrollView>
        
        <View style={styles.scrollIndicator}>
          <View style={styles.scrollDot} />
          <View style={[styles.scrollDot, styles.scrollDotActive]} />
          <View style={styles.scrollDot} />
        </View>
      </View>

      {/* Treasure Hunt Promotion - COMPLETELY REDESIGNED */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Caccia al Tesoro</Text>
          <Pressable style={styles.seeAllButton} onPress={navigateToAllTreasureHunts}>
            <Text style={styles.seeAllText}>Vedi tutte</Text>
            <ChevronRight size={16} color={Colors.gold} />
          </Pressable>
        </View>
        
        {featuredTreasureHunt && (
          <View style={styles.treasureHuntPromo}>
            <ImageBackground
              source={{ uri: 'https://i.imgur.com/Wb48y2z.jpeg' }}
              style={styles.treasureHuntBackground}
              imageStyle={{ borderRadius: 16 }}
            >
              <View style={styles.treasureHuntOverlay}>
                <View style={styles.treasureHuntContent}>
                  <View style={styles.treasureHuntHeader}>
                    <View style={styles.treasureHuntIconContainer}>
                      <Award size={28} color={Colors.gold} />
                    </View>
                    <View style={styles.treasureHuntTitleContainer}>
                      <Text style={styles.treasureHuntTitle}>Avventura per Tutta la Famiglia</Text>
                      <Text style={styles.treasureHuntSubtitle}>Sfida i misteri dell'antico Egitto</Text>
                    </View>
                  </View>
                  
                  <View style={styles.treasureHuntFeatures}>
                    <View style={styles.treasureHuntFeature}>
                      <Star size={18} color={Colors.gold} />
                      <Text style={styles.treasureHuntFeatureText}>Enigmi interattivi</Text>
                    </View>
                    <View style={styles.treasureHuntFeature}>
                      <Trophy size={18} color={Colors.gold} />
                      <Text style={styles.treasureHuntFeatureText}>Premi esclusivi</Text>
                    </View>
                    <View style={styles.treasureHuntFeature}>
                      <Compass size={18} color={Colors.gold} />
                      <Text style={styles.treasureHuntFeatureText}>Esplorazione guidata</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.treasureHuntDescription}>
                    Scopri i segreti dell'antico Egitto con la nostra caccia al tesoro interattiva. Un'esperienza coinvolgente per visitatori di tutte le età.
                  </Text>
                  
                  <Button 
                    title="Inizia l'Avventura" 
                    onPress={() => navigateToTreasureHunt(featuredTreasureHunt.id)}
                    style={styles.treasureHuntButton}
                    icon={<Sparkles size={18} color={Colors.card} />}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
      </View>

      {/* COMPLETELY REDESIGNED GUIDED ROUTES SECTION */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Percorsi Guidati</Text>
          <Pressable style={styles.seeAllButton} onPress={navigateToAllRoutes}>
            <Text style={styles.seeAllText}>Vedi tutti</Text>
            <ChevronRight size={16} color={Colors.gold} />
          </Pressable>
        </View>

        {/* NEW DESIGN: Split into two cards side by side */}
        <View style={styles.guidedRoutesContainer}>
          {/* Left Card - Discover Routes */}
          <View style={styles.routeCard}>
            <ImageBackground
              source={{ uri: 'https://i.imgur.com/Y6xmQGu.png' }}
              style={styles.routeCardBackground}
              imageStyle={{ opacity: 0.7, borderRadius: 16 }}
            >
              <View style={styles.routeCardOverlay}>
                <View style={styles.routeCardIconContainer}>
                  <MapPin size={32} color={Colors.gold} />
                </View>
                <Text style={styles.routeCardTitle}>Scopri i Percorsi</Text>
                <View style={styles.routeCardFeatures}>
                  <View style={styles.routeCardFeature}>
                    <Calendar size={16} color={Colors.card} />
                    <Text style={styles.routeCardFeatureText}>Percorsi tematici</Text>
                  </View>
                  <View style={styles.routeCardFeature}>
                    <Clock size={16} color={Colors.card} />
                    <Text style={styles.routeCardFeatureText}>Durata ottimizzata</Text>
                  </View>
                </View>
                <Button 
                  title="Scopri" 
                  onPress={navigateToAllRoutes}
                  style={styles.routeCardButton}
                  variant="primary"
                  size="medium"
                  icon={<Compass size={18} color="#FFF" />}
                />
              </View>
            </ImageBackground>
          </View>

          {/* Right Card - Customize with Khufu */}
          <View style={styles.routeCard}>
            <ImageBackground
              source={{ uri: 'https://i.imgur.com/MYUwW9s.png' }}
              style={styles.routeCardBackground}
              imageStyle={{ opacity: 0.7, borderRadius: 16 }}
            >
              <View style={styles.routeCardOverlay}>
                <View style={[styles.routeCardIconContainer, styles.khufuIconContainer]}>
                  <Sparkles size={32} color={Colors.gold} />
                </View>
                <Text style={styles.routeCardTitle}>Personalizza con Khufu</Text>
                <View style={styles.routeCardFeatures}>
                  <View style={styles.routeCardFeature}>
                    <Star size={16} color={Colors.card} />
                    <Text style={styles.routeCardFeatureText}>Percorso su misura</Text>
                  </View>
                  <View style={styles.routeCardFeature}>
                    <Trophy size={16} color={Colors.card} />
                    <Text style={styles.routeCardFeatureText}>Esperienza unica</Text>
                  </View>
                </View>
                <Button 
                  title="Personalizza" 
                  onPress={navigateToCustomRoute}
                  style={styles.routeCardButton}
                  variant="primary"
                  size="medium"
                  icon={<Sparkles size={18} color="#FFF" />}
                />
              </View>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.routesContainer}>
          {featuredRoutes.map(route => (
            <RouteCard 
              key={route.id} 
              route={route} 
              onPress={() => navigateToRoute(route.id)} 
            />
          ))}
        </View>
      </View>

      {/* Promotional banner - REDESIGNED */}
      <View style={styles.promotionalBanner}>
        <ImageBackground
          source={{ uri: 'https://api.museoegizio.it/wp-content/uploads/2021/10/MicrosoftTeams-image-1-1024x1024.jpg' }}
          style={styles.bannerBackground}
          imageStyle={{ borderRadius: 12 }}
        >
          <View style={styles.bannerOverlay}>
            <View style={styles.bannerContent}>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>Scopri i Tesori dell'Antico Egitto</Text>
                <Text style={styles.bannerSubtitle}>La più grande collezione di antichità egizie fuori dall'Egitto</Text>
              </View>
              <Button 
                title="Acquista Biglietti" 
                onPress={() => router.push('/tickets')}
                style={styles.bannerButton}
              />
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Khufu Game Banner - COMPLETELY REDESIGNED */}
      <View style={styles.khufuGameSection}>
        <ImageBackground
          source={{ uri: 'https://i.imgur.com/HVEHK8O.jpeg' }}
          style={styles.khufuGameBackground}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.khufuGameOverlay}>
            <View style={styles.khufuGameContent}>
              <View style={styles.khufuGameHeader}>
                <Text style={styles.khufuGameTitle}>La Sfida di Khufu</Text>
                <Text style={styles.khufuGameSubtitle}>10 prove emozionanti nell'Antico Egitto</Text>
              </View>
              
              <View style={styles.khufuGameDetails}>
                <View style={styles.khufuGameFeatures}>
                  <View style={styles.khufuGameFeature}>
                    <Award size={16} color={Colors.gold} />
                    <Text style={styles.khufuGameFeatureText}>Fino a 200 punti per prova</Text>
                  </View>
                  
                  <View style={styles.khufuGameFeature}>
                    <Clock size={16} color={Colors.gold} />
                    <Text style={styles.khufuGameFeatureText}>6 minuti per ogni sfida</Text>
                  </View>
                  
                  <View style={styles.khufuGameFeature}>
                    <Trophy size={16} color={Colors.gold} />
                    <Text style={styles.khufuGameFeatureText}>Premi esclusivi per i vincitori</Text>
                  </View>
                </View>
                
                <Button 
                  title="Gioca Ora" 
                  onPress={navigateToKhufuGame}
                  style={styles.khufuGameButton}
                  size="large"
                  icon={<Sparkles size={18} color="#FFF" />}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
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
  headerWrapper: {
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gold,
    marginBottom: 16,
  },
  headerBackground: {
    width: '100%',
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.9,
    height: 120,
  },
  // New style for the subtitle
  headerSubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.gold,
    marginTop: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  featuredWrapper: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.gold,
    marginRight: 4,
  },
  exhibitsContainer: {
    paddingBottom: 8,
    paddingRight: 16,
  },
  exhibitCard: {
    marginRight: 16,
    width: 200,
  },
  scrollIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  scrollDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  scrollDotActive: {
    backgroundColor: Colors.gold,
    width: 16,
  },
  // TREASURE HUNT SECTION
  treasureHuntPromo: {
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
    backgroundColor: Colors.card,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  treasureHuntBackground: {
    width: '100%',
    height: '100%',
  },
  treasureHuntOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'space-between',
  },
  treasureHuntContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  treasureHuntHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  treasureHuntIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  treasureHuntTitleContainer: {
    flex: 1,
  },
  treasureHuntTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.card,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  treasureHuntSubtitle: {
    fontSize: 16,
    color: Colors.card,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  treasureHuntFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  treasureHuntFeature: {
    alignItems: 'center',
    flex: 1,
  },
  treasureHuntFeatureText: {
    fontSize: 12,
    color: Colors.card,
    marginTop: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  treasureHuntDescription: {
    fontSize: 14,
    color: Colors.card,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  treasureHuntButton: {
    alignSelf: 'center',
    minWidth: 200,
    paddingVertical: 12,
  },
  
  // COMPLETELY REDESIGNED GUIDED ROUTES SECTION - NEW CARD LAYOUT
  guidedRoutesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  routeCard: {
    flex: 1,
    height: 420, // Increased height to ensure buttons are visible
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  routeCardBackground: {
    width: '100%',
    height: '100%',
  },
  routeCardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeCardIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  khufuIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  routeCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.card,
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  routeCardFeatures: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    marginBottom: 16,
  },
  routeCardFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeCardFeatureText: {
    fontSize: 14,
    color: Colors.card,
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  routeCardButton: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: 30, // Increased bottom margin to ensure button visibility
    backgroundColor: Colors.gold, // Changed to dark yellow
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    paddingVertical: 16, // Increased padding for better visibility
  },
  routesContainer: {
    gap: 16,
  },
  
  // PROMOTIONAL BANNER
  promotionalBanner: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bannerBackground: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  bannerTextContainer: {
    marginTop: 20,
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.card,
    textAlign: 'left',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    maxWidth: '90%',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: Colors.card,
    textAlign: 'left',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    maxWidth: '80%',
  },
  bannerButton: {
    alignSelf: 'flex-start',
    minWidth: 180,
    marginBottom: 20,
  },
  // KHUFU GAME SECTION
  khufuGameSection: {
    marginTop: 32,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 360,
  },
  khufuGameBackground: {
    width: '100%',
    height: '100%',
  },
  khufuGameOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'space-between',
  },
  khufuGameContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  khufuGameHeader: {
    alignItems: 'flex-start',
    marginBottom: 16,
    marginTop: 10,
  },
  khufuGameTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.card,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  khufuGameSubtitle: {
    fontSize: 16,
    color: Colors.card,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  khufuGameDetails: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  khufuGameFeatures: {
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  khufuGameFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  khufuGameFeatureText: {
    fontSize: 14,
    color: Colors.card,
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  khufuGameButton: {
    backgroundColor: Colors.gold,
    alignSelf: 'flex-start',
    minWidth: 160,
  },
  spacer: {
    height: 100,
  },
});