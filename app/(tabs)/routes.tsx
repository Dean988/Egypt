import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Route as RouteIcon, Plus, Check, Calendar, Clock, Users, MapPin, MessageSquare, Headphones, X } from 'lucide-react-native';
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

export default function RoutesScreen() {
  const [customizeMode, setCustomizeMode] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [routeCreated, setRouteCreated] = useState(false);
  const [khufuModalVisible, setKhufuModalVisible] = useState(false);
  const [audioGuideModalVisible, setAudioGuideModalVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

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

  const handleRoutePress = (route) => {
    setSelectedRoute(route);
    setAudioGuideModalVisible(true);
  };

  const navigateToRoute = (id) => {
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
            <Text style={styles.modalTitle}>Audio Guide Coming Soon</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setAudioGuideModalVisible(false)}
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
            title="Continue Without Audio" 
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
            <Text style={styles.notifyButtonText}>Notify me when available</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <RouteIcon size={24} color={Colors.gold} />
      </View>
      <Text style={Typography.h1}>Guided Routes</Text>
      <Text style={[Typography.body, styles.subtitle]}>
        Explore the museum with our carefully curated thematic routes
      </Text>
      
      {/* Egyptian decorative element - Updated with new image */}
      <View style={styles.decorativeElement}>
        <Image 
          source={{ uri: 'https://i.imgur.com/KzLa64W.png' }}
          style={styles.decorativeImage}
          resizeMode="cover"
        />
        <View style={styles.decorativeOverlay} />
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
          <Text style={styles.customRouteBannerTitle}>Crea il Tuo Percorso Personalizzato</Text>
          <Text style={styles.customRouteBannerSubtitle}>
            Seleziona le aree che più ti interessano e crea un'esperienza unica
          </Text>
        </View>
        <View style={styles.customRouteBannerIconContainer}>
          <Plus size={24} color={Colors.card} />
        </View>
      </View>
      <EgyptianPattern color={Colors.gold} />
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
          <KhufuIcon size={40} />
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
            <Text style={styles.modalTitle}>Funzionalità in arrivo</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setKhufuModalVisible(false)}
            >
              <X size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
          
          <Image 
            source={{ uri: 'https://i.imgur.com/HF3MtaX.png' }}
            style={styles.khufuImage}
            resizeMode="contain"
          />
          
          <Text style={styles.comingSoonTitle}>Personalizzazione intelligente</Text>
          
          <Text style={styles.comingSoonDescription}>
            Presto Khufu ti farà alcune domande per comprendere i tuoi interessi e creare un percorso 
            personalizzato perfetto per te. Il nostro assistente virtuale analizzerà le tue preferenze 
            e ti suggerirà le opere e le sezioni del museo più adatte al tuo profilo.
          </Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <MessageSquare size={20} color={Colors.gold} />
              <Text style={styles.featureText}>Conversazione interattiva</Text>
            </View>
            <View style={styles.featureItem}>
              <Users size={20} color={Colors.gold} />
              <Text style={styles.featureText}>Percorsi adatti a gruppi o singoli</Text>
            </View>
            <View style={styles.featureItem}>
              <Clock size={20} color={Colors.gold} />
              <Text style={styles.featureText}>Ottimizzazione del tempo di visita</Text>
            </View>
          </View>
          
          <Button 
            title="Torna ai percorsi" 
            onPress={() => setKhufuModalVisible(false)}
            style={styles.returnButton}
          />
        </View>
      </View>
    </Modal>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      {!customizeMode ? (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderHeader()}
          
          {/* Khufu Banner - New addition */}
          {renderKhufuBanner()}
          
          {/* Custom Route Banner */}
          {renderCustomRouteBanner()}
          
          {/* Standard Routes */}
          <View style={styles.standardRoutesContainer}>
            <Text style={styles.standardRoutesTitle}>Percorsi Standard</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.papyrus,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 32,
    color: Colors.lightText,
  },
  decorativeElement: {
    width: '100%',
    height: 200, // Increased height for the new image
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  decorativeImage: {
    width: '100%',
    height: '100%',
  },
  decorativeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slight overlay for better text visibility if needed
  },
  // Khufu Banner - New addition
  khufuBanner: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  khufuBannerContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  khufuIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  khufuBannerTextContainer: {
    flex: 1,
  },
  khufuBannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  khufuBannerSubtitle: {
    fontSize: 14,
    color: Colors.lightText,
  },
  // Custom Route Banner
  customRouteBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.gold,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.card,
    marginBottom: 4,
  },
  customRouteBannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  customRouteBannerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  // Standard Routes Section
  standardRoutesContainer: {
    paddingHorizontal: 16,
  },
  standardRoutesTitle: {
    ...Typography.h2,
    marginBottom: 8,
  },
  standardRoutesSubtitle: {
    ...Typography.body,
    color: Colors.lightText,
    marginBottom: 16,
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
    ...Typography.h1,
    marginBottom: 8,
  },
  customizeSubtitle: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.lightText,
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
    fontWeight: 'bold',
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
    ...Typography.h2,
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.gold,
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
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  ticketPrice: {
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: Colors.papyrus,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    ...Typography.h2,
    color: Colors.gold,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  closeButtonText: {
    fontSize: 24,
    color: Colors.gold,
    lineHeight: 28,
    textAlign: 'center',
  },
  khufuImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  comingSoonTitle: {
    ...Typography.h2,
    textAlign: 'center',
    marginBottom: 12,
  },
  comingSoonDescription: {
    ...Typography.body,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.lightText,
  },
  featuresList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  returnButton: {
    backgroundColor: Colors.gold,
  },
  // Audio Guide Modal
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
  continueButton: {
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