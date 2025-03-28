import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import FloatingChatButton from '@/components/FloatingChatButton';
import FloatingServicesButton from '@/components/FloatingServicesButton';
import FloatingWebButton from '@/components/FloatingWebButton';
import ChatbotModal from '@/components/ChatbotModal';

export default function RootLayout() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaProvider style={{ backgroundColor: '#231f20' }}>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#231f20',
            },
            headerTintColor: Colors.gold,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '#231f20',
            },
            // This will hide the "(tabs)" text in the back button
            headerBackTitle: '',
            // This will hide the header title to remove the "(tabs)" text
            headerTitle: '',
            // Remove top padding/margin
            // headerStatusBarHeight: 0, // Removing because of linter error
          }}
        />
        
        <FloatingChatButton 
          onPress={toggleChatbot} 
        />
        
        {/* Museum website button indicator */}
        <Animated.View 
          style={[
            styles.museumLabelContainer,
            {
              transform: [{ scale: pulseAnim }]
            }
          ]}
        >
          {/* Ankh symbol */}
          <View style={styles.ankhSymbol}>
            <View style={styles.ankhTop} />
            <View style={styles.ankhStick} />
          </View>
          
          <View style={styles.labelTextContainer}>
            <Text style={styles.museumLabelTitle}>SITO UFFICIALE</Text>
            <Text style={styles.museumLabelSubtitle}>Museo Egizio</Text>
          </View>
          
          <View style={styles.museumLabelArrowContainer}>
            <View style={styles.museumLabelArrow} />
          </View>
        </Animated.View>
        
        <FloatingServicesButton />
        
        <FloatingWebButton />
        
        <ChatbotModal 
          isVisible={isChatbotVisible}
          onClose={() => setIsChatbotVisible(false)}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231f20',
  },
  museumLabelContainer: {
    position: 'absolute',
    top: 105,
    right: 95,
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.gold,
    zIndex: 998,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  ankhSymbol: {
    width: 18,
    height: 28,
    marginRight: 8,
    alignItems: 'center',
  },
  ankhTop: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: Colors.gold,
    backgroundColor: 'transparent',
  },
  ankhStick: {
    width: 2.5,
    height: 18,
    backgroundColor: Colors.gold,
    marginTop: -2,
  },
  labelTextContainer: {
    flexDirection: 'column',
  },
  museumLabelTitle: {
    color: Colors.gold,
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  museumLabelSubtitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  museumLabelArrowContainer: {
    marginLeft: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  museumLabelArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 12,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: Colors.gold,
  },
});