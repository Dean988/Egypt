import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Calendar,
  ChevronRight,
  Clock,
  Compass,
  Map,
  Sparkles,
  Ticket,
  Trophy,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import exhibits from '@/mocks/exhibits';
import routes from '@/mocks/routes';
import treasureHunts from '@/mocks/treasure-hunts';

const HERO_IMAGE =
  'https://www.giovanigenitori.it/wp-content/uploads/2023/06/Sala-14b-Galleria-dei-Re-1-scaled.jpg';
const LOGO_IMAGE =
  'https://clubsilencio.it/wp-content/uploads/bfi_thumb/logo_museo_egizio-31m7cn4e1fwnkt54zirhymgen6a1crmngd3alc7h9uhqn5cy8.png';

const primaryActions = [
  {
    title: 'Biglietti',
    subtitle: 'Scegli data e orario',
    icon: Ticket,
    route: '/tickets',
  },
  {
    title: 'Mappa',
    subtitle: 'Trova sale e percorsi',
    icon: Map,
    route: '/map',
  },
  {
    title: 'Percorsi',
    subtitle: 'Visite curate dagli esperti',
    icon: Compass,
    route: '/routes',
  },
  {
    title: 'Tesori',
    subtitle: 'Sfide e cacce interattive',
    icon: Trophy,
    route: '/treasure-hunt',
  },
] as const;

