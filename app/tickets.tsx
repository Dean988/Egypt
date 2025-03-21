import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image, Platform, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Check, Calendar as CalendarIcon, Clock, Users, Info, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import tickets from '@/mocks/tickets';
import EgyptianPattern from '@/components/EgyptianPattern';
// Import the custom date picker component instead
import CustomDatePicker from '@/components/CustomDatePicker';

export default function TicketsScreen() {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  
  // Predefined dates for quick selection
  const dates = [
    { id: 1, day: "Mon", date: "10", month: "Jun" },
    { id: 2, day: "Tue", date: "11", month: "Jun" },
    { id: 3, day: "Wed", date: "12", month: "Jun" },
    { id: 4, day: "Thu", date: "13", month: "Jun" },
    { id: 5, day: "Fri", date: "14", month: "Jun" },
    { id: 6, day: "Sat", date: "15", month: "Jun" },
    { id: 7, day: "Sun", date: "16", month: "Jun" },
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
    if (selectedTicket && selectedDate && selectedTime) {
      // In a real app, this would navigate to a payment screen
      alert(`Ticket purchased: ${selectedTicket.name} for ${selectedDate.day} ${selectedDate.date} ${selectedDate.month} at ${selectedTime.time}`);
    } else {
      alert("Please select a ticket, date, and time");
    }
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
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen options={{ 
        title: "Purchase Tickets",
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={styles.headerButton}>
            <ArrowLeft size={24} color={Colors.text} />
          </Pressable>
        ),
      }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: "https://www.museoegizio.it/wp-content/uploads/2023/03/Museo-Egizio-Torino-Statua-Ramesse-II.jpg" }} 
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Museum Tickets</Text>
            <Text style={styles.heroSubtitle}>Book your visit to the Egyptian Museum</Text>
          </View>
        </View>
        
        {/* Ticket Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Ticket Type</Text>
          </View>
          
          <View style={styles.ticketsContainer}>
            {tickets.map(ticket => (
              <Pressable 
                key={ticket.id} 
                style={[
                  styles.ticketCard,
                  selectedTicket?.id === ticket.id && styles.ticketCardSelected
                ]}
                onPress={() => handleTicketSelect(ticket)}
              >
                <View style={styles.ticketContent}>
                  <View style={styles.ticketHeader}>
                    <Text style={styles.ticketName}>{ticket.name}</Text>
                    <View style={[
                      styles.radioButton,
                      selectedTicket?.id === ticket.id && styles.radioButtonSelected
                    ]}>
                      {selectedTicket?.id === ticket.id && (
                        <View style={styles.radioButtonInner}>
                          <Check size={12} color={Colors.card} />
                        </View>
                      )}
                    </View>
                  </View>
                  
                  <Text style={styles.ticketDescription}>{ticket.description}</Text>
                  
                  <View style={styles.ticketDetails}>
                    <View style={styles.ticketDetailItem}>
                      <Users size={16} color={Colors.nileBlue} />
                      <Text style={styles.ticketDetailText}>{ticket.type}</Text>
                    </View>
                    <View style={styles.ticketDetailItem}>
                      <Clock size={16} color={Colors.nileBlue} />
                      <Text style={styles.ticketDetailText}>{ticket.duration}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.ticketPriceContainer}>
                    <Text style={styles.ticketPrice}>{ticket.price}</Text>
                    {ticket.originalPrice && (
                      <Text style={styles.ticketOriginalPrice}>{ticket.originalPrice}</Text>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        
        <EgyptianPattern style={styles.divider} />
        
        {/* Date Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <CalendarIcon size={20} color={Colors.gold} />
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
              <CalendarIcon size={20} color={selectedDate?.id === 'custom' ? Colors.card : Colors.gold} />
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
        
        {/* Time Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <Clock size={20} color={Colors.gold} />
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
        
        {/* Info Box */}
        <View style={styles.infoBox}>
          <View style={styles.infoIconContainer}>
            <Info size={24} color={Colors.nileBlue} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Important Information</Text>
            <Text style={styles.infoText}>
              Please arrive 15 minutes before your scheduled time. Tickets are non-refundable but can be rescheduled up to 24 hours before your visit.
            </Text>
          </View>
        </View>
        
        {/* Purchase Button */}
        <View style={styles.purchaseContainer}>
          <Button 
            title="Purchase Tickets" 
            onPress={handlePurchase}
            disabled={!selectedTicket || !selectedDate || !selectedTime}
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.papyrus,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  heroContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
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
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  ticketsContainer: {
    gap: 16,
  },
  ticketCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ticketCardSelected: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(245, 197, 24, 0.05)',
  },
  ticketContent: {
    padding: 16,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.gold,
    backgroundColor: Colors.gold,
  },
  radioButtonInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
  },
  ticketDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  ticketDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ticketDetailText: {
    fontSize: 14,
    color: Colors.nileBlue,
  },
  ticketPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  ticketOriginalPrice: {
    fontSize: 16,
    color: Colors.lightText,
    textDecorationLine: 'line-through',
  },
  divider: {
    marginVertical: 8,
  },
  dateSelectionContainer: {
    gap: 16,
  },
  datesContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 12,
  },
  dateCard: {
    width: 70,
    height: 90,
    backgroundColor: Colors.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateCardSelected: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  dateDay: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 24,
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
    paddingVertical: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeCardSelected: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  timeTextSelected: {
    color: Colors.card,
  },
  infoBox: {
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(26, 75, 132, 0.1)',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.nileBlue,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 75, 132, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.nileBlue,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  purchaseContainer: {
    padding: 16,
    marginBottom: 24,
  },
});