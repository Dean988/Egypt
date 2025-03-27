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
      {/* Background Pattern */}
      <ImageBackground 
        source={{ uri: 'https://www.transparenttextures.com/patterns/papyrus.png' }}
        style={styles.backgroundPattern}
      >
        {/* Header Logo */}
        <View style={styles.headerLogoSection}>
          <Image 
            source={{ uri: 'https://clubsilencio.it/wp-content/uploads/bfi_thumb/logo_museo_egizio-31m7cn4e1fwnkt54zirhymgen6a1crmngd3alc7h9uhqn5cy8.png' }} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>

        {/* Esposizioni in Evidenza */}
        <Pressable style={styles.section} onPress={() => navigateToExhibit(featuredExhibit?.id)}>
          <Image
            source={{ uri: 'https://www.giovanigenitori.it/wp-content/uploads/2023/06/Sala-14b-Galleria-dei-Re-1-scaled.jpg' }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
          <View style={styles.sectionOverlay}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>ESPOSIZIONI IN EVIDENZA</Text>
              <View style={styles.titleUnderline} />
            </View>
          </View>
        </Pressable>

        {/* Consulta la mappa */}
        <Pressable style={styles.section} onPress={() => router.push('/map')}>
          <Image
            source={{ uri: 'https://i.imgur.com/TnY4V9f.png' }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
          <View style={styles.sectionOverlay}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>CONSULTA LA MAPPA</Text>
              <View style={styles.titleUnderline} />
            </View>
          </View>
        </Pressable>

        {/* Acquista Biglietti */}
        <Pressable style={styles.section} onPress={() => router.push('/tickets')}>
          <Image
            source={{ uri: 'https://api.museoegizio.it/wp-content/uploads/2021/10/MicrosoftTeams-image-1-1024x1024.jpg' }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
          <View style={styles.sectionOverlay}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>ACQUISTA BIGLIETTI</Text>
              <View style={styles.titleUnderline} />
            </View>
          </View>
        </Pressable>

        {/* Percorsi Guidati */}
        <Pressable style={styles.section} onPress={() => router.push('/routes')}>
          <Image
            source={{ uri: 'https://i.imgur.com/WbalJdK.png' }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
          <View style={styles.sectionOverlay}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>SCEGLI IL TUO PERCORSO</Text>
              <View style={styles.titleUnderline} />
            </View>
          </View>
        </Pressable>

        {/* Caccia al Tesoro */}
        <Pressable style={styles.section} onPress={() => navigateToTreasureHunt(featuredTreasureHunt.id)}>
          <Image
            source={{ uri: 'https://i.imgur.com/Wb48y2z.jpeg' }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
          <View style={styles.sectionOverlay}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>CACCIA AL TESORO</Text>
              <View style={styles.titleUnderline} />
            </View>
          </View>
        </Pressable>

        {/* Sfida di Khufu */}
        <Pressable style={styles.section} onPress={() => navigateToKhufuGame()}>
          <Image
            source={{ uri: 'https://i.imgur.com/HVEHK8O.jpeg' }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
          <View style={styles.sectionOverlay}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>SFIDA DI KHUFU</Text>
              <View style={styles.titleUnderline} />
            </View>
          </View>
        </Pressable>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231f20', // Dark background color for Egyptian feel
  },
  backgroundPattern: {
    width: '100%',
    flex: 1,
  },
  headerLogoSection: {
    width: '100%',
    height: 150,
    backgroundColor: '#231f20',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#d4af37', // Gold border
  },
  headerLogo: {
    width: 250,
    height: 100,
  },
  section: {
    width: '100%',
    height: 265, // Slightly reduced height
    position: 'relative',
    marginBottom: 4, // Slightly larger gap between sections
    overflow: 'hidden', // To ensure the border radius works
    borderRadius: 4, // Subtle rounded corners
  },
  sectionImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  sectionOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly darker overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    borderWidth: 2, // Thicker border
    borderColor: '#d4af37', // Gold border
    borderStyle: 'solid',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker background
    paddingHorizontal: 24,
    paddingVertical: 14, // More vertical padding
    minWidth: '80%',
    // Egyptian-style border decoration
    borderLeftWidth: 5,
    borderRightWidth: 5,
    // Shadow effect
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d4af37', // Egyptian gold color
    textAlign: 'center',
    letterSpacing: 2.5, // More letter spacing
    textTransform: 'uppercase',
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3, // More pronounced shadow
  },
  titleUnderline: {
    height: 3, // Thicker underline
    width: '100%',
    backgroundColor: '#d4af37', // Gold underline
    marginTop: 10,
    // Decorative effect
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});