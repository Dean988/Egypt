import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, ScrollView, Modal, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Route as RouteIcon, Plus, Check, Calendar, Clock, Users, MapPin, MessageSquare, Headphones, X, Search, Filter } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import RouteCard from '@/components/RouteCard';
import routes from '@/mocks/routes';
import Button from '@/components/Button';
import EgyptianPattern from '@/components/EgyptianPattern';
import KhufuIcon from '@/components/KhufuIcon';

// Custom route options
const customRouteOptions = [
  {
    id: 'custom1',
    name: 'Tomba degli ignoti',
    imageUrl: 'https://live.staticflickr.com/65535/52456280408_fcc27a54c3_h.jpg'
  },
  {
    id: 'custom2',
    name: 'Tomba di Kha',
    imageUrl: 'https://laciviltaegizia.org/wp-content/uploads/2021/08/182509399_10218380284049439_7191573175524753088_n.jpg?w=426'
  },
  {
    id: 'custom3',
    name: 'Valle delle regine',
    imageUrl: 'https://archeologiavocidalpassato.com/wp-content/uploads/2019/12/nefertari_kansas-city_exhibition-01.jpg'
  },
  {
    id: 'custom4',
    name: 'Epoca Romana e tardoantica',
    imageUrl: 'https://parentesistoriche.altervista.org/wp-content/uploads/2018/10/Ancient-Rome.jpg'
  },
  {
    id: 'custom5',
    name: 'Epoca tolemaica',
    imageUrl: 'https://mediterraneoantico.it/wp-content/uploads/2022/10/310962681_466585275503024_7816123596886801039_n.jpeg'
  },
  {
    id: 'custom6',
    name: 'Gli scavi nella valle delle regine',
    imageUrl: 'https://i0.wp.com/www.danielemancini-archeologia.it/wp-content/uploads/2016/12/regine.jpg?fit=1024%2C690&ssl=1'
  }
];

// Define a Route interface
interface Route {
  id: string;
  [key: string]: any;
}

