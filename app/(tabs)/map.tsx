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
import {
  Building2,
  ChevronRight,
  Clock,
  Coffee,
  Landmark,
  Layers,
  MapPin,
  Navigation,
  Search,
  ShoppingBag,
  Ticket,
  Users,
} from 'lucide-react-native';
import Colors from '@/constants/colors';

type Crowd = 'Basso' | 'Medio' | 'Alto';

type Zone = {
  id: string;
  name: string;
  room: string;
  crowd: Crowd;
  category: string;
  note: string;
  route: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type Floor = {
  id: number;
  label: string;
  shortLabel: string;
  altitude: string;
  description: string;
  zones: Zone[];
};

const floors: Floor[] = [
  {
    id: 0,
    label: 'Piano terra',
    shortLabel: 'PT',
    altitude: 'Ingresso e servizi',
    description: 'Accoglienza, biglietti, shop e pausa prima o dopo la visita.',
    zones: [
      {
        id: 'entrance',
        name: 'Ingresso',
        room: 'E',
        crowd: 'Alto',
        category: 'Accesso',
        note: 'Punto di partenza, guardaroba e orientamento iniziale.',
        route: 'Entra, supera i controlli e sali verso la Sala dei Re.',
        x: 7,
        y: 18,
        w: 27,
        h: 34,
      },
      {
        id: 'tickets',
        name: 'Biglietteria',
        room: 'B',
        crowd: 'Medio',
        category: 'Servizi',
        note: 'Acquisto, ritiro e gestione prenotazioni.',
        route: 'Dall’ingresso resta sulla corsia destra: 1 minuto a piedi.',
        x: 39,
        y: 18,
        w: 26,
        h: 34,
      },
      {
        id: 'shop',
        name: 'Shop',
        room: 'S',
        crowd: 'Basso',
        category: 'Store',
        note: 'Cataloghi, regali, riproduzioni e collezioni curate.',
        route: 'Dal foyer attraversa il corridoio finale verso l’uscita.',
        x: 69,
        y: 18,
        w: 24,
        h: 34,
      },
      {
        id: 'cafe',
        name: 'Caffè',
        room: 'C',
        crowd: 'Basso',
        category: 'Pausa',
        note: 'Area ristoro rapida, ideale tra due percorsi lunghi.',
        route: 'Scendi al piano terra e segui le indicazioni verso il foyer.',
        x: 24,
        y: 61,
        w: 52,
        h: 23,
      },
    ],
  },
  {
    id: 1,
    label: 'Primo piano',
    shortLabel: 'P1',
    altitude: 'Percorso principale',
    description: 'Il cuore della visita, con sale iconiche e alta densità narrativa.',
    zones: [
      {
        id: 'kings',
        name: 'Sala dei Re',
        room: '1',
        crowd: 'Alto',
        category: 'Capolavori',
        note: 'Statue monumentali e scenografia più immersiva del percorso.',
        route: 'Dal vano scale entra a sinistra e segui il corridoio principale.',
        x: 7,
        y: 13,
        w: 39,
        h: 34,
      },
      {
        id: 'papyri',
        name: 'Galleria dei Papiri',
        room: '2',
        crowd: 'Medio',
        category: 'Scrittura',
        note: 'Manoscritti, documenti e dettagli da osservare con calma.',
        route: 'Dalla Sala dei Re procedi diritto: collegamento diretto.',
        x: 54,
        y: 13,
        w: 39,
        h: 34,
      },
      {
        id: 'daily',
        name: 'Vita quotidiana',
        room: '7',
        crowd: 'Basso',
        category: 'Cultura materiale',
        note: 'Oggetti domestici, mestieri e rituali della vita comune.',
        route: 'Dal lato ovest del piano torna verso il nucleo centrale.',
        x: 7,
        y: 57,
        w: 39,
        h: 30,
      },
      {
        id: 'funeral',
        name: 'Corredi funerari',
        room: '5',
        crowd: 'Medio',
        category: 'Riti',
        note: 'Sarcofagi, offerte e oggetti per il viaggio nell’aldilà.',
        route: 'Dalla Galleria dei Papiri scendi verso la sala 5.',
        x: 54,
        y: 57,
        w: 39,
        h: 30,
      },
    ],
  },
  {
    id: 2,
    label: 'Secondo piano',
    shortLabel: 'P2',
    altitude: 'Approfondimenti',
    description: 'Sale più raccolte per visitatori che vogliono completare l’esperienza.',
    zones: [
      {
        id: 'kha',
        name: 'Tomba di Kha',
        room: '8',
        crowd: 'Medio',
        category: 'Tomba intatta',
        note: 'Uno dei nuclei più importanti del museo per completezza e conservazione.',
        route: 'Sali al secondo piano e mantieni la sinistra fino alla sala 8.',
        x: 7,
        y: 15,
        w: 38,
        h: 70,
      },
      {
        id: 'amulets',
        name: 'Amuleti e gioielli',
        room: '11',
        crowd: 'Basso',
        category: 'Dettagli preziosi',
        note: 'Micro-oggetti, simboli protettivi e materiali da vedere da vicino.',
        route: 'Dalla sala 8 attraversa il corridoio centrale verso est.',
        x: 53,
        y: 15,
        w: 40,
        h: 30,
      },
      {
        id: 'temple',
        name: 'Tempio e rilievi',
        room: '13',
        crowd: 'Basso',
        category: 'Architettura',
        note: 'Rilievi, frammenti e ambientazioni per leggere gli spazi sacri.',
        route: 'Continua dalla sala 11 lungo il lato destro del piano.',
        x: 53,
        y: 52,
        w: 40,
        h: 33,
      },
      {
        id: 'lab',
        name: 'Laboratorio didattico',
        room: 'L',
        crowd: 'Basso',
        category: 'Esperienza',
        note: 'Area per attività guidate, famiglie e approfondimenti pratici.',
        route: 'Ritorna verso il nucleo scale e segui le indicazioni laboratorio.',
        x: 18,
        y: 52,
        w: 27,
        h: 33,
      },
    ],
  },
];

const crowdColors: Record<Crowd, string> = {
  Alto: Colors.error,
  Medio: Colors.warning,
  Basso: Colors.success,
};

const floorTops = {
  compact: [318, 194, 70],
  wide: [360, 218, 76],
};

export default function MapScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [floorId, setFloorId] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedZoneId, setSelectedZoneId] = useState('kings');
  const isWide = width >= 980;
  const isCompact = width < 640;

  const allZones = useMemo(
    () => floors.flatMap((floor) => floor.zones.map((zone) => ({ ...zone, floor: floor.label, floorId: floor.id }))),
    [],
  );

  const currentFloor = floors.find((floor) => floor.id === floorId) || floors[1];
  const selectedZone =
    currentFloor.zones.find((zone) => zone.id === selectedZoneId) || currentFloor.zones[0];

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return allZones
      .filter((zone) => `${zone.name} ${zone.room} ${zone.floor} ${zone.category}`.toLowerCase().includes(normalized))
      .slice(0, 5);
  }, [allZones, query]);

  const selectFloor = (floor: Floor) => {
    setFloorId(floor.id);
    setSelectedZoneId(floor.zones[0].id);
  };

  const selectZone = (zone: Zone, zoneFloorId = floorId) => {
    setFloorId(zoneFloorId);
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
            <Text style={styles.kicker}>Mappa 3D del museo</Text>
            <Text style={[styles.title, isCompact && styles.titleCompact]}>
              Orientati tra i 3 piani con una vista chiara, rapida e selezionabile.
            </Text>
            <Text style={[styles.subtitle, isCompact && styles.subtitleCompact]}>
              Scegli il piano, tocca una sala e usa le azioni rapide per biglietti, shop e caffè.
            </Text>
          </View>

          <View style={[styles.heroCard, !isWide && { width: Math.max(0, width - 44) }]}>
            <View style={styles.heroIcon}>
              <Layers size={24} color={Colors.deepGold} />
            </View>
            <Text style={styles.heroCardTitle}>Vista a livelli</Text>
            <Text style={styles.heroCardText}>Tre piani sempre visibili, con quello attivo in primo piano.</Text>
          </View>
        </View>

        <View style={[styles.main, !isWide && styles.mainNarrow, !isWide && { width: Math.max(0, width - 36) }, isWide && styles.mainWide]}>
          <View style={styles.mapColumn}>
            <View style={styles.searchBox}>
              <Search size={18} color={Colors.lightText} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                style={styles.searchInput}
                placeholder="Cerca sala, piano o funzione"
                placeholderTextColor={Colors.lightText}
              />
            </View>

            {searchResults.length > 0 && (
              <View style={styles.results}>
                {searchResults.map((zone) => (
                  <Pressable
                    key={`${zone.floorId}-${zone.id}`}
                    style={styles.resultRow}
                    onPress={() => selectZone(zone, zone.floorId)}
                  >
                    <View style={styles.resultDot} />
                    <View style={styles.resultCopy}>
                      <Text style={styles.resultTitle}>{zone.name}</Text>
                      <Text style={styles.resultMeta}>
                        {zone.floor} · sala {zone.room} · {zone.category}
                      </Text>
                    </View>
                    <ChevronRight size={18} color={Colors.lightText} />
                  </Pressable>
                ))}
              </View>
            )}

            <View style={[styles.floorTabs, isCompact && styles.floorTabsCompact]} accessibilityRole="tablist">
              {floors.map((floor) => {
                const active = floorId === floor.id;
                return (
                  <Pressable
                    key={floor.id}
                    style={[
                      styles.floorTab,
                      isCompact && styles.floorTabCompact,
                      active && styles.floorTabActive,
                    ]}
                    onPress={() => selectFloor(floor)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: active }}
                  >
                    <Text style={[styles.floorTabCode, active && styles.floorTabCodeActive]}>{floor.shortLabel}</Text>
                    <View style={styles.floorTabCopy}>
                      <Text style={[styles.floorTabText, isCompact && styles.floorTabTextCompact, active && styles.floorTabTextActive]}>
                        {isCompact ? getCompactFloorLabel(floor) : floor.label}
                      </Text>
                      <Text style={[styles.floorTabMeta, isCompact && styles.floorTabMetaCompact, active && styles.floorTabMetaActive]}>
                        {floor.altitude}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <View style={[styles.mapStage, isCompact ? styles.mapStageCompact : styles.mapStageWide]}>
              <View style={styles.stageHeader}>
                <View>
                  <Text style={styles.stageEyebrow}>Piano attivo</Text>
                  <Text style={styles.stageTitle}>{currentFloor.label}</Text>
                </View>
                <View style={styles.stageBadge}>
                  <Building2 size={16} color={Colors.deepGold} />
                  <Text style={styles.stageBadgeText}>3 livelli</Text>
                </View>
              </View>

              <View style={styles.liftRail}>
                {floors
                  .slice()
                  .reverse()
                  .map((floor) => (
                    <Pressable
                      key={`rail-${floor.id}`}
                      style={[styles.railStop, floorId === floor.id && styles.railStopActive]}
                      onPress={() => selectFloor(floor)}
                      accessibilityLabel={`Vai a ${floor.label}`}
                    >
                      <Text style={[styles.railStopText, floorId === floor.id && styles.railStopTextActive]}>
                        {floor.shortLabel}
                      </Text>
                    </Pressable>
                  ))}
              </View>

              <View style={styles.floorStack}>
                {floors.map((floor) => (
                  <FloorDeck
                    key={floor.id}
                    floor={floor}
                    top={(isCompact ? floorTops.compact : floorTops.wide)[floor.id]}
                    active={floor.id === floorId}
                    selectedZoneId={selectedZone?.id}
                    isCompact={isCompact}
                    onSelectFloor={() => selectFloor(floor)}
                    onSelectZone={(zone) => selectZone(zone, floor.id)}
                  />
                ))}
              </View>

              <View style={styles.legend}>
                {(Object.keys(crowdColors) as Crowd[]).map((crowd) => (
                  <View key={crowd} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: crowdColors[crowd] }]} />
                    <Text style={styles.legendText}>{crowd}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.sidePanel}>
            <View style={styles.selectedHeader}>
              <View style={styles.selectedIcon}>
                <Landmark size={22} color={Colors.deepGold} />
              </View>
              <View style={styles.selectedCopy}>
                <Text style={styles.selectedLabel}>Destinazione</Text>
                <Text style={styles.selectedTitle}>{selectedZone.name}</Text>
              </View>
            </View>

            <Text style={styles.selectedNote}>{selectedZone.note}</Text>

            <View style={styles.detailRows}>
              <DetailRow label="Piano" value={currentFloor.label} />
              <DetailRow label="Sala" value={selectedZone.room} />
              <DetailRow label="Tipo" value={selectedZone.category} />
              <View style={styles.detailRow}>
                <View style={styles.detailLabelWrap}>
                  <Users size={15} color={Colors.lightText} />
                  <Text style={styles.detailLabel}>Affluenza</Text>
                </View>
                <Text style={[styles.detailValue, { color: crowdColors[selectedZone.crowd] }]}>{selectedZone.crowd}</Text>
              </View>
            </View>

            <View style={styles.routeCard}>
              <View style={styles.routeHeader}>
                <Navigation size={18} color={Colors.deepGold} />
                <Text style={styles.routeTitle}>Percorso consigliato</Text>
              </View>
              <Text style={styles.routeText}>{selectedZone.route}</Text>
              <View style={styles.routeMeta}>
                <Clock size={15} color={Colors.lightText} />
                <Text style={styles.routeMetaText}>Aggiornato per una visita fluida</Text>
              </View>
            </View>

            <View style={styles.quickActions}>
              <Pressable style={styles.quickButton} onPress={() => router.push('/tickets')}>
                <Ticket size={18} color="#FFFFFF" />
                <Text style={styles.quickButtonText}>Biglietti</Text>
              </Pressable>
              <View style={styles.quickRow}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FloorDeck({
  floor,
  top,
  active,
  selectedZoneId,
  isCompact,
  onSelectFloor,
  onSelectZone,
}: {
  floor: Floor;
  top: number;
  active: boolean;
  selectedZoneId?: string;
  isCompact: boolean;
  onSelectFloor: () => void;
  onSelectZone: (zone: Zone) => void;
}) {
  return (
    <Pressable
      style={[
        styles.floorDeck,
        {
          top,
          height: isCompact ? 138 : 166,
          opacity: active ? 1 : 0.52,
          zIndex: active ? 30 : 10 + floor.id,
          transform: [
            { translateY: active ? -8 : 0 },
            { scale: active ? 1 : 0.96 },
            { rotate: '-4deg' },
          ],
        },
      ]}
      onPress={onSelectFloor}
      accessibilityLabel={`Seleziona ${floor.label}`}
    >
      <View style={[styles.deckShadow, active && styles.deckShadowActive]} />
      <View style={[styles.deckSideRight, active && styles.deckSideRightActive]} />
      <View style={[styles.deckSideFront, active && styles.deckSideFrontActive]} />
      <View style={[styles.deckSurface, active && styles.deckSurfaceActive]}>
        <View style={styles.deckLabel}>
          <Text style={[styles.deckCode, active && styles.deckCodeActive]}>{floor.shortLabel}</Text>
          <View>
            <Text style={[styles.deckName, active && styles.deckNameActive]}>{floor.label}</Text>
            <Text style={styles.deckDescription} numberOfLines={1}>
              {floor.description}
            </Text>
          </View>
        </View>

        {floor.zones.map((zone) => {
          const selected = active && selectedZoneId === zone.id;
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
                  borderColor: selected ? Colors.deepGold : 'rgba(28, 25, 23, 0.16)',
                },
                selected && styles.zoneSelected,
              ]}
              onPress={(event) => {
                event.stopPropagation();
                onSelectZone(zone);
              }}
              accessibilityRole="button"
              accessibilityLabel={`${zone.name}, sala ${zone.room}`}
            >
              <View style={[styles.crowdStrip, { backgroundColor: crowdColors[zone.crowd] }]} />
              <Text style={[styles.zoneRoom, selected && styles.zoneRoomSelected]}>{zone.room}</Text>
              <Text style={[styles.zoneName, selected && styles.zoneNameSelected]} numberOfLines={2}>
                {zone.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </Pressable>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function getCompactFloorLabel(floor: Floor) {
  if (floor.id === 0) return 'Terra';
  if (floor.id === 1) return 'Primo';
  return 'Secondo';
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
    minHeight: 332,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 72,
  },
  heroCopy: {
    flex: 1,
    maxWidth: 670,
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
    lineHeight: 45,
    fontWeight: '800',
  },
  titleCompact: {
    fontSize: 30,
    lineHeight: 36,
    maxWidth: 350,
  },
  subtitle: {
    color: '#E7DCCB',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    maxWidth: 610,
  },
  subtitleCompact: {
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 350,
  },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 18,
    maxWidth: 360,
    borderWidth: 1,
    borderColor: 'rgba(212, 166, 74, 0.35)',
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F7E8C5',
    alignItems: 'center',
    justifyContent: 'center',
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
  mainNarrow: {
    alignSelf: 'center',
    paddingHorizontal: 0,
  },
  mainWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mapColumn: {
    flex: 1,
    minWidth: 0,
  },
  searchBox: {
    minHeight: 50,
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
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resultDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.deepGold,
  },
  resultCopy: {
    flex: 1,
    minWidth: 0,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingTop: 12,
    paddingBottom: 12,
  },
  floorTabsCompact: {
    flexWrap: 'nowrap',
    gap: 8,
    justifyContent: 'flex-start',
  },
  floorTab: {
    flexGrow: 1,
    flexBasis: 185,
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  floorTabCompact: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 88,
    width: 88,
    minWidth: 0,
    minHeight: 66,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 6,
  },
  floorTabActive: {
    backgroundColor: Colors.surface,
    borderColor: Colors.gold,
  },
  floorTabCode: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#F3E7D2',
    color: Colors.deepGold,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 38,
    textAlign: 'center',
  },
  floorTabCodeActive: {
    backgroundColor: Colors.deepGold,
    color: '#FFFFFF',
  },
  floorTabCopy: {
    flex: 1,
    minWidth: 0,
  },
  floorTabText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  floorTabTextCompact: {
    fontSize: 13,
  },
  floorTabTextActive: {
    color: Colors.inverseText,
  },
  floorTabMeta: {
    color: Colors.lightText,
    fontSize: 12,
    marginTop: 2,
  },
  floorTabMetaCompact: {
    display: 'none',
  },
  floorTabMetaActive: {
    color: '#E7DCCB',
  },
  mapStage: {
    borderRadius: 8,
    backgroundColor: '#ECE1CF',
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  mapStageWide: {
    height: 620,
  },
  mapStageCompact: {
    height: 560,
  },
  stageHeader: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    zIndex: 60,
  },
  stageEyebrow: {
    color: Colors.deepGold,
    fontSize: 12,
    fontWeight: '900',
  },
  stageTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },
  stageBadge: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stageBadgeText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  liftRail: {
    position: 'absolute',
    left: 14,
    top: 100,
    bottom: 68,
    width: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 252, 244, 0.78)',
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.12)',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 55,
  },
  railStop: {
    width: 34,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E7D2',
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.12)',
  },
  railStopActive: {
    backgroundColor: Colors.surface,
    borderColor: Colors.gold,
  },
  railStopText: {
    color: Colors.deepGold,
    fontSize: 12,
    fontWeight: '900',
  },
  railStopTextActive: {
    color: Colors.inverseText,
  },
  floorStack: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  floorDeck: {
    position: 'absolute',
    left: '15%',
    right: '5%',
  },
  deckShadow: {
    position: 'absolute',
    left: 18,
    right: 2,
    bottom: -22,
    height: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(28, 25, 23, 0.16)',
  },
  deckShadowActive: {
    backgroundColor: 'rgba(28, 25, 23, 0.22)',
  },
  deckSideRight: {
    position: 'absolute',
    right: -16,
    top: 18,
    bottom: -16,
    width: 18,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#C6AD82',
  },
  deckSideRightActive: {
    backgroundColor: '#B98A33',
  },
  deckSideFront: {
    position: 'absolute',
    left: 18,
    right: -16,
    bottom: -18,
    height: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#B99B68',
  },
  deckSideFrontActive: {
    backgroundColor: Colors.deepGold,
  },
  deckSurface: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#FCF5E7',
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.18)',
  },
  deckSurfaceActive: {
    backgroundColor: Colors.card,
    borderColor: Colors.gold,
    borderWidth: 2,
  },
  deckLabel: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 9,
    zIndex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deckCode: {
    width: 34,
    height: 34,
    borderRadius: 8,
    textAlign: 'center',
    lineHeight: 34,
    color: Colors.deepGold,
    backgroundColor: '#F3E7D2',
    fontSize: 12,
    fontWeight: '900',
  },
  deckCodeActive: {
    color: '#FFFFFF',
    backgroundColor: Colors.deepGold,
  },
  deckName: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  deckNameActive: {
    color: Colors.deepGold,
  },
  deckDescription: {
    color: Colors.lightText,
    fontSize: 11,
    marginTop: 1,
    maxWidth: 420,
  },
  zone: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#F8EFD9',
    borderWidth: 1,
    borderRadius: 7,
    padding: 7,
    justifyContent: 'flex-end',
  },
  zoneSelected: {
    backgroundColor: '#FFF4D8',
    borderWidth: 2,
  },
  crowdStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  zoneRoom: {
    color: Colors.deepGold,
    fontSize: 17,
    fontWeight: '900',
  },
  zoneRoomSelected: {
    color: Colors.text,
  },
  zoneName: {
    color: Colors.text,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '800',
    marginTop: 2,
  },
  zoneNameSelected: {
    color: Colors.text,
  },
  legend: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 14,
    minHeight: 42,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 252, 244, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.12)',
    zIndex: 60,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  sidePanel: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    width: '100%',
    maxWidth: 370,
  },
  selectedHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  selectedIcon: {
    width: 46,
    height: 46,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7E8C5',
  },
  selectedCopy: {
    flex: 1,
    minWidth: 0,
  },
  selectedLabel: {
    color: Colors.deepGold,
    fontSize: 12,
    fontWeight: '900',
  },
  selectedTitle: {
    color: Colors.text,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '900',
    marginTop: 2,
  },
  selectedNote: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 14,
  },
  detailRows: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  detailRow: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  detailLabel: {
    color: Colors.lightText,
    fontSize: 14,
  },
  detailValue: {
    flexShrink: 1,
    color: Colors.text,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'right',
  },
  routeCard: {
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0C891',
    backgroundColor: '#FFF6DF',
    padding: 14,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeTitle: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  routeText: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
  },
  routeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 12,
  },
  routeMetaText: {
    color: Colors.lightText,
    fontSize: 12,
    fontWeight: '700',
  },
  quickActions: {
    gap: 10,
    marginTop: 18,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
    backgroundColor: Colors.deepGold,
  },
  quickButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  quickButtonSecondary: {
    flex: 1,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickButtonSecondaryText: {
    color: Colors.deepGold,
    fontSize: 14,
    fontWeight: '900',
  },
});
