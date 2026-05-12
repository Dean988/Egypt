import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Clock, Coffee, MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';

const menuItems = [
  {
    id: 'c1',
    name: 'Caffè del Nilo',
    price: '3,50 EUR',
    description: 'Miscela intensa con note di cacao.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'c2',
    name: 'Tè karkadè',
    price: '4,00 EUR',
    description: 'Infuso di ibisco, servito caldo o freddo.',
    image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'c3',
    name: 'Dolce miele e pistacchio',
    price: '5,50 EUR',
    description: 'Pasticceria stratificata con frutta secca.',
    image: 'https://images.unsplash.com/photo-1558326567-98166e232c52?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function CafeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Stack.Screen
        options={{
          title: 'Caffè',
          headerShown: true,
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.gold,
          headerTitleStyle: { fontWeight: '800' },
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, isWide && styles.heroWide]}>
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>Caffetteria</Text>
            <Text style={[styles.title, !isWide && styles.titleCompact]}>
              Una pausa ordinata tra una sala e l’altra.
            </Text>
            <Text style={[styles.subtitle, !isWide && styles.subtitleCompact]}>
              Bevande calde, dolci e proposte leggere disponibili vicino all’ingresso principale.
            </Text>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop' }}
            style={[styles.heroImage, isWide && styles.heroImageWide]}
          />
        </View>

        <View style={[styles.infoGrid, isWide && styles.infoGridWide]}>
          <View style={styles.infoCard}>
            <Clock size={20} color={Colors.deepGold} />
            <Text style={styles.infoTitle}>Orari</Text>
            <Text style={styles.infoText}>Tutti i giorni, 9:00-16:30</Text>
          </View>
          <View style={styles.infoCard}>
            <MapPin size={20} color={Colors.deepGold} />
            <Text style={styles.infoTitle}>Dove si trova</Text>
            <Text style={styles.infoText}>Piano terra, vicino all’ingresso</Text>
          </View>
          <View style={styles.infoCard}>
            <Coffee size={20} color={Colors.deepGold} />
            <Text style={styles.infoTitle}>Servizio</Text>
            <Text style={styles.infoText}>Ritiro veloce e tavoli per una pausa breve</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionLabel}>Menu rapido</Text>
          <Text style={styles.sectionTitle}>Proposte consigliate</Text>
          <View style={[styles.menuGrid, isWide && styles.menuGridWide]}>
            {menuItems.map((item) => (
              <Pressable key={item.id} style={({ pressed }) => [styles.menuCard, isWide && styles.menuCardWide, pressed && styles.pressed]}>
                <Image source={{ uri: item.image }} style={styles.menuImage} />
                <View style={styles.menuBody}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                  <Text style={styles.menuPrice}>{item.price}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 128,
  },
  hero: {
    backgroundColor: Colors.surface,
    padding: 22,
    gap: 18,
  },
  heroWide: {
    minHeight: 340,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 72,
  },
  heroCopy: {
    flex: 1,
    maxWidth: 620,
  },
  kicker: {
    color: Colors.lightGold,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
  },
  title: {
    color: Colors.inverseText,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '800',
  },
  titleCompact: {
    fontSize: 31,
    lineHeight: 37,
    maxWidth: 340,
  },
  subtitle: {
    color: '#E7DCCB',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  subtitleCompact: {
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 340,
  },
  heroImage: {
    width: '100%',
    height: 210,
    borderRadius: 8,
  },
  heroImageWide: {
    width: 420,
    height: 250,
  },
  infoGrid: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: 20,
    gap: 12,
  },
  infoGridWide: {
    flexDirection: 'row',
  },
  infoCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
  },
  infoTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 10,
  },
  infoText: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  menuSection: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    marginTop: 22,
  },
  sectionLabel: {
    color: Colors.deepGold,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 6,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    marginBottom: 16,
  },
  menuGrid: {
    gap: 14,
  },
  menuGridWide: {
    flexDirection: 'row',
  },
  menuCard: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuCardWide: {
    flex: 1,
  },
  menuImage: {
    width: '100%',
    height: 180,
  },
  menuBody: {
    padding: 16,
  },
  menuName: {
    color: Colors.text,
    fontSize: 19,
    fontWeight: '800',
  },
  menuDescription: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  menuPrice: {
    color: Colors.deepGold,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 12,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
});
