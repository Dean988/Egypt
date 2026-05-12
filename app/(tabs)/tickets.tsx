import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Calendar, Check, Clock, CreditCard, Headphones, Ticket, Users } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';

type TicketOption = {
  id: string;
  name: string;
  price: number;
  detail: string;
};

type DateOption = {
  id: string;
  label: string;
  day: string;
};

const tickets: TicketOption[] = [
  { id: 'adult', name: 'Adulto', price: 15, detail: 'Ingresso intero' },
  { id: 'reduced', name: 'Ridotto', price: 11, detail: 'Studenti e over 65' },
  { id: 'child', name: 'Bambino', price: 7, detail: 'Da 6 a 14 anni' },
  { id: 'family', name: 'Famiglia', price: 35, detail: '2 adulti + 2 bambini' },
];

const dates: DateOption[] = [
  { id: 'today', label: 'Oggi', day: '12 Mag' },
  { id: 'tomorrow', label: 'Domani', day: '13 Mag' },
  { id: 'thu', label: 'Gio', day: '14 Mag' },
  { id: 'fri', label: 'Ven', day: '15 Mag' },
  { id: 'sat', label: 'Sab', day: '16 Mag' },
];

const times = ['09:30', '10:30', '11:30', '13:00', '14:30', '16:00'];

const formatPrice = (value: number) => `${value.toFixed(2).replace('.', ',')} EUR`;

