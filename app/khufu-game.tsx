import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ImageBackground, Dimensions, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { Award, Clock, Trophy, Brain, Sparkles, ArrowRight, Star } from 'lucide-react-native';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import KhufuIcon from '@/components/KhufuIcon';

const { width } = Dimensions.get('window');

export default function KhufuGameScreen() {
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ 
        title: "Sfida di Khufu",
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
            <View style={styles.khufuIconWrapper}>
              <KhufuIcon size={80} />
            </View>
            <Text style={styles.heroTitle}>La Sfida di Khufu</Text>
            <Text style={styles.heroSubtitle}>
              Metti alla prova le tue conoscenze sull'Antico Egitto
            </Text>
          </View>
        </ImageBackground>
      </View>
      
      <View style={styles.comingSoonContainer}>
        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
        </View>
        
        <Text style={styles.description}>
          La sfida di Khufu sarà presto disponibile! Preparati a mettere alla prova le tue conoscenze 
          sull'Antico Egitto in un'avventura interattiva unica.
        </Text>
        
        <View style={styles.gameInfoCard}>
          <Text style={styles.gameInfoTitle}>Il Gioco</Text>
          <Text style={styles.gameInfoDescription}>
            Khufu, il nostro affascinante gattino e guida nell'Antico Egitto, metterà alla prova le tue conoscenze, 
            la tua astuzia e la tua creatività attraverso un'emozionante challenge interattiva.
          </Text>
          
          <View style={styles.divider} />
          
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Brain size={24} color={Colors.gold} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>10 Prove Emozionanti</Text>
              <Text style={styles.featureDescription}>
                Affronta sfide ambientate tra piramidi, tombe misteriose e antichi papiri
              </Text>
            </View>
          </View>
          
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Clock size={24} color={Colors.gold} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Tempo Limitato</Text>
              <Text style={styles.featureDescription}>
                6 minuti per ogni prova, per un totale di 60 minuti di gioco
              </Text>
            </View>
          </View>
          
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Award size={24} color={Colors.gold} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Sistema di Punteggio</Text>
              <Text style={styles.featureDescription}>
                Fino a 200 punti per prova, basati su conoscenza, astuzia e creatività
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.prizesSection}>
          <Text style={styles.prizesSectionTitle}>Premi per i Vincitori</Text>
          
          <View style={styles.prizeCard}>
            <View style={styles.prizeHeader}>
              <Trophy size={24} color={Colors.gold} />
              <Text style={styles.prizeTitle}>1° Classificato</Text>
            </View>
            <Text style={styles.prizeDescription}>
              Sconto speciale sullo store e sulla ristorazione del bar
            </Text>
          </View>
          
          <View style={styles.prizeCard}>
            <View style={styles.prizeHeader}>
              <Trophy size={24} color={Colors.silver} />
              <Text style={styles.prizeTitle}>2° Classificato</Text>
            </View>
            <Text style={styles.prizeDescription}>
              Sconto sullo store del museo
            </Text>
          </View>
          
          <View style={styles.prizeCard}>
            <View style={styles.prizeHeader}>
              <Trophy size={24} color={Colors.bronze} />
              <Text style={styles.prizeTitle}>3° Classificato</Text>
            </View>
            <Text style={styles.prizeDescription}>
              Sconto sulla ristorazione del bar
            </Text>
          </View>
        </View>
        
        <View style={styles.notifyContainer}>
          <Text style={styles.notifyText}>Ricevi una notifica quando il gioco sarà disponibile</Text>
          <Button 
            title="Iscriviti" 
            style={styles.notifyButton}
            onPress={() => {}}
            icon={<ArrowRight size={18} color="#FFF" />}
            iconPosition="right"
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
    height: 280,
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
  khufuIconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroSubtitle: {
    fontSize: 18,
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
  gameInfoCard: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameInfoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  gameInfoDescription: {
    fontSize: 15,
    color: Colors.text,
    marginBottom: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
    width: '100%',
  },
  featureRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
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
  prizesSection: {
    width: '100%',
    marginBottom: 32,
  },
  prizesSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  prizeCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  prizeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  prizeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 12,
  },
  prizeDescription: {
    fontSize: 14,
    color: Colors.lightText,
    paddingLeft: 36,
  },
  notifyContainer: {
    width: '100%',
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
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