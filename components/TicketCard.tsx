import React from 'react';
import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';
import { Ticket, Clock, Calendar, Users } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface TicketCardProps {
  ticket: {
    id: string;
    name: string;
    price: string;
    description: string;
    type: string;
    validityPeriod: string;
    maxPeople: number;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export default function TicketCard({ ticket, isSelected, onSelect }: TicketCardProps) {
  return (
    <Pressable 
      style={[styles.container, isSelected && styles.selectedContainer]} 
      onPress={onSelect}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
            <Ticket size={20} color={isSelected ? Colors.card : Colors.gold} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{ticket.name}</Text>
            <Text style={styles.price}>{ticket.price}</Text>
          </View>
        </View>
        
        <Text style={styles.description}>{ticket.description}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Clock size={16} color={Colors.lightText} />
            <Text style={styles.infoText}>{ticket.validityPeriod}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Users size={16} color={Colors.lightText} />
            <Text style={styles.infoText}>Max {ticket.maxPeople} persone</Text>
          </View>
        </View>
      </View>
      
      <View style={[styles.selectionIndicator, isSelected && styles.selectedIndicator]}>
        <View style={[styles.checkCircle, isSelected && styles.selectedCheckCircle]}>
          {isSelected && (
            <View style={styles.checkInner} />
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedContainer: {
    borderColor: Colors.gold,
    borderWidth: 2,
    backgroundColor: 'rgba(245, 197, 24, 0.05)',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  selectedIconContainer: {
    backgroundColor: Colors.gold,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  description: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.lightText,
  },
  selectionIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  selectedIndicator: {
    
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckCircle: {
    borderColor: Colors.gold,
    backgroundColor: Colors.gold,
  },
  checkInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.card,
  },
});