export default function TicketsScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const [ticketId, setTicketId] = useState(tickets[0].id);
  const [dateId, setDateId] = useState(dates[0].id);
  const [time, setTime] = useState(times[1]);
  const [audioGuide, setAudioGuide] = useState(true);

  const selectedTicket = useMemo(
    () => tickets.find((item) => item.id === ticketId) ?? tickets[0],
    [ticketId],
  );
  const selectedDate = useMemo(
    () => dates.find((item) => item.id === dateId) ?? dates[0],
    [dateId],
  );
  const total = selectedTicket.price + (audioGuide ? 0 : 0);

  const handleCheckout = () => {
    Alert.alert(
      'Prenotazione pronta',
      'Checkout dimostrativo: la selezione e pronta per essere collegata al pagamento reale.',
      [{ text: 'OK' }],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Stack.Screen
        options={{
          title: 'Biglietti',
          headerShown: true,
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.gold,
          headerTitleStyle: { fontWeight: '800' },
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, isWide && styles.heroWide]}>
          <View style={styles.heroText}>
            <Text style={styles.kicker}>Prenota la visita</Text>
            <Text style={[styles.title, !isWide && styles.titleCompact]}>
              Biglietti chiari, ingresso rapido e servizi pronti prima di arrivare.
            </Text>
            <Text style={[styles.subtitle, !isWide && styles.subtitleCompact]}>
              Scegli fascia, data e orario. Il riepilogo resta sempre leggibile anche da mobile.
            </Text>
            <View style={styles.heroFacts}>
              <View style={styles.fact}>
                <Clock size={17} color={Colors.lightGold} />
                <Text style={styles.factText}>9:00 - 18:30</Text>
              </View>
              <View style={styles.fact}>
                <Headphones size={17} color={Colors.lightGold} />
                <Text style={styles.factText}>Audioguida inclusa</Text>
              </View>
            </View>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1560157368-946d9c8f7cb6?q=80&w=1200&auto=format&fit=crop',
            }}
            style={[styles.heroImage, isWide && styles.heroImageWide]}
          />
        </View>

        <View style={[styles.main, isWide && styles.mainWide]}>
          <View style={styles.flow}>
            <View style={styles.sectionHeader}>
              <Ticket size={20} color={Colors.deepGold} />
              <Text style={styles.sectionTitle}>Tipo di biglietto</Text>
            </View>
            <View style={[styles.ticketGrid, isWide && styles.ticketGridWide]}>
              {tickets.map((item) => {
                const selected = ticketId === item.id;
                return (
                  <Pressable
                    key={item.id}
                    style={[styles.ticketCard, isWide && styles.ticketCardWide, selected && styles.selectedCard]}
                    onPress={() => setTicketId(item.id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                  >
                    <View style={styles.cardTopRow}>
                      <Text style={styles.ticketName}>{item.name}</Text>
                      {selected && (
                        <View style={styles.checkDot}>
                          <Check size={14} color="#FFFFFF" />
                        </View>
                      )}
                    </View>
                    <Text style={styles.ticketPrice}>{formatPrice(item.price)}</Text>
                    <Text style={styles.ticketDetail}>{item.detail}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.sectionHeader}>
              <Calendar size={20} color={Colors.deepGold} />
              <Text style={styles.sectionTitle}>Data</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRow}>
              {dates.map((item) => {
                const selected = dateId === item.id;
                return (
                  <Pressable
                    key={item.id}
                    style={[styles.dateCard, selected && styles.dateCardSelected]}
                    onPress={() => setDateId(item.id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                  >
                    <Text style={[styles.dateLabel, selected && styles.dateTextSelected]}>{item.label}</Text>
                    <Text style={[styles.dateDay, selected && styles.dateTextSelected]}>{item.day}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={styles.sectionHeader}>
              <Clock size={20} color={Colors.deepGold} />
              <Text style={styles.sectionTitle}>Orario</Text>
            </View>
            <View style={styles.timeGrid}>
              {times.map((item) => {
                const selected = time === item;
                return (
                  <Pressable
                    key={item}
                    style={[styles.timeCard, selected && styles.timeCardSelected]}
                    onPress={() => setTime(item)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                  >
                    <Text style={[styles.timeText, selected && styles.timeTextSelected]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              style={[styles.serviceRow, audioGuide && styles.serviceRowSelected]}
              onPress={() => setAudioGuide((value) => !value)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: audioGuide }}
            >
              <View style={styles.serviceIcon}>
                <Headphones size={19} color={Colors.deepGold} />
              </View>
              <View style={styles.serviceCopy}>
                <Text style={styles.serviceTitle}>Audioguida digitale</Text>
                <Text style={styles.serviceText}>Inclusa nel biglietto, pronta sul telefono.</Text>
              </View>
              <View style={[styles.toggle, audioGuide && styles.toggleOn]}>
                {audioGuide && <Check size={14} color="#FFFFFF" />}
              </View>
            </Pressable>
          </View>

          <View style={[styles.summary, isWide && styles.summaryWide]}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryIcon}>
                <CreditCard size={22} color={Colors.lightGold} />
              </View>
              <View>
                <Text style={styles.summaryTitle}>Riepilogo</Text>
                <Text style={styles.summarySubtitle}>Prenotazione visita</Text>
              </View>
            </View>

            <View style={styles.summaryLine}>
              <Text style={styles.summaryLabel}>{selectedTicket.name}</Text>
              <Text style={styles.summaryValue}>{formatPrice(selectedTicket.price)}</Text>
            </View>
            <View style={styles.summaryLine}>
              <Text style={styles.summaryLabel}>Data</Text>
              <Text style={styles.summaryValue}>
                {selectedDate.label}, {selectedDate.day}
              </Text>
            </View>
            <View style={styles.summaryLine}>
              <Text style={styles.summaryLabel}>Orario</Text>
              <Text style={styles.summaryValue}>{time}</Text>
            </View>
            <View style={styles.totalLine}>
              <Text style={styles.totalLabel}>Totale</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>

            <Button
              title="Procedi al checkout"
              onPress={handleCheckout}
              icon={<CreditCard size={18} color="#FFFFFF" />}
              style={styles.checkoutButton}
            />
            <Button
              title="Apri la mappa"
              variant="outline"
              onPress={() => router.push('/map')}
              style={styles.secondaryButton}
            />

            <View style={styles.notice}>
              <Users size={18} color={Colors.deepGold} />
              <Text style={styles.noticeText}>Arriva 15 minuti prima: l'ingresso e organizzato per fasce.</Text>
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
    minHeight: 360,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 72,
  },
  heroText: {
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
  heroFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  fact: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 252, 244, 0.09)',
    borderWidth: 1,
    borderColor: 'rgba(232, 200, 115, 0.24)',
  },
  factText: {
    color: Colors.inverseText,
    fontSize: 13,
    fontWeight: '700',
  },
  heroImage: {
    width: '100%',
    height: 210,
    borderRadius: 8,
  },
  heroImageWide: {
    width: 420,
    height: 260,
  },
  main: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: 22,
    gap: 16,
  },
  mainWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  flow: {
    flex: 1,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 4,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  ticketGrid: {
    gap: 12,
  },
  ticketGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ticketCard: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
  },
  ticketCardWide: {
    width: '48.5%',
  },
  selectedCard: {
    borderColor: Colors.deepGold,
    backgroundColor: '#FFF8EA',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  checkDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.deepGold,
  },
  ticketName: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  ticketPrice: {
    color: Colors.deepGold,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 10,
  },
  ticketDetail: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  dateRow: {
    gap: 10,
    paddingVertical: 2,
  },
  dateCard: {
    minWidth: 92,
    minHeight: 74,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
  },
  dateCardSelected: {
    backgroundColor: Colors.deepGold,
    borderColor: Colors.deepGold,
  },
  dateLabel: {
    color: Colors.lightText,
    fontSize: 13,
    fontWeight: '700',
  },
  dateDay: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 5,
  },
  dateTextSelected: {
    color: '#FFFFFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeCard: {
    minWidth: 92,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeCardSelected: {
    backgroundColor: Colors.surface,
    borderColor: Colors.surface,
  },
  timeText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  timeTextSelected: {
    color: Colors.inverseText,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
  },
  serviceRowSelected: {
    borderColor: Colors.deepGold,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.papyrus,
  },
  serviceCopy: {
    flex: 1,
  },
  serviceTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  serviceText: {
    color: Colors.lightText,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  toggle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: Colors.deepGold,
    borderColor: Colors.deepGold,
  },
  summary: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 18,
    gap: 14,
  },
  summaryWide: {
    width: 360,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(232, 200, 115, 0.12)',
  },
  summaryTitle: {
    color: Colors.inverseText,
    fontSize: 20,
    fontWeight: '900',
  },
  summarySubtitle: {
    color: '#D8CDBA',
    fontSize: 13,
    marginTop: 2,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
    paddingVertical: 4,
  },
  summaryLabel: {
    color: '#D8CDBA',
    fontSize: 14,
  },
  summaryValue: {
    color: Colors.inverseText,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'right',
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 252, 244, 0.16)',
    paddingTop: 14,
    marginTop: 4,
  },
  totalLabel: {
    color: Colors.inverseText,
    fontSize: 17,
    fontWeight: '900',
  },
  totalValue: {
    color: Colors.lightGold,
    fontSize: 19,
    fontWeight: '900',
  },
  checkoutButton: {
    marginTop: 4,
  },
  secondaryButton: {
    borderColor: Colors.lightGold,
  },
  notice: {
    flexDirection: 'row',
    gap: 9,
    backgroundColor: 'rgba(255, 252, 244, 0.08)',
    borderRadius: 8,
    padding: 12,
  },
  noticeText: {
    flex: 1,
    color: '#E7DCCB',
    fontSize: 13,
    lineHeight: 19,
  },
});