const featureTiles = [
  {
    title: 'Sala dei Re',
    label: 'Imperdibile',
    image:
      'https://api.museoegizio.it/wp-content/uploads/2021/10/MicrosoftTeams-image-1-1024x1024.jpg',
    route: '/exhibit/1',
  },
  {
    title: 'Percorso su misura',
    label: '45-90 min',
    image: 'https://i.imgur.com/cTccwr4.png',
    route: '/routes',
  },
  {
    title: 'Caccia ai geroglifici',
    label: 'Per famiglie',
    image: 'https://i.imgur.com/Wb48y2z.jpeg',
    route: `/treasure-hunt/${treasureHunts[0]?.id ?? '1'}`,
  },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const featuredExhibit = exhibits[0];
  const featuredRoute = routes[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground source={{ uri: HERO_IMAGE }} style={styles.hero} resizeMode="cover">
        <View style={styles.heroScrim} />
        <View style={[styles.heroInner, !isWide && styles.heroInnerCompact, isWide && styles.heroInnerWide]}>
          <View style={[styles.brandRow, !isWide && styles.brandRowCompact]}>
            <Image source={{ uri: LOGO_IMAGE }} style={styles.logo} resizeMode="contain" />
            <View style={styles.liveBadge}>
              <Sparkles size={14} color={Colors.surface} />
              <Text style={styles.liveBadgeText}>Esperienza digitale</Text>
            </View>
          </View>

          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>Museo Egizio, Torino</Text>
            <Text style={[styles.heroTitle, !isWide && styles.heroTitleCompact]}>
              Organizza una visita più chiara, ricca e personale.
            </Text>
            <Text style={[styles.heroText, !isWide && styles.heroTextCompact]}>
              Biglietti, sale, percorsi tematici e attività interattive in un’unica esperienza
              pensata per muoversi bene dentro il museo.
            </Text>

            <View style={[styles.heroActions, !isWide && styles.heroActionsCompact]}>
              <Pressable
                style={({ pressed }) => [
                  styles.primaryCta,
                  !isWide && styles.ctaCompact,
                  pressed && styles.pressed,
                ]}
                onPress={() => router.push('/tickets')}
                accessibilityRole="button"
                accessibilityLabel="Acquista biglietti"
              >
                <Ticket size={18} color="#FFFFFF" />
                <Text style={styles.primaryCtaText}>Acquista biglietti</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.secondaryCta,
                  !isWide && styles.ctaCompact,
                  pressed && styles.pressed,
                ]}
                onPress={() => router.push('/map')}
                accessibilityRole="button"
                accessibilityLabel="Apri la mappa del museo"
              >
                <Text style={styles.secondaryCtaText}>Apri la mappa</Text>
                <ChevronRight size={18} color={Colors.inverseText} />
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.mainBand}>
        <View style={[styles.section, styles.actionsGrid, isWide && styles.actionsGridWide]}>
          {primaryActions.map((item) => {
            const Icon = item.icon;
            return (
              <Pressable
                key={item.title}
                style={({ pressed }) => [styles.actionTile, pressed && styles.tilePressed]}
                onPress={() => router.push(item.route)}
                accessibilityRole="button"
                accessibilityLabel={`${item.title}: ${item.subtitle}`}
              >
                <View style={styles.actionIcon}>
                  <Icon size={22} color={Colors.deepGold} />
                </View>
                <View style={styles.actionText}>
                  <Text style={styles.actionTitle}>{item.title}</Text>
                  <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={18} color={Colors.lightText} />
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.section, isWide && styles.splitSection]}>
          <View style={styles.visitPanel}>
            <Text style={styles.kicker}>Visita oggi</Text>
            <Text style={styles.sectionTitle}>Le informazioni essenziali restano a portata di mano.</Text>
            <View style={styles.infoRows}>
              <View style={styles.infoRow}>
                <Clock size={18} color={Colors.deepGold} />
                <Text style={styles.infoText}>Aperto 9:00-18:30, ultimo ingresso consigliato 17:30</Text>
              </View>
              <View style={styles.infoRow}>
                <Calendar size={18} color={Colors.deepGold} />
                <Text style={styles.infoText}>Prenotazione rapida con data, fascia oraria e riepilogo</Text>
              </View>
              <View style={styles.infoRow}>
                <Compass size={18} color={Colors.deepGold} />
                <Text style={styles.infoText}>Percorsi brevi, familiari e tematici per scegliere senza fatica</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [styles.featuredRoute, pressed && styles.tilePressed]}
            onPress={() => router.push(featuredRoute ? `/route/${featuredRoute.id}` : '/routes')}
            accessibilityRole="button"
            accessibilityLabel="Apri il percorso consigliato"
          >
            <Image source={{ uri: featuredRoute?.imageUrl || featureTiles[1].image }} style={styles.featuredImage} />
            <View style={styles.featuredContent}>
              <Text style={styles.kicker}>Percorso consigliato</Text>
              <Text style={styles.featuredTitle}>{featuredRoute?.name || 'Capolavori del museo'}</Text>
              <Text style={styles.featuredText} numberOfLines={3}>
                {featuredRoute?.description ||
                  'Una selezione guidata per vedere le sale principali con ritmo e contesto.'}
              </Text>
              <View style={styles.metaRow}>
                <Clock size={16} color={Colors.deepGold} />
                <Text style={styles.metaText}>{featuredRoute?.duration || 60} min</Text>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.kicker}>Da non perdere</Text>
              <Text style={styles.sectionTitle}>Tre modi per iniziare la visita</Text>
            </View>
            <Pressable
              style={styles.textLink}
              onPress={() => router.push('/routes')}
              accessibilityRole="button"
            >
              <Text style={styles.textLinkLabel}>Vedi tutto</Text>
              <ChevronRight size={16} color={Colors.deepGold} />
            </Pressable>
          </View>

          <View style={[styles.featureGrid, isWide && styles.featureGridWide]}>
            {featureTiles.map((tile) => (
              <Pressable
                key={tile.title}
                style={({ pressed }) => [styles.featureTile, pressed && styles.tilePressed]}
                onPress={() => router.push(tile.route)}
                accessibilityRole="button"
                accessibilityLabel={`${tile.title}, ${tile.label}`}
              >
                <Image source={{ uri: tile.image }} style={styles.tileImage} />
                <View style={styles.tileScrim} />
                <View style={styles.tileContent}>
                  <Text style={styles.tileLabel}>{tile.label}</Text>
                  <Text style={styles.tileTitle}>{tile.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {featuredExhibit && (
          <View style={styles.section}>
            <Pressable
              style={({ pressed }) => [styles.exhibitStrip, pressed && styles.tilePressed]}
              onPress={() => router.push(`/exhibit/${featuredExhibit.id}`)}
              accessibilityRole="button"
              accessibilityLabel={`Apri esposizione ${featuredExhibit.name}`}
            >
              <View style={styles.exhibitText}>
                <Text style={styles.kicker}>Opera in evidenza</Text>
                <Text style={styles.sectionTitle}>{featuredExhibit.name}</Text>
                <Text style={styles.paragraph} numberOfLines={3}>
                  {featuredExhibit.description}
                </Text>
              </View>
              <ChevronRight size={22} color={Colors.deepGold} />
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 24,
  },
  hero: {
    minHeight: Platform.OS === 'web' ? 640 : 590,
    backgroundColor: Colors.surface,
  },
  heroScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(28, 25, 23, 0.58)',
  },
  heroInner: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 34,
    paddingBottom: 34,
    justifyContent: 'space-between',
  },
  heroInnerCompact: {
    paddingTop: 28,
    paddingHorizontal: 22,
  },
  heroInnerWide: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 40,
  },
  brandRow: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  brandRowCompact: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 12,
  },
  logo: {
    width: 190,
    height: 58,
  },
  liveBadge: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: Colors.lightGold,
    borderRadius: 7,
    paddingHorizontal: 10,
  },
  liveBadgeText: {
    color: Colors.surface,
    fontSize: 12,
    fontWeight: '700',
  },
  heroCopy: {
    width: '100%',
    maxWidth: 760,
    flexShrink: 1,
  },
  eyebrow: {
    color: Colors.lightGold,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 14,
  },
  heroTitle: {
    color: Colors.inverseText,
    fontSize: 48,
    lineHeight: 54,
    fontWeight: '800',
    maxWidth: 740,
  },
  heroTitleCompact: {
    fontSize: 32,
    lineHeight: 38,
    maxWidth: 340,
  },
  heroText: {
    color: '#E8DED2',
    fontSize: 18,
    lineHeight: 28,
    marginTop: 18,
    maxWidth: 680,
  },
  heroTextCompact: {
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 340,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 28,
  },
  heroActionsCompact: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 10,
  },
  primaryCta: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.deepGold,
    borderRadius: 7,
    paddingHorizontal: 18,
  },
  primaryCtaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryCta: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(255, 248, 234, 0.42)',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(28, 25, 23, 0.42)',
  },
  secondaryCtaText: {
    color: Colors.inverseText,
    fontSize: 16,
    fontWeight: '700',
  },
  ctaCompact: {
    width: '100%',
    justifyContent: 'center',
  },
  mainBand: {
    backgroundColor: Colors.background,
    marginTop: -28,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 10,
  },
  section: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    paddingHorizontal: 18,
    marginTop: 22,
  },
  actionsGrid: {
    gap: 10,
  },
  actionsGridWide: {
    flexDirection: 'row',
  },
  actionTile: {
    minHeight: 76,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1E3C7',
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  actionSubtitle: {
    color: Colors.lightText,
    fontSize: 13,
    lineHeight: 18,
  },
  splitSection: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'stretch',
  },
  visitPanel: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 22,
  },
  kicker: {
    color: Colors.deepGold,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  infoRows: {
    gap: 14,
    marginTop: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
  },
  infoText: {
    flex: 1,
    color: Colors.inverseText,
    fontSize: 15,
    lineHeight: 22,
  },
  featuredRoute: {
    flex: 1,
    minHeight: 310,
    backgroundColor: Colors.card,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featuredImage: {
    width: '100%',
    height: 150,
  },
  featuredContent: {
    padding: 18,
  },
  featuredTitle: {
    color: Colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  featuredText: {
    color: Colors.lightText,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  metaText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 14,
  },
  textLink: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  textLinkLabel: {
    color: Colors.deepGold,
    fontSize: 14,
    fontWeight: '800',
  },
  featureGrid: {
    gap: 12,
  },
  featureGridWide: {
    flexDirection: 'row',
  },
  featureTile: {
    flex: 1,
    minHeight: 240,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  tileImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  tileScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(28, 25, 23, 0.34)',
  },
  tileContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
  },
  tileLabel: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.lightGold,
    color: Colors.surface,
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 10,
  },
  tileTitle: {
    color: Colors.inverseText,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '800',
  },
  exhibitStrip: {
    minHeight: 150,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  exhibitText: {
    flex: 1,
  },
  paragraph: {
    color: Colors.lightText,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  tilePressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
});
