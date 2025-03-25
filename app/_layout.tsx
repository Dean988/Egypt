import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import FloatingChatButton from '@/components/FloatingChatButton';
import FloatingServicesButton from '@/components/FloatingServicesButton';
import FloatingWebButton from '@/components/FloatingWebButton';
import ChatbotModal from '@/components/ChatbotModal';

export default function RootLayout() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.card,
            },
            headerTintColor: Colors.text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: Colors.papyrus,
            },
            // This will hide the "(tabs)" text in the back button
            headerBackTitle: '',
            // This will hide the header title to remove the "(tabs)" text
            headerTitle: '',
            // Remove top padding/margin
            headerStatusBarHeight: 0,
          }}
        />
        
        <FloatingChatButton 
          onPress={toggleChatbot} 
        />
        
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
  },
});