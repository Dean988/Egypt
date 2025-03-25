import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, Alert, Modal, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Ticket, Calendar, Clock, Users, Info, X, Headphones, Zap } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import EgyptianPattern from '@/components/EgyptianPattern';
// Import the custom date picker component instead
import CustomDatePicker from '@/components/CustomDatePicker';

export default function TicketsScreen() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [showSpeedyModal, setShowSpeedyModal] = useState(false);
  
  const tickets = [
    { id: 1, name: "Adult", price: "€15", description: "Ages 18+" },
    { id: 2, name: "Child", price: "€8", description: "Ages 6-17" },
    { id: 3, name: "Senior", price: "€12", description: "Ages 65+" },
    { id: 4, name: "Family", price: "€35", description: "2 Adults + 2 Children" },
    { id: 5, name: "Student", price: "€10", description: "With valid ID" },
  ];
  
  const dates = [
    { id: 1, day: "Mon", date: "15", month: "Jul" },
    { id: 2, day: "Tue", date: "16", month: "Jul" },
    { id: 3, day: "Wed", date: "17", month: "Jul" },
    { id: 4, day: "Thu", date: "18", month: "Jul" },
    { id: 5, day: "Fri", date: "19", month: "Jul" },
    { id: 6, day: "Sat", date: "20", month: "Jul" },
    { id: 7, day: "Sun", date: "21", month: "Jul" },
  ];
  
  const times = [
    { id: 1, time: "09:00" },
    { id: 2, time: "10:00" },
    { id: 3, time: "11:00" },
    { id: 4, time: "12:00" },
    { id: 5, time: "13:00" },
    { id: 6, time: "14:00" },
    { id: 7, time: "15:00" },
    { id: 8, time: "16:00" },
  ];
  
  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  
  const handlePurchase = () => {
    Alert.alert(
      "Coming Soon...",
      "Ticket purchasing will be available in a future update.",
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

  const handleCalendarChange = (date) => {
    setTempDate(date);
  };

  const confirmCalendarDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const customDate = {
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
            <Text style={styles.heroTitle}>Museum Tickets</Text>
            <Text style={styles.heroSubtitle}>Experience the wonders of ancient Egypt</Text>
          </View>
        </View>
        
        {/* Audio Guide Promo */}
        <View style={styles.audioGuidePromo}>
          <Image 
            source={{ uri: "https://i.imgur.com/omIl34C.png" }} 
            style={styles.audioGuideImage}
            resizeMode="cover"
          />
          <View style={styles.audioGuideContent}>
            <Text style={styles.audioGuideTitle}>Audio Guide Included</Text>
            <Text style={styles.audioGuideDescription}>
              Scan QR codes throughout the museum for a multimedia experience
            </Text>
            <View style={styles.audioGuideFeature}>
              <Headphones size={14} color={Colors.gold} />
              <Text style={styles.audioGuideFeatureText}>FREE with ticket</Text>
            </View>
          </View>
        </View>
        
        {/* Speedy Ticket Promo */}
        <View style={styles.speedyTicketPromo}>
          <View style={styles.speedyTicketContent}>
            <View style={styles.speedyTicketHeader}>
              <Text style={styles.speedyTicketTitle}>Biglietto Speedy</Text>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Coming Soon</Text>
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
            <Text style={styles.infoText}>Open daily: 9:00 AM - 6:30 PM</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ticket size={20} color={Colors.gold} />
            <Text style={styles.sectionTitle}>Select Ticket Type</Text>
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
              </Pressable>
            ))}
          </ScrollView>
        </View>
        
        <EgyptianPattern style={styles.divider} />
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color={Colors.gold} />
            <Text style={styles.sectionTitle}>Select Date</Text>
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
                  : "Select from Calendar"}
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
                    <Text style={styles.modalTitle}>Select a Date</Text>
                    <TouchableOpacity onPress={cancelCalendarSelection}>
                      <X size={24} color={Colors.text} />
                    </TouchableOpacity>
                  </View>
                  
                  <CustomDatePicker
                    selectedDate={tempDate}
                    onDateChange={handleCalendarChange}
                    minimumDate={new Date()}
                  />
                  
                  <View style={styles.modalActions}>
                    <Button 
                      title="Cancel" 
                      onPress={cancelCalendarSelection} 
                      style={styles.cancelButton}
                    />
                    <Button 
                      title="Confirm" 
                      onPress={() => confirmCalendarDate(tempDate)} 
                    />
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color={Colors.gold} />
            <Text style={styles.sectionTitle}>Select Time</Text>
          </View>
          
          <View style={styles.timesContainer}>
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
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          {selectedTicket ? (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{selectedTicket.name} Ticket</Text>
              <Text style={styles.summaryValue}>{selectedTicket.price}</Text>
            </View>
          ) : (
            <Text style={styles.summaryPlaceholder}>Select a ticket type</Text>
          )}
          
          {selectedDate ? (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>
                {selectedDate.day}, {selectedDate.date} {selectedDate.month}
              </Text>
            </View>
          ) : (
            <Text style={styles.summaryPlaceholder}>Select a date</Text>
          )}
          
          {selectedTime ? (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Time</Text>
              <Text style={styles.summaryValue}>{selectedTime.time}</Text>
            </View>
          ) : (
            <Text style={styles.summaryPlaceholder}>Select a time</Text>
          )}
          
          {isFormComplete && (
            <View style={styles.summaryTotal}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>{selectedTicket.price}</Text>
            </View>
          )}
        </View>
        
        <Button 
          title="Tickets" 
          onPress={handlePurchase}
          disabled={!isFormComplete}
          style={styles.purchaseButton}
        />
        
        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Important Information</Text>
          <Text style={styles.notesText}>• Tickets are non-refundable</Text>
          <Text style={styles.notesText}>• Children under 6 enter free</Text>
          <Text style={styles.notesText}>• Please arrive 15 minutes before your scheduled time</Text>
          <Text style={styles.notesText}>• Audio guides are available for an additional fee</Text>
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
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <Image 
              source={{ uri: "https://api.museoegizio.it/wp-content/uploads/2021/10/MicrosoftTeams-image-1-1024x1024.jpg" }} 
              style={styles.speedyModalImage} 
              resizeMode="cover"
            />
            
            <View style={styles.speedyModalContent}>
              <View style={styles.comingSoonBadgeLarge}>
                <Text style={styles.comingSoonTextLarge}>Coming Soon</Text>
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
    backgroundColor: Colors.papyrus,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  // Audio Guide Promo
  audioGuidePromo: {
    margin: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
    flexDirection: 'row',
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  audioGuideImage: {
    width: '40%',
    height: '100%',
  },
  audioGuideContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  audioGuideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  audioGuideDescription: {
    fontSize: 12,
    color: Colors.lightText,
    lineHeight: 16,
  },
  audioGuideFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  audioGuideFeatureText: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Speedy Ticket Promo
  speedyTicketPromo: {
    margin: 16,
    marginTop: 0,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
    flexDirection: 'row',
    height: 250, // Increased from 220 to 250
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speedyTicketContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  speedyTicketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  speedyTicketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  comingSoonBadge: {
    backgroundColor: Colors.nileBlue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  comingSoonText: {
    color: Colors.card,
    fontSize: 10,
    fontWeight: 'bold',
  },
  speedyTicketDescription: {
    fontSize: 12,
    color: Colors.lightText,
    lineHeight: 16,
    marginBottom: 16, // Increased from 12 to 16
  },
  speedyTicketFeatures: {
    marginBottom: 20, // Increased from 16 to 20
  },
  speedyTicketFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Increased from 8 to 10
    gap: 8,
  },
  speedyTicketFeatureText: {
    fontSize: 12,
    color: Colors.text,
  },
  speedyTicketButton: {
    paddingVertical: 12, // Increased from 10 to 12
    paddingHorizontal: 16,
    backgroundColor: Colors.gold,
    marginTop: 10, // Increased from 8 to 10
  },
  speedyTicketImage: {
    width: '40%',
    height: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: Colors.text,
    fontSize: 14,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  ticketsContainer: {
    paddingBottom: 8,
  },
  ticketCard: {
    width: 140,
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ticketCardSelected: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
  },
  ticketName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  ticketPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 8,
  },
  ticketDescription: {
    fontSize: 12,
    color: Colors.lightText,
  },
  divider: {
    marginVertical: 8,
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
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
    zIndex: 1,
  },
  calendarButtonSelected: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  calendarButtonText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  calendarButtonTextSelected: {
    color: Colors.card,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
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
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeCard: {
    width: '22%',
    padding: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeCardSelected: {
    borderColor: Colors.gold,
    backgroundColor: Colors.gold,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  timeTextSelected: {
    color: Colors.card,
  },
  summaryContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.text,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  summaryPlaceholder: {
    fontSize: 14,
    color: Colors.lightText,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  purchaseButton: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  notesContainer: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  notesText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
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
    borderBottomColor: Colors.border,
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
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
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
});