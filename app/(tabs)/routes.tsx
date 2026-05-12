import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Clock, Compass, MapPin, Search, Sparkles, Users } from 'lucide-react-native';
import Colors from '@/constants/colors';
import routes from '@/mocks/routes';

const filters = ['Tutti', 'Brevi', 'Famiglie', 'Consigliati'];

export default function GuidedRoutesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState('Tutti');
  const [query, setQuery] = useState('');
  const isWide = width >= 920;

  const visibleRoutes = useMemo(() => {
    return routes.filter((route) => {
      const matchesQuery = `${route.name} ${route.description}`.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === 'Tutti' ||
        (filter === 'Brevi' && route.duration <= 50) ||
        (filter === 'Famiglie' && route.difficulty === 'easy') ||
        (filter === 'Consigliati' && route.recommended);
      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Stack.Screen
        options={{
          title: 'Percorsi',
          headerShown: true,
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.gold,
          headerTitleStyle: { fontWeight: '800' },
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, isWide && styles.heroWide]}>
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>Percorsi guidati</Text>
            <Text style={[styles.title, !isWide && styles.titleCompact]}>
              Scegli un itinerario in base al tempo e al tipo di visita.
            </Text>
            <Text style={[styles.subtitle, !isWide && styles.subtitleCompact]}>
              Ogni percorso unisce sale, opere e contesto storico per evitare giri confusi dentro il museo.
            </Text>
          </View>
          <Image
            source={{ uri: 'https://i.imgur.com/cTccwr4.png' }}
            style={[styles.heroImage, isWide && styles.heroImageWide]}
          />
        </View>

        <View style={styles.tools}>
          <View style={styles.searchBox}>
            <Search size={18} color={Colors.lightText} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
              placeholder="Cerca percorso"
              placeholderTextColor={Colors.lightText}
            />
          </View>
          <View style={[styles.filterRow, !isWide && { width: Math.max(width - 36, 0) }]}>
            {filters.map((item) => (
              <Pressable
                key={item}
                style={[styles.filterChip, filter === item && styles.filterChipActive]}
                onPress={() => setFilter(item)}
                accessibilityRole="button"
                accessibilityState={{ selected: filter === item }}
              >
                <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.grid, isWide && styles.gridWide]}>
          {visibleRoutes.map((route) => (
            <Pressable
              key={route.id}
              style={({ pressed }) => [styles.routeCard, isWide && styles.routeCardWide, pressed && styles.pressed]}
              onPress={() => router.push(`/route/${route.id}`)}
              accessibilityRole="button"
              accessibilityLabel={`Apri percorso ${route.name}`}
            >
              <Image source={{ uri: route.imageUrl }} style={styles.routeImage} />
              <View style={styles.routeBody}>
                <View style={styles.routeTopline}>
                  <Text style={styles.routeLabel}>{route.recommended ? 'Consigliato' : 'Percorso'}</Text>
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>{route.difficulty === 'easy' ? 'Facile' : 'Medio'}</Text>
                  </View>
                </View>
                <Text style={styles.routeTitle}>{route.name}</Text>
                <Text style={styles.routeDescription} numberOfLines={3}>
                  {route.description}
                </Text>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Clock size={16} color={Colors.deepGold} />
                    <Text style={styles.metaText}>{route.duration} min</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MapPin size={16} color={Colors.deepGold} />
                    <Text style={styles.metaText}>{route.stops.length} tappe</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.customPanel}>
          <View style={styles.customIcon}>
            <Sparkles size={22} color={Colors.deepGold} />
          </View>
          <View style={styles.customCopy}>
            <Text style={styles.customTitle}>Hai poco tempo o visiti con bambini?</Text>
            <Text style={styles.customText}>
              Parti da un percorso breve e usa la mappa per raggiungere la prossima sala senza perdere l’orientamento.
            </Text>
          </View>
          <Pressable style={styles.customButton} onPress={() => router.push('/map')} accessibilityRole="button">
            <Compass size={18} color="#FFFFFF" />
            <Text style={styles.customButtonText}>Apri mappa</Text>
          </Pressable>
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
    minHeight: 350,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 72,
  },
  heroCopy: {
    flex: 1,
    maxWidth: 640,
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
    width: 430,
    height: 260,
  },
  tools: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    marginTop: 20,
    gap: 12,
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
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    outlineStyle: 'none' as any,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    minHeight: 40,
    justifyContent: 'center',
    borderRadius: 7,
    paddingHorizontal: 14,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.deepGold,
    borderColor: Colors.deepGold,
  },
  filterText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  grid: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
    gap: 14,
  },
  gridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  routeCard: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  routeCardWide: {
    width: '31.8%',
  },
  routeImage: {
    width: '100%',
    height: 185,
  },
  routeBody: {
    padding: 16,
  },
  routeTopline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  routeLabel: {
    color: Colors.deepGold,
    fontSize: 12,
    fontWeight: '800',
  },
  difficultyBadge: {
    backgroundColor: '#EFE3C9',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  difficultyText: {
    color: Colors.surface,
    fontSize: 12,
    fontWeight: '800',
  },
  routeTitle: {
    color: Colors.text,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '800',
  },
  routeDescription: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  customPanel: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    marginTop: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  customIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFE3C9',
  },
  customCopy: {
    flex: 1,
  },
  customTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  customText: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 3,
  },
  customButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.deepGold,
    borderRadius: 7,
    paddingHorizontal: 14,
  },
  customButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
});
