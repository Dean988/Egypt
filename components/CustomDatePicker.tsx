import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import Colors from '@/constants/colors';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface CustomDatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

export default function CustomDatePicker({ 
  selectedDate, 
  onDateChange,
  minimumDate,
  maximumDate
}: CustomDatePickerProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(selectedDate));
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const goToPreviousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    
    // Check if previous month is before minimum date
    if (minimumDate) {
      const minMonth = new Date(minimumDate);
      minMonth.setDate(1);
      if (newMonth < minMonth) return;
    }
    
    setCurrentMonth(newMonth);
  };
  
  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    
    // Check if next month is after maximum date
    if (maximumDate) {
      const maxMonth = new Date(maximumDate);
      maxMonth.setDate(1);
      if (newMonth > maxMonth) return;
    }
    
    setCurrentMonth(newMonth);
  };
  
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth);
    newDate.setDate(day);
    
    // Check if date is within allowed range
    if (minimumDate && newDate < minimumDate) return;
    if (maximumDate && newDate > maximumDate) return;
    
    onDateChange(newDate);
  };
  
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === month && 
        selectedDate.getFullYear() === year;
      
      const isDisabled = 
        (minimumDate && date < minimumDate) || 
        (maximumDate && date > maximumDate);
      
      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={[
            styles.dayCell, 
            isSelected && styles.selectedDayCell,
            isDisabled && styles.disabledDayCell
          ]}
          onPress={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
        >
          <Text style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            isDisabled && styles.disabledDayText
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <ChevronLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.monthYearText}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <ChevronRight size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.daysOfWeek}>
        {dayNames.map(day => (
          <Text key={day} style={styles.dayOfWeekText}>{day}</Text>
        ))}
      </View>
      
      <View style={styles.calendar}>
        {renderCalendar()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  navButton: {
    padding: 4,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dayOfWeekText: {
    width: 40,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.lightText,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedDayCell: {
    backgroundColor: Colors.gold,
    borderRadius: 20,
  },
  disabledDayCell: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedDayText: {
    color: Colors.card,
    fontWeight: 'bold',
  },
  disabledDayText: {
    color: Colors.lightText,
  },
});