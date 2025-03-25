import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ImageBackground } from 'react-native';
import { Stack } from 'expo-router';
import { MessageCircle, MapPin, Route, Brain } from 'lucide-react-native';
import Button from '@/components/Button';
import Colors from '@/constants/colors';

export default function CustomRouteScreen() {
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ 
        title: "Percorso Personalizzato",
        headerStyle: {
          backgroundColor: Colors.card,
        },
        headerTintColor: Colors.text,
      }} />
      
      <View style={styles.heroSection}>
        <ImageBackground
          source={{ uri: 'https://i.imgur.com/HF3MtaX.png' }}
          style={styles.heroBackground}
          imageStyle={{ opacity: 0.2 }}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Personalizza con Khufu</Text>
            <Text style={styles.heroSubtitle}>
              Crea il tuo percorso ideale nel museo
            </Text>
          </View>
        </ImageBackground>
      </View>
      
      <View style={styles.comingSoonContainer}>
        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
        </View>
        
        <Text style={styles.description}>
          Presto potrai creare percorsi personalizzati con l'aiuto di Khufu, la nostra guida AI.
          Rispondi a semplici domande e Khufu creerà un itinerario su misura per te.
        </Text>
        
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <MessageCircle size={24} color={Colors.gold} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Chat Interattiva</Text>
            <Text style={styles.featureDescription}>
              Khufu ti farà domande per capire i tuoi interessi e preferenze
            </Text>
          </View>
        </View>
        
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Brain size={24} color={Colors.gold} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Intelligenza Artificiale</Text>
            <Text style={styles.featureDescription}>
              Algoritmi avanzati per creare percorsi personalizzati in base alle tue risposte
            </Text>
          </View>
        </View>
        
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Route size={24} color={Colors.gold} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Percorsi Ottimizzati</Text>
            <Text style={styles.featureDescription}>
              Itinerari che massimizzano l'esperienza in base al tempo disponibile
            </Text>
          </View>
        </View>
        
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <MapPin size={24} color={Colors.gold} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Navigazione Guidata</Text>
            <Text style={styles.featureDescription}>
              Indicazioni precise per seguire il percorso all'interno del museo
            </Text>
          </View>
        </View>
        
        <View style={styles.notifyContainer}>
          <Text style={styles.notifyText}>Ricevi una notifica quando questa funzione sarà disponibile</Text>
          <Button 
            title="Iscriviti" 
            style={styles.notifyButton}
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.papyrus,
  },
  heroSection: {
    height: 200,
    width: '100%',
    overflow: 'hidden',
  },
  heroBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    maxWidth: '80%',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  comingSoonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  comingSoonBadge: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.card,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featureCard: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.lightText,
    lineHeight: 20,
  },
  notifyContainer: {
    width: '100%',
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  notifyText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  notifyButton: {
    minWidth: 160,
    backgroundColor: Colors.gold,
  },
});