export default function RoutesScreen() {
  const [customizeMode, setCustomizeMode] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [routeCreated, setRouteCreated] = useState(false);
  const [khufuModalVisible, setKhufuModalVisible] = useState(false);
  const [audioGuideModalVisible, setAudioGuideModalVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const toggleOption = (id: string) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const createCustomRoute = () => {
    setRouteCreated(true);
  };

  const resetCustomization = () => {
    setCustomizeMode(false);
    setSelectedOptions([]);
    setRouteCreated(false);
  };

  const openKhufuCustomization = () => {
    setKhufuModalVisible(true);
  };

  const handleRoutePress = (route: Route) => {
    setSelectedRoute(route);
    setAudioGuideModalVisible(true);
  };

  const navigateToRoute = (id: string) => {
    router.push(`/route/${id}`);
  };

  // Audio Guide Coming Soon Modal
  const renderAudioGuideModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={audioGuideModalVisible}
      onRequestClose={() => setAudioGuideModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Audioguida in Arrivo</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setAudioGuideModalVisible(false)}
            >
              <X size={24} color={Colors.gold} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
          >
            <Image 
              source={{ uri: 'https://i.imgur.com/omIl34C.png' }}
              style={styles.audioGuideImage}
              resizeMode="contain"
            />
            
            <Text style={styles.modalDescription}>
              La nostra audioguida immersiva per questo percorso è attualmente in fase di sviluppo. 
              Presto potrai esplorare il museo con narrazioni di esperti e approfondimenti affascinanti 
              su ogni esposizione.
            </Text>
            
            <View style={styles.audioFeatures}>
              <View style={styles.audioFeature}>
                <Headphones size={20} color={Colors.gold} />
                <Text style={styles.audioFeatureText}>Narrazione professionale</Text>
              </View>
              <View style={styles.audioFeature}>
                <MapPin size={20} color={Colors.gold} />
                <Text style={styles.audioFeatureText}>Contenuti basati sulla posizione</Text>
              </View>
              <View style={styles.audioFeature}>
                <Clock size={20} color={Colors.gold} />
                <Text style={styles.audioFeatureText}>Disponibile 24/7</Text>
              </View>
            </View>
            
            <Button 
              title="Continua senza Audioguida" 
              onPress={() => {
                setAudioGuideModalVisible(false);
                if (selectedRoute) {
                  navigateToRoute(selectedRoute.id);
                }
              }}
              style={styles.continueButton}
            />
            
            <TouchableOpacity 
              style={styles.notifyButton}
              onPress={() => {
                setAudioGuideModalVisible(false);
              }}
            >
              <Text style={styles.notifyButtonText}>Avvisami quando disponibile</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Main banner with new image */}
      <View style={styles.bannerContainer}>
        <Image 
          source={{ uri: 'https://i.imgur.com/cTccwr4.png' }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay}>
          <View style={styles.bannerTitleContainer}>
            <Text style={styles.bannerTitle}>PERCORSI GUIDATI</Text>
            <View style={styles.bannerUnderline} />
          </View>
          <Text style={styles.bannerSubtitle}>Esplora le meraviglie dell'antico Egitto</Text>
        </View>
      </View>

      {/* Egyptian-themed header section */}
      <View style={styles.headerContent}>
        <View style={styles.iconContainer}>
          <Image 
            source={{ uri: 'https://i.imgur.com/48eXmiV.png' }}
            style={styles.routeIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerTitle}>Percorsi Guidati</Text>
        <Text style={styles.headerSubtitle}>
          Scopri itinerari tematici curati dai nostri egittologi
        </Text>
      </View>

      {/* Filter section */}
      <View style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <Filter size={16} color={Colors.gold} />
          <Text style={styles.filterTitle}>Filtra per:</Text>
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
            style={[styles.filterButton, activeFilter === 'popular' && styles.filterButtonActive]}
            onPress={() => setActiveFilter('popular')}
          >
            <Text style={[styles.filterButtonText, activeFilter === 'popular' && styles.filterButtonTextActive]}>
              Più popolari
            </Text>
          </Pressable>
          <Pressable 
            style={[styles.filterButton, activeFilter === 'short' && styles.filterButtonActive]}
            onPress={() => setActiveFilter('short')}
          >
            <Text style={[styles.filterButtonText, activeFilter === 'short' && styles.filterButtonTextActive]}>
              Brevi (&lt; 60 min)
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
          <Pressable 
            style={[styles.filterButton, activeFilter === 'artifacts' && styles.filterButtonActive]}
            onPress={() => setActiveFilter('artifacts')}
          >
            <Text style={[styles.filterButtonText, activeFilter === 'artifacts' && styles.filterButtonTextActive]}>
              Tesori nascosti
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={18} color="#d4af37" style={styles.searchIcon} />
          <TextInput
            placeholder="Cerca un percorso..."
            placeholderTextColor="rgba(212, 175, 55, 0.6)"
            style={styles.searchInput}
          />
        </View>
      </View>
    </View>
  );

  const renderCustomizeSection = () => (
    <View style={styles.customizeSection}>
      <View style={styles.customizeHeader}>
        <Text style={styles.customizeTitle}>Personalizza il tuo percorso</Text>
        <Text style={styles.customizeSubtitle}>
          Seleziona le aree che desideri visitare per creare un percorso personalizzato
        </Text>
      </View>
      
      <ScrollView 
        horizontal={false} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        {customRouteOptions.map(option => (
          <Pressable 
            key={option.id}
            style={[
              styles.optionCard,
              selectedOptions.includes(option.id) && styles.optionCardSelected
            ]}
            onPress={() => toggleOption(option.id)}
          >
            <Image 
              source={{ uri: option.imageUrl }} 
              style={styles.optionImage} 
              resizeMode="cover"
            />
            <View style={styles.optionOverlay}>
              <Text style={styles.optionName}>{option.name}</Text>
              {selectedOptions.includes(option.id) && (
                <View style={styles.checkmarkContainer}>
                  <Check size={16} color={Colors.card} />
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
      
      {!routeCreated ? (
        <View style={styles.customizeActions}>
          <Button 
            title="Crea percorso personalizzato" 
            onPress={createCustomRoute} 
            disabled={selectedOptions.length === 0}
            style={styles.createButton}
          />
          <Button 
            title="Annulla" 
            onPress={resetCustomization} 
            variant="outline"
            style={styles.cancelButton}
          />
        </View>
      ) : (
        <View style={styles.routeCreatedContainer}>
          <View style={styles.routeCreatedHeader}>
            <Text style={styles.routeCreatedTitle}>Percorso Personalizzato Creato!</Text>
            <EgyptianPattern color={Colors.gold} />
          </View>
          
          <View style={styles.routeDetails}>
            <View style={styles.routeDetailItem}>
              <Calendar size={20} color={Colors.gold} />
              <Text style={styles.routeDetailText}>Disponibile oggi</Text>
            </View>
            
            <View style={styles.routeDetailItem}>
              <Clock size={20} color={Colors.gold} />
              <Text style={styles.routeDetailText}>Durata: {selectedOptions.length * 15} minuti</Text>
            </View>
            
            <View style={styles.routeDetailItem}>
              <MapPin size={20} color={Colors.gold} />
              <Text style={styles.routeDetailText}>{selectedOptions.length} aree selezionate</Text>
            </View>
            
            <View style={styles.routeDetailItem}>
              <Users size={20} color={Colors.gold} />
              <Text style={styles.routeDetailText}>Adatto a tutte le età</Text>
            </View>
          </View>
          
          <View style={styles.ticketContainer}>
            <Text style={styles.ticketTitle}>Biglietto Percorso Personalizzato</Text>
            <Text style={styles.ticketPrice}>€ 8,00</Text>
            <Text style={styles.ticketDescription}>
              Include accesso alle aree selezionate con guida audio personalizzata
            </Text>
            
            <View style={styles.ticketActions}>
              <Button 
                title="Acquista Biglietto" 
                style={styles.buyButton}
                onPress={() => {}}
              />
              <Button 
                title="Modifica Percorso" 
                variant="outline"
                style={styles.modifyButton}
                onPress={() => setRouteCreated(false)}
              />
            </View>
          </View>
          
          <Button 
            title="Torna ai percorsi standard" 
            variant="outline"
            style={styles.backButton}
            onPress={resetCustomization}
          />
        </View>
      )}
    </View>
  );

  // Custom route banner for the main screen
  const renderCustomRouteBanner = () => (
    <Pressable 
      style={styles.customRouteBanner}
      onPress={() => setCustomizeMode(true)}
    >
      <View style={styles.customRouteBannerContent}>
        <View style={styles.customRouteBannerTextContainer}>
          <Text style={styles.customRouteBannerTitle}>Crea il Tuo Percorso</Text>
          <Text style={styles.customRouteBannerSubtitle}>
            Seleziona le aree che più ti interessano e crea un'esperienza unica
          </Text>
        </View>
        <View style={styles.customRouteBannerIconContainer}>
          <Plus size={24} color={Colors.gold} />
        </View>
      </View>
    </Pressable>
  );

  // Khufu personalized route banner
  const renderKhufuBanner = () => (
    <Pressable 
      style={styles.khufuBanner}
      onPress={openKhufuCustomization}
    >
      <View style={styles.khufuBannerContent}>
        <View style={styles.khufuIconContainer}>
          <Image 
            source={{ uri: 'https://i.imgur.com/HF3MtaX.png' }}
            style={styles.khufuIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.khufuBannerTextContainer}>
          <Text style={styles.khufuBannerTitle}>Personalizza con Khufu</Text>
          <Text style={styles.khufuBannerSubtitle}>
            Lascia che il nostro assistente virtuale crei un percorso su misura per te
          </Text>
        </View>
      </View>
    </Pressable>
  );

  // Khufu Coming Soon Modal
  const renderKhufuModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={khufuModalVisible}
      onRequestClose={() => setKhufuModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Personalizzazione</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setKhufuModalVisible(false)}
            >
              <X size={24} color={Colors.gold} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
          >
            <View style={styles.khufuImageContainer}>
              <Image 
                source={{ uri: 'https://i.imgur.com/ZKuCvSG.png' }}
                style={styles.khufuImage}
                resizeMode="cover"
              />
            </View>
            
            <View style={styles.khufuTitleContainer}>
              <Text style={styles.comingSoonTitle}>Khufu, La Tua Guida</Text>
              <View style={styles.titleDecorativeLine} />
            </View>
            
            <Text style={styles.comingSoonDescription}>
              Presto Khufu ti farà alcune domande per creare un percorso 
              personalizzato. L'assistente analizzerà le tue preferenze 
              e ti suggerirà le opere più adatte a te.
            </Text>
            
            <View style={styles.featuresList}>
              <Text style={styles.featuresTitle}>Funzionalità In Arrivo:</Text>
              <View style={styles.featureItem}>
                <MessageSquare size={20} color={Colors.gold} />
                <Text style={styles.featureText}>Conversazione interattiva con AI</Text>
              </View>
              <View style={styles.featureItem}>
                <Users size={20} color={Colors.gold} />
                <Text style={styles.featureText}>Percorsi adatti a gruppi o singoli</Text>
              </View>
              <View style={styles.featureItem}>
                <Clock size={20} color={Colors.gold} />
                <Text style={styles.featureText}>Ottimizzazione del tempo in base ai tuoi interessi</Text>
              </View>
            </View>
            
            <Button 
              title="Torna ai percorsi" 
              onPress={() => setKhufuModalVisible(false)}
              style={styles.returnButton}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.backgroundContainer}>
        {!customizeMode ? (
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {renderHeader()}
            
            {/* Khufu Banner */}
            {renderKhufuBanner()}
            
            {/* Custom Route Banner */}
            {renderCustomRouteBanner()}
            
            {/* Standard Routes */}
            <View style={styles.standardRoutesContainer}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.standardRoutesTitle}>Percorsi Standard</Text>
                <View style={styles.titleUnderline} />
              </View>
              <Text style={styles.standardRoutesSubtitle}>
                Esplora i nostri percorsi tematici curati dagli esperti
              </Text>
              
              {routes.map(route => (
                <RouteCard 
                  key={route.id} 
                  route={route} 
                  onPress={() => handleRoutePress(route)} 
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <ScrollView 
            contentContainerStyle={styles.customizeContent}
            showsVerticalScrollIndicator={false}
          >
            {renderCustomizeSection()}
          </ScrollView>
        )}
        
        {/* Khufu Coming Soon Modal */}
        {renderKhufuModal()}

        {/* Audio Guide Coming Soon Modal */}
        {renderAudioGuideModal()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231f20',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#231f20',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // New banner styling
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
    fontWeight: 'bold' as const,
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
  // Enhanced header content
  header: {
    marginBottom: 24,
  },
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
  routeIcon: {
    width: 40,
    height: 40,
    tintColor: Colors.gold,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold' as const,
    color: Colors.gold,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    fontWeight: 'normal' as const,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  // Filter section
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
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: Colors.gold,
    marginLeft: 6,
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
    fontSize: 13,
    color: '#ffffff',
    fontWeight: 'normal' as const,
  },
  filterButtonTextActive: {
    color: Colors.card,
    fontWeight: 'bold' as const,
  },
  // Search bar
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    height: 50,
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  // Enhanced Khufu Banner
  khufuBanner: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(35, 31, 32, 0.9)',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  khufuBannerContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  khufuIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  khufuIcon: {
    width: 50,
    height: 50,
    tintColor: Colors.gold,
  },
  khufuBannerTextContainer: {
    flex: 1,
  },
  khufuBannerTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.gold,
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  khufuBannerSubtitle: {
    fontSize: 15,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    lineHeight: 20,
  },
  // Custom Route Banner
  customRouteBanner: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(35, 31, 32, 0.9)',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  customRouteBannerContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customRouteBannerTextContainer: {
    flex: 1,
  },
  customRouteBannerTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.gold,
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  customRouteBannerSubtitle: {
    fontSize: 15,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    lineHeight: 20,
  },
  customRouteBannerIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  // Standard Routes Section
  standardRoutesContainer: {
    paddingHorizontal: 16,
  },
  sectionTitleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  standardRoutesTitle: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: Colors.gold,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  titleUnderline: {
    height: 3,
    width: 80,
    backgroundColor: Colors.gold,
    borderRadius: 1.5,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  standardRoutesSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  customizeContent: {
    paddingBottom: 32,
  },
  customizeSection: {
    padding: 16,
  },
  customizeHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  customizeTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#333333',
    marginBottom: 8,
  },
  customizeSubtitle: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  optionCard: {
    width: '48%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionCardSelected: {
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  optionImage: {
    width: '100%',
    height: '100%',
  },
  optionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionName: {
    color: 'white',
    fontWeight: 'bold' as const,
    fontSize: 14,
    flex: 1,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customizeActions: {
    marginTop: 16,
    gap: 12,
  },
  createButton: {
    backgroundColor: Colors.gold,
  },
  cancelButton: {
    borderColor: Colors.gold,
  },
  // Route Created Section
  routeCreatedContainer: {
    marginTop: 16,
  },
  routeCreatedHeader: {
    marginBottom: 16,
  },
  routeCreatedTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.gold,
    textAlign: 'center',
    marginBottom: 8,
  },
  routeDetails: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  routeDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeDetailText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  ticketContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  ticketPrice: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.gold,
    marginBottom: 8,
  },
  ticketDescription: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 16,
  },
  ticketActions: {
    gap: 12,
  },
  buyButton: {
    backgroundColor: Colors.gold,
  },
  modifyButton: {
    borderColor: Colors.gold,
  },
  backButton: {
    borderColor: Colors.gold,
    marginTop: 8,
  },
  // Khufu Modal - Coming Soon
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#231f20',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gold,
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.gold,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  khufuImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.gold,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  khufuImage: {
    width: '100%',
    height: 250,
  },
  comingSoonTitle: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: Colors.gold,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  comingSoonDescription: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    paddingHorizontal: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  featuresList: {
    marginBottom: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.5)',
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.2)',
    paddingBottom: 12,
    width: '100%',
  },
  featureText: {
    fontSize: 15,
    color: '#ffffff',
    marginLeft: 12,
    flex: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    lineHeight: 20,
  },
  returnButton: {
    backgroundColor: Colors.gold,
    borderRadius: 8,
    marginTop: 8,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  // Audio Guide Modal
  audioGuideImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  modalDescription: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  audioFeatures: {
    width: '100%',
    marginBottom: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.5)',
  },
  audioFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.2)',
    paddingBottom: 10,
  },
  audioFeatureText: {
    fontSize: 15,
    color: '#ffffff',
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  continueButton: {
    width: '100%',
    marginBottom: 12,
    backgroundColor: Colors.gold,
    borderRadius: 8,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  notifyButton: {
    padding: 8,
  },
  notifyButtonText: {
    fontSize: 14,
    color: Colors.gold,
    textDecorationLine: 'underline',
  },
  khufuTitleContainer: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  titleDecorativeLine: {
    height: 3,
    width: 120,
    backgroundColor: Colors.gold,
    marginTop: 8,
    borderRadius: 1.5,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.gold,
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});