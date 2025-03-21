import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Image } from 'react-native';
import { Ticket, Calendar, QrCode, X } from 'lucide-react-native';
import { UserTicket } from '@/types';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import tickets from '@/mocks/tickets';

interface UserTicketCardProps {
  userTicket: UserTicket;
  onPress: (userTicket: UserTicket) => void;
}

export default function UserTicketCard({ userTicket, onPress }: UserTicketCardProps) {
  const [qrVisible, setQrVisible] = useState(false);
  const ticket = tickets.find(t => t.id === userTicket.ticketId);
  
  if (!ticket) return null;
  
  const handlePress = () => {
    if (!userTicket.used) {
      setQrVisible(true);
    } else {
      onPress(userTicket);
    }
  };
  
  const closeQrModal = () => {
    setQrVisible(false);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <>
      <Pressable 
        style={[styles.container, userTicket.used && styles.usedContainer]} 
        onPress={handlePress}
        android_ripple={{ color: Colors.border }}
        disabled={userTicket.used}
      >
        {userTicket.used && (
          <View style={styles.usedOverlay}>
            <Text style={styles.usedText}>USATO</Text>
          </View>
        )}
        
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ticket size={24} color={Colors.gold} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={Typography.h3} numberOfLines={1}>{ticket.name}</Text>
            <Text style={Typography.caption}>
              {userTicket.quantity || 1} {(userTicket.quantity || 1) > 1 ? 'biglietti' : 'biglietto'}
            </Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Calendar size={16} color={Colors.nileBlue} />
            <Text style={[Typography.bodySmall, styles.infoText]}>
              Valido fino al: {formatDate(userTicket.validUntil)}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <QrCode size={16} color={Colors.nileBlue} />
            <Text style={[Typography.bodySmall, styles.infoText]}>
              {userTicket.used ? "Biglietto utilizzato" : "Tocca per vedere il codice QR"}
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={Typography.caption}>
            Acquistato il {formatDate(userTicket.purchaseDate)}
          </Text>
          <Text style={styles.priceText}>
            €{((ticket.price * (userTicket.quantity || 1)).toFixed(2)).replace('.', ',')}
          </Text>
        </View>
        
        <View style={styles.egyptianBorder} />
      </Pressable>
      
      {/* QR Code Modal */}
      <Modal
        visible={qrVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeQrModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.qrContainer}>
            <View style={styles.qrHeader}>
              <Text style={styles.qrTitle}>Il tuo biglietto</Text>
              <Pressable style={styles.closeButton} onPress={closeQrModal}>
                <X size={20} color={Colors.text} />
              </Pressable>
            </View>
            
            <View style={styles.qrContent}>
              <Text style={styles.ticketName}>{ticket.name}</Text>
              <Text style={styles.ticketQuantity}>
                {userTicket.quantity || 1} {(userTicket.quantity || 1) > 1 ? 'biglietti' : 'biglietto'}
              </Text>
              
              <View style={styles.qrImageContainer}>
                <Image 
                  source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${userTicket.qrCode}` }}
                  style={styles.qrImage}
                />
              </View>
              
              <Text style={styles.qrCode}>{userTicket.qrCode}</Text>
              
              <View style={styles.validityInfo}>
                <Calendar size={16} color={Colors.nileBlue} />
                <Text style={styles.validityText}>
                  Valido fino al: {formatDate(userTicket.validUntil)}
                </Text>
              </View>
              
              <Text style={styles.instructions}>
                Mostra questo codice QR all'ingresso del museo per accedere
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.desertSand,
    position: 'relative',
    width: 280,
    marginRight: 12,
  },
  usedContainer: {
    opacity: 0.7,
  },
  usedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  usedText: {
    color: Colors.error,
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{ rotate: '-30deg' }],
    borderWidth: 2,
    borderColor: Colors.error,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  titleContainer: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  infoContainer: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: Colors.nileBlue,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  egyptianBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.gold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    width: '85%',
    maxWidth: 350,
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  qrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContent: {
    padding: 24,
    alignItems: 'center',
  },
  ticketName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  ticketQuantity: {
    fontSize: 16,
    color: Colors.lightText,
    marginBottom: 24,
  },
  qrImageContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  qrCode: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 24,
    letterSpacing: 1,
  },
  validityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  validityText: {
    fontSize: 14,
    color: Colors.nileBlue,
    fontWeight: '500',
  },
  instructions: {
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'center',
    fontStyle: 'italic',
  }
});