import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Award, ChevronRight, Clock, MapPin, Search, Trophy, Users } from 'lucide-react-native';
import Colors from '@/constants/colors';
import treasureHunts from '@/mocks/treasure-hunts';
import { useUserStore } from '@/store/user-store';

const filters = ['Tutti', 'Facile', 'Medio', 'Difficile', 'Famiglie'];

const normalize = (value?: string) => (value || '').toLowerCase();

export default function TreasureHuntScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { treasureHuntProgress } = useUserStore();
  const [activeFilter, setActiveFilter] = useState('Tutti');
  const isWide = width >= 900;

  const filteredHunts = useMemo(() => {
    if (activeFilter === 'Tutti') return treasureHunts;
    if (activeFilter === 'Famiglie') {
      return treasureHunts.filter((hunt) => Number.parseInt(hunt.ageRange || '8', 10) <= 8);
    }
    return treasureHunts.filter((hunt) => normalize(hunt.difficulty).includes(normalize(activeFilter)));
  }, [activeFilter]);

  const getProgressPercentage = (treasureHuntId: string) => {
    const huntProgress = treasureHuntProgress?.[treasureHuntId];
    const treasureHunt = treasureHunts.find((hunt) => hunt.id === treasureHuntId);
    if (!huntProgress || !treasureHunt) return 0;
    if (huntProgress.completed) return 100;
    const totalSteps = treasureHunt.clues?.length || 3;
    return Math.round((huntProgress.currentStep / totalSteps) * 100);
  };

  const openHunt = (id: string) => {
    router.push(`/treasure-hunt/${id}`);
  };

  const featured = treasureHunts[0];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Stack.Screen
        options={{
          title: 'Tesori',
          headerShown: true,
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.gold,
          headerTitleStyle: { fontWeight: '800' },
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, isWide && styles.heroWide]}>
          <View style={styles.heroText}>
            <Text style={styles.kicker}>Cacce al tesoro</Text>
            <Text style={[styles.title, !isWide && styles.titleCompact]}>
              Sfide leggere per esplorare il museo con piu attenzione.
            </Text>
            <Text style={[styles.subtitle, !isWide && styles.subtitleCompact]}>
              Scegli un gioco, segui gli indizi nelle sale e trasforma la visita in una scoperta guidata.
            </Text>
          </View>
          <View style={styles.heroCard}>
            <Trophy size={28} color={Colors.deepGold} />
            <Text style={styles.heroCardTitle}>Sfida consigliata</Text>
            <Text style={styles.heroCardText}>{featured?.name || 'Il Segreto del Faraone'}</Text>
          </View>
        </View>

        <View style={styles.toolbar}>
          <View style={styles.searchBox}>
            <Search size={18} color={Colors.lightText} />
            <Text style={styles.searchPlaceholder}>Scegli per eta, durata o difficolta</Text>
          </View>
        </View>

        <View style={[styles.filters, !isWide && { width: Math.max(width - 36, 0) }]}>
          {filters.map((filter) => {
            const selected = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                style={[styles.filterButton, selected && styles.filterButtonActive]}
                onPress={() => setActiveFilter(filter)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
              >
                <Text style={[styles.filterText, selected && styles.filterTextActive]}>{filter}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.grid, isWide && styles.gridWide]}>
          {filteredHunts.map((hunt) => {
            const progress = getProgressPercentage(hunt.id);
            const started = progress > 0;
            return (
              <Pressable
                key={hunt.id}
                style={({ pressed }) => [styles.card, isWide && styles.cardWide, pressed && styles.pressed]}
                onPress={() => openHunt(hunt.id)}
                accessibilityRole="button"
                accessibilityLabel={`Apri caccia al tesoro ${hunt.name}`}
              >
                <Image source={{ uri: hunt.imageUrl }} style={styles.cardImage} />
                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardKicker}>{hunt.difficulty}</Text>
                    <View style={styles.pointsPill}>
                      <Award size={14} color={Colors.deepGold} />
                      <Text style={styles.pointsText}>{hunt.points || 100}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardTitle}>{hunt.name}</Text>
                  <Text style={styles.cardText} numberOfLines={3}>
                    {hunt.description}
                  </Text>

                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Clock size={15} color={Colors.deepGold} />
                      <Text style={styles.metaText}>{hunt.duration || hunt.estimatedTime} min</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <MapPin size={15} color={Colors.deepGold} />
                      <Text style={styles.metaText}>{hunt.locations || 3} tappe</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Users size={15} color={Colors.deepGold} />
                      <Text style={styles.metaText}>{hunt.ageRange || hunt.ageRecommendation}</Text>
                    </View>
                  </View>

                  {started && (
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                  )}

                  <View style={styles.cardAction}>
                    <Text style={styles.cardActionText}>{started ? 'Continua' : 'Inizia'}</Text>
                    <ChevronRight size={16} color={Colors.deepGold} />
                  </View>
                </View>
              </Pressable>
            );
          })}
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
    minHeight: 360,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 72,
  },
  heroText: {
    flex: 1,
    maxWidth: 660,
  },
  kicker: {
    color: Colors.lightGold,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
  },
  title: {
    color: Colors.inverseText,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
  },
  titleCompact: {
    fontSize: 30,
    lineHeight: 36,
    maxWidth: 345,
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
    maxWidth: 345,
  },
  heroCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 22,
  },
  heroCardTitle: {
    color: Colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    marginTop: 16,
  },
  heroCardText: {
    color: Colors.lightText,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  toolbar: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  searchBox: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
  },
  searchPlaceholder: {
    flex: 1,
    color: Colors.lightText,
    fontSize: 15,
  },
  filters: {
    maxWidth: 1180,
    width: '100%',
    boxSizing: 'border-box' as any,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 4,
  },
  filterButton: {
    minHeight: 40,
    justifyContent: 'center',
    borderRadius: 7,
    paddingHorizontal: 14,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.deepGold,
    borderColor: Colors.deepGold,
  },
  filterText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  grid: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    gap: 14,
  },
  gridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardWide: {
    width: '31.8%',
  },
  cardImage: {
    width: '100%',
    height: 190,
  },
  cardBody: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 8,
  },
  cardKicker: {
    color: Colors.deepGold,
    fontSize: 12,
    fontWeight: '900',
  },
  pointsPill: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 7,
    backgroundColor: Colors.papyrus,
    paddingHorizontal: 8,
  },
  pointsText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  cardTitle: {
    color: Colors.text,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900',
  },
  cardText: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 14,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.deepGold,
  },
  cardAction: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cardActionText: {
    color: Colors.deepGold,
    fontSize: 15,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
});
