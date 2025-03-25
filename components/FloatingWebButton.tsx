import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Pressable, Animated, Image, View, Text, Modal, Linking } from 'react-native';
import { ExternalLink, X } from 'lucide-react-native';
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
                <Text style={styles.modalTitle}>Museo Egizio</Text>
                <Pressable onPress={closeModal} style={styles.closeButton}>
                  <X size={20} color={Colors.text} />
                </Pressable>
              </View>
              
              <EgyptianPattern color={Colors.gold} />
              
              <View style={styles.modalBody}>
                <Image 
                  source={{ uri: 'https://i.imgur.com/J3xdgIL.jpeg' }} 
                  style={styles.museumLogo} 
                  resizeMode="contain"
                />
                
                <Text style={styles.modalDescription}>
                  Scopri tutto il mondo del Museo Egizio sul sito ufficiale
                </Text>
                
                <Pressable style={styles.websiteButton} onPress={openMuseumWebsite}>
                  <Text style={styles.websiteButtonText}>Visita il Sito Ufficiale</Text>
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
    borderWidth: 1,
    borderColor: 'black', // Changed from Colors.gold to black
  },
  image: {
    width: 40,
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    padding: 16,
    alignItems: 'center',
  },
  museumLogo: {
    width: '100%',
    height: 100,
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  websiteButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 8,
  },
  websiteButtonText: {
    color: Colors.card,
    fontWeight: '600',
    fontSize: 16,
  },
});