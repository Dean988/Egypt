import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Pressable, Animated, Image, View, Text, Modal, Linking } from 'react-native';
import { ExternalLink, X, Clock, MapPin, Info } from 'lucide-react-native';
import Colors from '@/constants/colors';
import EgyptianPattern from './EgyptianPattern';

export default function FloatingWebButton() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation).start();

    return () => {
      scaleAnim.stopAnimation();
    };
  }, []);

  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openMuseumWebsite = () => {
    Linking.openURL('https://museoegizio.it/');
    closeModal();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        style={styles.button}
        onPress={handlePress}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', radius: 28 }}
      >
        <Image 
          source={{ uri: 'https://i.imgur.com/vJA0yqT.png' }} 
          style={styles.image} 
          resizeMode="contain"
        />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>MUSEO EGIZIO</Text>
                <Pressable onPress={closeModal} style={styles.closeButton}>
                  <X size={20} color={Colors.card} />
                </Pressable>
              </View>
              
              <EgyptianPattern color={Colors.gold} />
              
              <View style={styles.modalBody}>
                <Image 
                  source={{ uri: 'https://api.museoegizio.it/wp-content/uploads/2021/10/MicrosoftTeams-image-1-1024x1024.jpg' }} 
                  style={styles.heroImage} 
                  resizeMode="cover"
                />
                
                <View style={styles.logoContainer}>
                  <Image 
                    source={{ uri: 'https://clubsilencio.it/wp-content/uploads/bfi_thumb/logo_museo_egizio-31m7cn4e1fwnkt54zirhymgen6a1crmngd3alc7h9uhqn5cy8.png' }} 
                    style={styles.museumLogo} 
                    resizeMode="contain"
                  />
                </View>
                
                <Text style={styles.modalDescription}>
                  Il Museo Egizio di Torino è considerato, per valore e quantità dei reperti, il più importante al mondo dopo quello del Cairo.
                </Text>
                
                <View style={styles.infoCardsContainer}>
                  <View style={styles.infoRow}>
                    <View style={styles.infoCardCompact}>
                      <Clock size={22} color={Colors.gold} />
                      <Text style={styles.infoCardTitle}>Orari</Text>
                      <Text style={styles.infoCardText}>
                        Tutti i giorni: 9:00 - 18:30
                      </Text>
                    </View>
                    
                    <View style={styles.infoCardCompact}>
                      <MapPin size={22} color={Colors.gold} />
                      <Text style={styles.infoCardTitle}>Dove Siamo</Text>
                      <Text style={styles.infoCardText}>
                        Via Accademia delle Scienze, 6
                      </Text>
                    </View>
                  </View>
                </View>
                
                <Pressable style={styles.websiteButton} onPress={openMuseumWebsite}>
                  <Text style={styles.websiteButtonText}>VISITA IL SITO UFFICIALE</Text>
                  <ExternalLink size={18} color={Colors.card} />
                </Pressable>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100, // Positioned in top right, not too high
    right: 16,
    zIndex: 100,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 40,
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#231f20',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  modalContent: {
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.gold,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#231f20',
    letterSpacing: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBody: {
    padding: 0,
  },
  heroImage: {
    width: '100%',
    height: 160,
    borderBottomWidth: 2,
    borderBottomColor: Colors.gold,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 16,
  },
  museumLogo: {
    width: 180,
    height: 80,
    backgroundColor: 'rgba(35, 31, 32, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gold,
    paddingHorizontal: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
    paddingHorizontal: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  infoCardsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCardCompact: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.5)',
    alignItems: 'center',
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.gold,
    marginTop: 6,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  infoCardText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 16,
  },
  websiteButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  websiteButtonText: {
    color: '#231f20',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  }
});