import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, Alert, Modal, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Ticket, Calendar, Clock, Users, Info, X, Headphones, Zap, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import EgyptianPattern from '@/components/EgyptianPattern';
// Import the custom date picker component instead
import CustomDatePicker from '@/components/CustomDatePicker';

// Define ticket interface
interface TicketType {
  id: number;
  name: string;
  price: string;
  description: string;
}

// Define date interface
interface DateType {
  id: number | string;
  day: string;
  date: string;
  month: string;
  fullDate?: Date;
}

// Define time interface
interface TimeType {
  id: number;
  time: string;
}

export default function TicketsScreen() {
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateType | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeType | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [showSpeedyModal, setShowSpeedyModal] = useState(false);
  
  const tickets: TicketType[] = [
    { id: 1, name: "Adulto", price: "€15", description: "Dai 18 anni" },
    { id: 2, name: "Bambino", price: "€8", description: "6-17 anni" },
    { id: 3, name: "Senior", price: "€12", description: "Dai 65 anni" },
    { id: 4, name: "Famiglia", price: "€35", description: "2 Adulti + 2 Bambini" },
    { id: 5, name: "Studente", price: "€10", description: "Con tessera valida" },
  ];
  
  const dates: DateType[] = [
    { id: 1, day: "Lun", date: "15", month: "Lug" },
    { id: 2, day: "Mar", date: "16", month: "Lug" },
    { id: 3, day: "Mer", date: "17", month: "Lug" },
    { id: 4, day: "Gio", date: "18", month: "Lug" },
    { id: 5, day: "Ven", date: "19", month: "Lug" },
    { id: 6, day: "Sab", date: "20", month: "Lug" },
    { id: 7, day: "Dom", date: "21", month: "Lug" },
  ];
  
  const times: TimeType[] = [
    { id: 1, time: "09:00" },
    { id: 2, time: "10:00" },
    { id: 3, time: "11:00" },
    { id: 4, time: "12:00" },
    { id: 5, time: "13:00" },
    { id: 6, time: "14:00" },
    { id: 7, time: "15:00" },
    { id: 8, time: "16:00" },
  ];
  
  const handleTicketSelect = (ticket: TicketType) => {
    setSelectedTicket(ticket);
  };
  
  const handleDateSelect = (date: DateType) => {
    setSelectedDate(date);
  };
  
  const handleTimeSelect = (time: TimeType) => {
    setSelectedTime(time);
  };
  
  const handlePurchase = () => {
    Alert.alert(
      "Prossimamente...",
      "L'acquisto dei biglietti sarà disponibile in un prossimo aggiornamento.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  const handleSpeedyTicket = () => {
    setShowSpeedyModal(true);
  };

  const closeSpeedyModal = () => {
    setShowSpeedyModal(false);
  };

  const openCalendar = () => {
    setShowCalendar(true);
  };

  const handleCalendarChange = (date: Date) => {
    setTempDate(date);
  };

  const confirmCalendarDate = (date: Date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    
    const customDate: DateType = {
      id: 'custom',
      day: days[date.getDay()],
      date: date.getDate().toString(),
      month: months[date.getMonth()],
      fullDate: date
    };
    
    setSelectedDate(customDate);
    setShowCalendar(false);
  };

  const cancelCalendarSelection = () => {
    setShowCalendar(false);
  };
  
  const isFormComplete = selectedTicket && selectedDate && selectedTime;

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen options={{ 
        title: "Tickets",
        headerShown: true,
      }} />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: "https://archeologiavocidalpassato.com/wp-content/uploads/2021/02/torino_egizio_apertura-8-febbraio_locandina.jpg" }} 
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroTitleContainer}>
              <Text style={styles.heroTitle}>BIGLIETTI MUSEO</Text>
              <View style={styles.titleUnderline} />
            </View>
            <Text style={styles.heroSubtitle}>Vieni a vivere un'esperienza unica!</Text>
          </View>
        </View>
        
        {/* Introduction Section */}
        <View style={styles.introSection}>
          <View style={styles.iconContainer}>
            <Ticket size={28} color={Colors.gold} />
          </View>
          <Text style={styles.introTitle}>Pianifica la tua visita</Text>
          <Text style={styles.introSubtitle}>
            Acquista i biglietti in anticipo per una visita senza attese
          </Text>
        </View>
        
        {/* Audio Guide Promo */}
        <View style={styles.audioGuidePromo}>
          <Image 
            source={{ uri: "https://i.imgur.com/omIl34C.png" }} 
            style={styles.audioGuideImage}
            resizeMode="cover"
          />
          <View style={styles.audioGuideContent}>
            <Text style={styles.audioGuideTitle}>Audio Guida Inclusa</Text>
            <Text style={styles.audioGuideDescription}>
              Scansiona i codici QR nel museo per un'esperienza multimediale
            </Text>
            <View style={styles.audioGuideFeature}>
              <Headphones size={14} color={Colors.gold} />
              <Text style={styles.audioGuideFeatureText}>GRATIS con il biglietto</Text>
            </View>
          </View>
        </View>
        
        {/* Speedy Ticket Promo */}
        <View style={styles.speedyTicketPromo}>
          <View style={styles.speedyTicketContent}>
            <View style={styles.speedyTicketHeader}>
              <Text style={styles.speedyTicketTitle}>Biglietto Speedy</Text>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>In Arrivo</Text>
              </View>
            </View>
            <Text style={styles.speedyTicketDescription}>
              Biglietti a €5 per visitare la Sala dei Re, Materie forme del tempo e mostre temporanee
            </Text>
            <View style={styles.speedyTicketFeatures}>
              <View style={styles.speedyTicketFeature}>
                <Zap size={16} color={Colors.gold} />
                <Text style={styles.speedyTicketFeatureText}>Visita fulmine</Text>
              </View>
              <View style={styles.speedyTicketFeature}>
                <Clock size={16} color={Colors.gold} />
                <Text style={styles.speedyTicketFeatureText}>Risparmia tempo</Text>
              </View>
            </View>
            <Button 
              title="Scopri di più" 
              onPress={handleSpeedyTicket}
              style={styles.speedyTicketButton}
              icon={<Zap size={18} color={Colors.card} />}
            />
          </View>
          <Image 
            source={{ uri: "https://i.imgur.com/rY5LldD.png" }} 
            style={styles.speedyTicketImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Clock size={20} color={Colors.gold} />
            <Text style={styles.infoText}>Aperto tutti i giorni: 9:00 - 18:30</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>SCEGLI IL BIGLIETTO</Text>
            <View style={styles.sectionTitleUnderline} />
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ticketsContainer}
          >
            {tickets.map(ticket => (
              <Pressable 
                key={ticket.id} 
                style={[
                  styles.ticketCard,
                  selectedTicket?.id === ticket.id && styles.ticketCardSelected
                ]}
                onPress={() => handleTicketSelect(ticket)}
              >
                <Text style={styles.ticketName}>{ticket.name}</Text>
                <Text style={styles.ticketPrice}>{ticket.price}</Text>
                <Text style={styles.ticketDescription}>{ticket.description}</Text>
                {selectedTicket?.id === ticket.id && (
                  <View style={styles.selectedTicketIndicator}>
                    <Check size={16} color={Colors.card} />
                  </View>
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
        
        <EgyptianPattern style={styles.divider} color={Colors.gold} />
        
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>SCEGLI LA DATA</Text>
            <View style={styles.sectionTitleUnderline} />
          </View>
          
          <View style={styles.dateSelectionContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.datesContainer}
            >
              {dates.map(date => (
                <Pressable 
                  key={date.id} 
                  style={[
                    styles.dateCard,
                    selectedDate?.id === date.id && styles.dateCardSelected
                  ]}
                  onPress={() => handleDateSelect(date)}
                >
                  <Text style={[
                    styles.dateDay,
                    selectedDate?.id === date.id && styles.dateTextSelected
                  ]}>{date.day}</Text>
                  <Text style={[
                    styles.dateNumber,
                    selectedDate?.id === date.id && styles.dateTextSelected
                  ]}>{date.date}</Text>
                  <Text style={[
                    styles.dateMonth,
                    selectedDate?.id === date.id && styles.dateTextSelected
                  ]}>{date.month}</Text>
                </Pressable>
              ))}
            </ScrollView>
            
            <TouchableOpacity 
              style={[
                styles.calendarButton,
                selectedDate?.id === 'custom' && styles.calendarButtonSelected
              ]} 
              onPress={openCalendar}
              activeOpacity={0.7}
            >
              <Calendar size={20} color={selectedDate?.id === 'custom' ? Colors.card : Colors.gold} />
              <Text style={[
                styles.calendarButtonText,
                selectedDate?.id === 'custom' && styles.calendarButtonTextSelected
              ]}>
                {selectedDate?.id === 'custom' 
                  ? `${selectedDate.day}, ${selectedDate.date} ${selectedDate.month}` 
                  : "Seleziona dal Calendario"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Custom Calendar Modal */}
          {showCalendar && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={showCalendar}
              onRequestClose={() => setShowCalendar(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Seleziona una Data</Text>
                    <TouchableOpacity onPress={cancelCalendarSelection}>
                      <X size={24} color={Colors.gold} />
                    </TouchableOpacity>
                  </View>
                  
                  <CustomDatePicker
                    selectedDate={tempDate}
                    onDateChange={handleCalendarChange}
                    minimumDate={new Date()}
                  />
                  
                  <View style={styles.modalActions}>
                    <Button 
                      title="Annulla" 
                      onPress={cancelCalendarSelection} 
                      style={styles.cancelButton}
                    />
                    <Button 
                      title="Conferma" 
                      onPress={() => confirmCalendarDate(tempDate)} 
                    />
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
        
        <View style={styles.selectTimeContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>DECIDI L'ORARIO</Text>
            <View style={styles.sectionTitleUnderline} />
          </View>
          <View style={styles.timeSlotContainer}>
            {times.map(time => (
              <Pressable 
                key={time.id} 
                style={[
                  styles.timeCard,
                  selectedTime?.id === time.id && styles.timeCardSelected
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime?.id === time.id && styles.timeTextSelected
                ]}>{time.time}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Riepilogo Ordine</Text>
          
          {selectedTicket ? (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Biglietto {selectedTicket.name}</Text>
              <Text style={styles.summaryValue}>{selectedTicket.price}</Text>
            </View>
          ) : (
            <Text style={styles.summaryPlaceholder}>Seleziona un tipo di biglietto</Text>
          )}
          
          {selectedDate ? (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Data</Text>
              <Text style={styles.summaryValue}>
                {selectedDate.day}, {selectedDate.date} {selectedDate.month}
              </Text>
            </View>
          ) : (
            <Text style={styles.summaryPlaceholder}>Seleziona una data</Text>
          )}
          
          {selectedTime ? (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Orario</Text>
              <Text style={styles.summaryValue}>{selectedTime.time}</Text>
            </View>
          ) : (
            <Text style={styles.summaryPlaceholder}>Seleziona un orario</Text>
          )}
          
          {isFormComplete && (
            <View style={styles.summaryTotal}>
              <Text style={styles.summaryTotalLabel}>Totale</Text>
              <Text style={styles.summaryTotalValue}>{selectedTicket.price}</Text>
            </View>
          )}
        </View>
        
        <Button 
          title="Acquista" 
          onPress={handlePurchase}
          disabled={!isFormComplete}
          style={styles.purchaseButton}
        />
        
        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Informazioni Importanti</Text>
          <Text style={styles.notesText}>• I biglietti non sono rimborsabili</Text>
          <Text style={styles.notesText}>• Bambini sotto i 6 anni entrano gratis</Text>
          <Text style={styles.notesText}>• Si prega di arrivare 15 minuti prima dell'orario prenotato</Text>
        </View>
        
        {/* Papyrus Footer Image */}
        <View style={styles.papyrusFooterContainer}>
          <Image 
            source={{ uri: "https://i.imgur.com/RxDBtux.png" }}
            style={styles.papyrusFooterImage}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* Speedy Ticket Coming Soon Modal */}
      <Modal
        visible={showSpeedyModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeSpeedyModal}
      >
        <View style={styles.speedyModalOverlay}>
          <View style={styles.speedyModalContainer}>
            <View style={styles.speedyModalHeader}>
              <Text style={styles.speedyModalTitle}>Biglietto Speedy</Text>
              <TouchableOpacity onPress={closeSpeedyModal} style={styles.closeButton}>
                <X size={24} color={Colors.gold} />
              </TouchableOpacity>
            </View>
            
            <Image 
              source={{ uri: "https://api.museoegizio.it/wp-content/uploads/2021/10/MicrosoftTeams-image-1-1024x1024.jpg" }} 
              style={styles.speedyModalImage} 
              resizeMode="cover"
            />
            
            <View style={styles.speedyModalContent}>
              <View style={styles.comingSoonBadgeLarge}>
                <Text style={styles.comingSoonTextLarge}>In Arrivo</Text>
              </View>
              
              <Text style={styles.speedyModalDescription}>
                Il Biglietto Speedy sarà disponibile prossimamente! Questa nuova opzione ti permetterà di visitare rapidamente le aree più importanti del museo a un prezzo ridotto.
              </Text>
              
              <View style={styles.speedyModalFeatures}>
                <View style={styles.speedyModalFeature}>
                  <Zap size={20} color={Colors.gold} />
                  <Text style={styles.speedyModalFeatureText}>Visita rapida</Text>
                </View>
                <View style={styles.speedyModalFeature}>
                  <Clock size={20} color={Colors.gold} />
                  <Text style={styles.speedyModalFeatureText}>Solo €5</Text>
                </View>
              </View>
              
              <Button 
                title="Chiudi" 
                onPress={closeSpeedyModal} 
                style={styles.speedyModalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231f20',
  },
  scrollView: {
    backgroundColor: '#231f20',
  },
  heroContainer: {
    height: 240,
    width: '100%',
    position: 'relative',
    borderBottomWidth: 3,
    borderBottomColor: Colors.gold,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitleContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.8)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 30,
    paddingVertical: 20,
    position: 'relative',
    marginHorizontal: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 4,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textTransform: 'uppercase',
  },
  titleUnderline: {
    height: 4,
    width: 120,
    backgroundColor: Colors.gold,
    marginBottom: 16,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    borderRadius: 2,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  introSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  introTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8,
  },
  introSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    fontWeight: 'normal',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  audioGuidePromo: {
    flexDirection: 'row',
    backgroundColor: 'rgba(35, 31, 32, 0.95)',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  audioGuideImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  audioGuideContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  audioGuideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  audioGuideDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  audioGuideFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  audioGuideFeatureText: {
    fontSize: 12,
    color: Colors.gold,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  speedyTicketPromo: {
    flexDirection: 'row',
    backgroundColor: 'rgba(35, 31, 32, 0.95)',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  speedyTicketContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  speedyTicketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  speedyTicketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gold,
    marginRight: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  comingSoonBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  comingSoonText: {
    fontSize: 10,
    color: Colors.gold,
    fontWeight: 'bold',
  },
  speedyTicketDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 12,
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  speedyTicketFeatures: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  speedyTicketFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  speedyTicketFeatureText: {
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  speedyTicketButton: {
    backgroundColor: Colors.gold,
    borderRadius: 8,
  },
  speedyTicketImage: {
    width: 100,
    height: '100%',
    backgroundColor: '#000',
  },
  infoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  sectionTitleUnderline: {
    height: 3,
    width: 80,
    backgroundColor: Colors.gold,
    borderRadius: 1.5,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  ticketsContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 16,
  },
  ticketCard: {
    backgroundColor: 'rgba(35, 31, 32, 0.9)',
    borderRadius: 12,
    padding: 16,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    position: 'relative',
  },
  ticketCardSelected: {
    borderWidth: 2,
    borderColor: Colors.gold,
    backgroundColor: 'rgba(35, 31, 32, 0.95)',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  ticketName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ticketPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ticketDescription: {
    fontSize: 12,
    color: '#e0e0e0',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  selectedTicketIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.gold,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  divider: {
    marginVertical: 24,
  },
  dateSelectionContainer: {
    gap: 16,
  },
  datesContainer: {
    paddingBottom: 8,
  },
  dateCard: {
    width: 70,
    padding: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateCardSelected: {
    borderColor: Colors.gold,
    backgroundColor: Colors.gold,
  },
  dateDay: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  dateMonth: {
    fontSize: 14,
    color: Colors.text,
  },
  dateTextSelected: {
    color: Colors.card,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(35, 31, 32, 0.9)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    gap: 12,
    zIndex: 1,
  },
  calendarButtonSelected: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  calendarButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  calendarButtonTextSelected: {
    color: Colors.card,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'rgba(35, 31, 32, 0.95)',
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.gold,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.4)',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gold,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  datePicker: {
    width: '100%',
    height: 300,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectTimeContainer: {
    marginBottom: 24,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeCard: {
    width: '22%',
    padding: 12,
    backgroundColor: 'rgba(35, 31, 32, 0.9)',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  timeCardSelected: {
    borderWidth: 2,
    borderColor: Colors.gold,
    backgroundColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  timeTextSelected: {
    color: '#231f20',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  summaryContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(35, 31, 32, 0.9)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  summaryPlaceholder: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.4)',
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gold,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  purchaseButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.gold,
    borderRadius: 8,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  notesContainer: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: 'rgba(35, 31, 32, 0.9)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  notesText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  // Speedy Ticket Modal
  speedyModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedyModalContainer: {
    width: '90%',
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    maxHeight: '80%',
  },
  speedyModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.4)',
  },
  speedyModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  speedyModalImage: {
    width: '100%',
    height: 200,
  },
  speedyModalContent: {
    padding: 20,
    alignItems: 'center',
  },
  comingSoonBadgeLarge: {
    backgroundColor: Colors.nileBlue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 20,
  },
  comingSoonTextLarge: {
    color: Colors.card,
    fontSize: 16,
    fontWeight: 'bold',
  },
  speedyModalDescription: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  speedyModalFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  speedyModalFeature: {
    alignItems: 'center',
    gap: 8,
  },
  speedyModalFeatureText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  speedyModalButton: {
    minWidth: 150,
  },
  centeredText: {
    textAlign: 'center',
  },
  // Papyrus Footer
  papyrusFooterContainer: {
    width: '100%',
    height: 120,
    marginTop: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  papyrusFooterImage: {
    width: '100%',
    height: '100%',
  },
});