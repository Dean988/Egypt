import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Clock, MapPin, Trophy, Sparkles, Award } from 'lucide-react-native';
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
  
  // Philosophical exhibit names
  const philosophicalExhibits = exhibits.slice(1, 5).map((exhibit, index) => {
    const customExhibits = [
      {
        name: "L'Oltretomba Egizio",
        description: "Esplora il viaggio dell'anima nell'aldilà secondo gli antichi egizi, attraverso papiri, amuleti e oggetti funerari che illustrano la complessa cosmologia dell'oltretomba."
      },
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

      {/* Recent exhibitions section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Esposizioni Recenti</Text>
          <Pressable style={styles.seeAllButton} onPress={() => router.push('/exhibits')}>
            <Text style={styles.seeAllText}>Vedi tutte</Text>
            <ChevronRight size={16} color={Colors.gold} />
          </Pressable>
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

      {/* Treasure Hunt Promotion - IMPROVED MINIMALIST VERSION */}
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
              imageStyle={{ opacity: 0.25, borderRadius: 12 }}
            >
              <View style={styles.treasureHuntContent}>
                <View style={styles.treasureHuntIconContainer}>
                  <Award size={28} color={Colors.gold} />
                </View>
                <Text style={styles.treasureHuntTitle}>Avventura per Tutta la Famiglia</Text>
                <Text style={styles.treasureHuntDescription}>
                  Scopri i segreti dell'antico Egitto con la nostra caccia al tesoro interattiva.
                </Text>
                <Button 
                  title="Inizia l'Avventura" 
                  onPress={() => navigateToTreasureHunt(featuredTreasureHunt.id)}
                  style={styles.treasureHuntButton}
                  icon={<Sparkles size={18} color={Colors.card} />}
                />
              </View>
            </ImageBackground>
          </View>
        )}
      </View>

      {/* Guided routes section with enhanced styling */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Percorsi Guidati</Text>
          <Pressable style={styles.seeAllButton} onPress={navigateToAllRoutes}>
            <Text style={styles.seeAllText}>Vedi tutti</Text>
            <ChevronRight size={16} color={Colors.gold} />
          </Pressable>
        </View>

        <View style={styles.routeIntroContainer}>
          <ImageBackground
            source={{ uri: 'https://i.imgur.com/Y6xmQGu.png' }}
            style={styles.routeIntroBackground}
            imageStyle={{ opacity: 0.85, borderRadius: 12 }}
          >
            <View style={styles.routeIntroContent}>
              <Text style={styles.routeIntroTitle}>Esplora il Museo con i Nostri Percorsi</Text>
              <Text style={styles.routeIntroText}>
                Scopri itinerari tematici creati dai nostri esperti per un'esperienza immersiva nell'antico Egitto
              </Text>
              <View style={styles.routeButtonsContainer}>
                <Button 
                  title="Scopri i Percorsi" 
                  onPress={navigateToAllRoutes}
                  style={styles.exploreRoutesButton}
                  variant="primary"
                />
                <Button 
                  title="Personalizza con Khufu" 
                  onPress={navigateToCustomRoute}
                  style={styles.customRouteButton}
                  variant="secondary"
                />
              </View>
            </View>
          </ImageBackground>
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

      {/* Promotional banner */}
      <View style={styles.promotionalBanner}>
        <ImageBackground
          source={{ uri: 'https://www.museoegizio.it/wp-content/uploads/2023/03/Museo-Egizio-Torino-Statua-Ramesse-II.jpg' }}
          style={styles.bannerBackground}
          imageStyle={{ opacity: 0.3 }}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Scopri i Tesori dell'Antico Egitto</Text>
            <Text style={styles.bannerSubtitle}>La più grande collezione di antichità egizie fuori dall'Egitto</Text>
            <Button 
              title="Acquista Biglietti" 
              onPress={() => router.push('/tickets')}
              style={styles.bannerButton}
            />
          </View>
        </ImageBackground>
      </View>

      {/* Khufu Game Banner - COMPLETELY REDESIGNED */}
      <View style={styles.khufuGameSection}>
        <ImageBackground
          source={{ uri: 'https://i.imgur.com/HF3MtaX.png' }}
          style={styles.khufuGameBackground}
          imageStyle={{ opacity: 0.15, borderRadius: 16 }}
        >
          <View style={styles.khufuGameOverlay}>
            <View style={styles.khufuGameContent}>
              <View style={styles.khufuGameHeader}>
                <Text style={styles.khufuGameTitle}>La Sfida di Khufu</Text>
                <Text style={styles.khufuGameSubtitle}>10 prove emozionanti nell'Antico Egitto</Text>
              </View>
              
              <View style={styles.khufuGameDetails}>
                <View style={styles.khufuGameRow}>
                  <View style={styles.khufuIconContainer}>
                    <KhufuIcon size={60} />
                  </View>
                  
                  <View style={styles.khufuGameInfo}>
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
  treasureHuntPromo: {
    height: 280, // Increased height to fit content
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
    backgroundColor: Colors.card,
  },
  treasureHuntBackground: {
    width: '100%',
    height: '100%',
  },
  treasureHuntContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treasureHuntIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  treasureHuntTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  treasureHuntDescription: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: '90%',
    lineHeight: 22,
  },
  treasureHuntButton: {
    minWidth: 200,
    paddingVertical: 12,
    marginTop: 8,
  },
  // FIXED: Increased height and adjusted text styling to prevent cutoff
  routeIntroContainer: {
    height: 400, // Increased from 350 to 400 to ensure text isn't cut off
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  routeIntroBackground: {
    width: '100%',
    height: '100%',
  },
  routeIntroContent: {
    flex: 1,
    padding: 32, // Increased padding from 28 to 32
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  routeIntroTitle: {
    fontSize: 24, // Reduced from 26 to 24 to fit better
    fontWeight: 'bold',
    color: Colors.card,
    textAlign: 'center',
    marginBottom: 24, // Increased from 20 to 24
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    maxWidth: '90%', // Added max width to ensure text doesn't overflow
  },
  routeIntroText: {
    fontSize: 16, // Reduced from 18 to 16
    color: Colors.card,
    textAlign: 'center',
    marginBottom: 40, // Increased from 36 to 40
    lineHeight: 22, // Reduced from 26 to 22
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    maxWidth: '85%', // Reduced from 95% to 85% for better readability
  },
  routeButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16, // Increased from 12 to 16
  },
  exploreRoutesButton: {
    minWidth: 160,
    backgroundColor: Colors.gold,
    paddingVertical: 12,
  },
  customRouteButton: {
    minWidth: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: Colors.gold,
    borderWidth: 1,
    paddingVertical: 12,
  },
  routesContainer: {
    gap: 16,
  },
  promotionalBanner: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  bannerBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.nileBlue,
  },
  bannerContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.card,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: Colors.card,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bannerButton: {
    minWidth: 180,
  },
  // COMPLETELY REDESIGNED KHUFU GAME SECTION
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
  },
  khufuGameBackground: {
    width: '100%',
  },
  khufuGameOverlay: {
    backgroundColor: 'rgba(255, 245, 225, 0.9)',
    borderRadius: 16,
  },
  khufuGameContent: {
    padding: 20,
  },
  khufuGameHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  khufuGameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  khufuGameSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  khufuGameDetails: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  khufuGameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  khufuIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.papyrus,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.gold,
    marginRight: 16,
  },
  khufuGameInfo: {
    flex: 1,
  },
  khufuGameFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  khufuGameFeatureText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
  },
  khufuGameButton: {
    backgroundColor: Colors.gold,
    alignSelf: 'center',
    minWidth: 200,
  },
  spacer: {
    height: 100,
  },
});