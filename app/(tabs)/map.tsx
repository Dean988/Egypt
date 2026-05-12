import React, { useMemo, useState } from 'react';
import {
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
import { ArrowRight, Coffee, Landmark, MapPin, Search, ShoppingBag, Ticket } from 'lucide-react-native';
import Colors from '@/constants/colors';

const floors = [
  {
    id: 0,
    label: 'Piano terra',
    zones: [
      { id: 'entrance', name: 'Ingresso', room: 'E', crowd: 'Alto', x: 9, y: 58, w: 28, h: 24 },
      { id: 'tickets', name: 'Biglietteria', room: 'B', crowd: 'Medio', x: 40, y: 58, w: 25, h: 24 },
      { id: 'shop', name: 'Shop', room: 'S', crowd: 'Basso', x: 68, y: 58, w: 23, h: 24 },
    ],
  },
  {
    id: 1,
    label: 'Primo piano',
    zones: [
      { id: 'kings', name: 'Sala dei Re', room: '1', crowd: 'Alto', x: 8, y: 12, w: 38, h: 34 },
      { id: 'papyri', name: 'Galleria dei Papiri', room: '2', crowd: 'Medio', x: 52, y: 12, w: 39, h: 34 },
      { id: 'daily', name: 'Vita quotidiana', room: '7', crowd: 'Basso', x: 8, y: 54, w: 38, h: 34 },
      { id: 'funeral', name: 'Corredi funerari', room: '5', crowd: 'Medio', x: 52, y: 54, w: 39, h: 34 },
    ],
  },
  {
    id: 2,
    label: 'Secondo piano',
    zones: [
      { id: 'kha', name: 'Tomba di Kha', room: '8', crowd: 'Medio', x: 8, y: 14, w: 39, h: 72 },
      { id: 'amulets', name: 'Amuleti e gioielli', room: '11', crowd: 'Basso', x: 53, y: 14, w: 38, h: 34 },
      { id: 'temple', name: 'Tempio e rilievi', room: '13', crowd: 'Basso', x: 53, y: 52, w: 38, h: 34 },
    ],
  },
];

const crowdColors = {
  Alto: Colors.error,
  Medio: Colors.warning,
  Basso: Colors.success,
};

export default function MapScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [floorId, setFloorId] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedZoneId, setSelectedZoneId] = useState('kings');
  const isWide = width >= 920;

  const currentFloor = floors.find((floor) => floor.id === floorId) || floors[1];
  const selectedZone = currentFloor.zones.find((zone) => zone.id === selectedZoneId) || currentFloor.zones[0];

  const searchResults = useMemo(() => {
    const normalized = query.toLowerCase();
    if (!normalized) return [];
    return floors
      .flatMap((floor) => floor.zones.map((zone) => ({ ...zone, floor: floor.label, floorId: floor.id })))
      .filter((zone) => `${zone.name} ${zone.room}`.toLowerCase().includes(normalized))
      .slice(0, 4);
  }, [query]);

  const selectResult = (zone: (typeof searchResults)[number]) => {
    setFloorId(zone.floorId);
    setSelectedZoneId(zone.id);
    setQuery('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Stack.Screen
        options={{
          title: 'Mappa',
          headerShown: true,
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.gold,
          headerTitleStyle: { fontWeight: '800' },
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, isWide && styles.heroWide]}>
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>Mappa del museo</Text>
            <Text style={[styles.title, !isWide && styles.titleCompact]}>
              Trova la prossima sala senza uscire dal flusso della visita.
            </Text>
            <Text style={[styles.subtitle, !isWide && styles.subtitleCompact]}>
              Cerca una sala, controlla il piano e scegli una destinazione. La mappa resta leggibile anche da mobile.
            </Text>
          </View>
          <View style={styles.heroCard}>
            <MapPin size={32} color={Colors.deepGold} />
            <Text style={styles.heroCardTitle}>Punto consigliato</Text>
            <Text style={styles.heroCardText}>Parti dalla Sala dei Re e prosegui verso papiri e corredi funerari.</Text>
          </View>
        </View>

        <View style={[styles.main, isWide && styles.mainWide]}>
          <View style={styles.mapColumn}>
            <View style={styles.searchBox}>
              <Search size={18} color={Colors.lightText} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                style={styles.searchInput}
                placeholder="Cerca sala o numero"
                placeholderTextColor={Colors.lightText}
              />
            </View>

            {searchResults.length > 0 && (
              <View style={styles.results}>
                {searchResults.map((zone) => (
                  <Pressable key={`${zone.floorId}-${zone.id}`} style={styles.resultRow} onPress={() => selectResult(zone)}>
                    <Text style={styles.resultTitle}>{zone.name}</Text>
                    <Text style={styles.resultMeta}>{zone.floor} · sala {zone.room}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.floorTabs}>
              {floors.map((floor) => (
                <Pressable
                  key={floor.id}
                  style={[styles.floorTab, floorId === floor.id && styles.floorTabActive]}
                  onPress={() => {
                    setFloorId(floor.id);
                    setSelectedZoneId(floor.zones[0].id);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: floorId === floor.id }}
                >
                  <Text style={[styles.floorTabText, floorId === floor.id && styles.floorTabTextActive]}>
                    {floor.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.mapCanvas}>
              {currentFloor.zones.map((zone) => {
                const isSelected = selectedZone?.id === zone.id;
                return (
                  <Pressable
                    key={zone.id}
                    style={[
                      styles.zone,
                      {
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: `${zone.w}%`,
                        height: `${zone.h}%`,
                        borderColor: isSelected ? Colors.deepGold : Colors.border,
                      },
                      isSelected && styles.zoneSelected,
                    ]}
                    onPress={() => setSelectedZoneId(zone.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`${zone.name}, sala ${zone.room}`}
                  >
                    <Text style={styles.zoneRoom}>{zone.room}</Text>
                    <Text style={styles.zoneName} numberOfLines={2}>
                      {zone.name}
                    </Text>
                  </Pressable>
                );
              })}

              <View style={styles.pathLine} />
              <View style={styles.pathArrow}>
                <ArrowRight size={18} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <View style={styles.sidePanel}>
            <View style={styles.selectedHeader}>
              <Landmark size={22} color={Colors.deepGold} />
              <View style={styles.selectedCopy}>
                <Text style={styles.selectedLabel}>Destinazione</Text>
                <Text style={styles.selectedTitle}>{selectedZone?.name}</Text>
              </View>
            </View>

            <View style={styles.detailRows}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Piano</Text>
                <Text style={styles.detailValue}>{currentFloor.label}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Sala</Text>
                <Text style={styles.detailValue}>{selectedZone?.room}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Affluenza</Text>
                <Text style={[styles.detailValue, { color: crowdColors[selectedZone?.crowd as keyof typeof crowdColors] }]}>
                  {selectedZone?.crowd}
                </Text>
              </View>
            </View>

            <View style={styles.quickActions}>
              <Pressable style={styles.quickButton} onPress={() => router.push('/tickets')}>
                <Ticket size={18} color="#FFFFFF" />
                <Text style={styles.quickButtonText}>Biglietti</Text>
              </Pressable>
              <Pressable style={styles.quickButtonSecondary} onPress={() => router.push('/shop')}>
                <ShoppingBag size={18} color={Colors.deepGold} />
                <Text style={styles.quickButtonSecondaryText}>Shop</Text>
              </Pressable>
              <Pressable style={styles.quickButtonSecondary} onPress={() => router.push('/cafe')}>
                <Coffee size={18} color={Colors.deepGold} />
                <Text style={styles.quickButtonSecondaryText}>Caffè</Text>
              </Pressable>
            </View>
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
    minHeight: 330,
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
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 18,
    maxWidth: 360,
    borderWidth: 1,
    borderColor: 'rgba(212, 166, 74, 0.35)',
  },
  heroCardTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 12,
  },
  heroCardText: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
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
  mapColumn: {
    flex: 1,
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
  results: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 8,
    overflow: 'hidden',
  },
  resultRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resultTitle: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  resultMeta: {
    color: Colors.lightText,
    fontSize: 13,
    marginTop: 2,
  },
  floorTabs: {
    gap: 10,
    paddingTop: 12,
    paddingBottom: 12,
  },
  floorTab: {
    minHeight: 40,
    justifyContent: 'center',
    borderRadius: 7,
    paddingHorizontal: 14,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  floorTabActive: {
    backgroundColor: Colors.deepGold,
    borderColor: Colors.deepGold,
  },
  floorTabText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  floorTabTextActive: {
    color: '#FFFFFF',
  },
  mapCanvas: {
    height: 430,
    borderRadius: 8,
    backgroundColor: '#EFE7D8',
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  zone: {
    position: 'absolute',
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
  },
  zoneSelected: {
    backgroundColor: '#FFF6DF',
    shadowColor: Colors.deepGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  zoneRoom: {
    color: Colors.deepGold,
    fontSize: 18,
    fontWeight: '900',
  },
  zoneName: {
    color: Colors.text,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '800',
    marginTop: 3,
  },
  pathLine: {
    position: 'absolute',
    left: '28%',
    top: '49%',
    width: '45%',
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.deepGold,
    opacity: 0.55,
  },
  pathArrow: {
    position: 'absolute',
    left: '70%',
    top: '45.5%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.deepGold,
    alignItems: 'center',
    justifyContent: 'center',
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
  selectedHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  selectedCopy: {
    flex: 1,
  },
  selectedLabel: {
    color: Colors.deepGold,
    fontSize: 12,
    fontWeight: '800',
  },
  selectedTitle: {
    color: Colors.text,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '800',
    marginTop: 2,
  },
  detailRows: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabel: {
    color: Colors.lightText,
    fontSize: 14,
  },
  detailValue: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  quickActions: {
    gap: 10,
    marginTop: 18,
  },
  quickButton: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 7,
    backgroundColor: Colors.deepGold,
  },
  quickButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  quickButtonSecondary: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickButtonSecondaryText: {
    color: Colors.deepGold,
    fontSize: 14,
    fontWeight: '800',
  },
});
