import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Check, Clock, Headphones, MapPin, Route as RouteIcon } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import routes from '@/mocks/routes';
import exhibits from '@/mocks/exhibits';

export default function RouteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [started, setStarted] = useState(false);
  const isWide = width >= 920;
  const route = routes.find((item) => item.id === id);

  const routeExhibits = useMemo(() => {
    if (!route) return [];
    return exhibits.filter((exhibit) => route.exhibits.includes(exhibit.id));
  }, [route]);

  if (!route) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'Percorso non trovato', headerShown: true }} />
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Percorso non trovato</Text>
          <Text style={styles.emptyText}>Torna ai percorsi e scegli un itinerario disponibile.</Text>
          <Button title="Torna ai percorsi" onPress={() => router.push('/routes')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Stack.Screen
        options={{
          title: route.name,
          headerShown: true,
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.gold,
          headerTitleStyle: { fontWeight: '800' },
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, isWide && styles.heroWide]}>
          <Image source={{ uri: route.imageUrl }} style={[styles.heroImage, isWide && styles.heroImageWide]} />
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>Percorso guidato</Text>
            <Text style={[styles.title, !isWide && styles.titleCompact]}>{route.name}</Text>
            <Text style={[styles.subtitle, !isWide && styles.subtitleCompact]}>{route.description}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaPill}>
                <Clock size={16} color={Colors.lightGold} />
                <Text style={styles.metaText}>{route.duration} min</Text>
              </View>
              <View style={styles.metaPill}>
                <MapPin size={16} color={Colors.lightGold} />
                <Text style={styles.metaText}>{route.stops.length} tappe</Text>
              </View>
              <View style={styles.metaPill}>
                <RouteIcon size={16} color={Colors.lightGold} />
                <Text style={styles.metaText}>{route.difficulty === 'easy' ? 'Facile' : 'Medio'}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.main, isWide && styles.mainWide]}>
          <View style={styles.timeline}>
            <Text style={styles.sectionLabel}>Tappe</Text>
            <Text style={styles.sectionTitle}>Ordine delle sale</Text>

            {route.stops.map((stop, index) => (
              <View key={stop.id} style={styles.stopRow}>
                <View style={styles.stopMarker}>
                  <Text style={styles.stopMarkerText}>{index + 1}</Text>
                </View>
                <View style={styles.stopContent}>
                  <Text style={styles.stopTitle}>{stop.name}</Text>
                  <Text style={styles.stopText}>
                    {stop.exhibitIds.length} opere collegate - circa {index === 0 ? 8 : 12} minuti
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.sidePanel}>
            <Text style={styles.sectionLabel}>Guida</Text>
            <Text style={styles.panelTitle}>{started ? 'Percorso avviato' : 'Pronto per iniziare'}</Text>
            <Text style={styles.panelText}>
              {started
                ? 'Segui le tappe e usa la mappa quando hai bisogno di orientarti.'
                : "Puoi iniziare subito. L'audioguida completa e indicata come funzione in preparazione."}
            </Text>
            <View style={styles.panelInfo}>
              <Headphones size={18} color={Colors.deepGold} />
              <Text style={styles.panelInfoText}>Audioguida in preparazione</Text>
            </View>
            <Button
              title={started ? 'Segna come completato' : 'Inizia percorso'}
              onPress={() => setStarted((value) => !value)}
              icon={started ? <Check size={18} color="#FFFFFF" /> : <MapPin size={18} color="#FFFFFF" />}
              style={styles.startButton}
            />
            <Button title="Apri mappa" onPress={() => router.push('/map')} variant="outline" style={styles.mapButton} />
          </View>
        </View>

        <View style={styles.exhibitsSection}>
          <Text style={styles.sectionLabel}>Opere incluse</Text>
          <Text style={styles.sectionTitle}>Cosa vedrai lungo il percorso</Text>
          <View style={[styles.exhibitGrid, isWide && styles.exhibitGridWide]}>
            {routeExhibits.map((exhibit) => (
              <Pressable
                key={exhibit.id}
                style={({ pressed }) => [styles.exhibitCard, isWide && styles.exhibitCardWide, pressed && styles.pressed]}
                onPress={() => router.push(`/exhibit/${exhibit.id}`)}
                accessibilityRole="button"
                accessibilityLabel={`Apri opera ${exhibit.name}`}
              >
                <Image source={{ uri: exhibit.imageUrl }} style={styles.exhibitImage} />
                <View style={styles.exhibitBody}>
                  <Text style={styles.exhibitName}>{exhibit.name}</Text>
                  <Text style={styles.exhibitMeta}>Sala {exhibit.roomNumber} - piano {exhibit.floor}</Text>
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
    minHeight: 380,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 72,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },
  heroImageWide: {
    width: 460,
    height: 280,
  },
  heroCopy: {
    flex: 1,
    maxWidth: 650,
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
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  metaPill: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 7,
    paddingHorizontal: 11,
    backgroundColor: 'rgba(255, 248, 234, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(232, 200, 115, 0.28)',
  },
  metaText: {
    color: Colors.inverseText,
    fontSize: 13,
    fontWeight: '800',
  },
  main: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    marginTop: 20,
    gap: 14,
  },
  mainWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timeline: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
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
  stopRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stopMarker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.deepGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopMarkerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  stopContent: {
    flex: 1,
  },
  stopTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  stopText: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 3,
  },
  sidePanel: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    width: '100%',
    maxWidth: 360,
  },
  panelTitle: {
    color: Colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  panelText: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  panelInfo: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 7,
    backgroundColor: '#EFE3C9',
    paddingHorizontal: 12,
    marginTop: 16,
  },
  panelInfoText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  startButton: {
    marginTop: 14,
  },
  mapButton: {
    marginTop: 10,
  },
  exhibitsSection: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    marginTop: 22,
  },
  exhibitGrid: {
    gap: 14,
  },
  exhibitGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exhibitCard: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  exhibitCardWide: {
    width: '23.7%',
  },
  exhibitImage: {
    width: '100%',
    height: 150,
  },
  exhibitBody: {
    padding: 14,
  },
  exhibitName: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
  },
  exhibitMeta: {
    color: Colors.lightText,
    fontSize: 13,
    marginTop: 5,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
  emptyText: {
    color: Colors.lightText,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginVertical: 14,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
});
