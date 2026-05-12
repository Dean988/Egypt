import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { MessageCircle, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import ChatbotModal from '@/components/ChatbotModal';

export default function GlobalActionDock() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isCompact = width < 720;

  return (
    <>
      <View style={[styles.container, isCompact && styles.containerCompact]}>
        <Pressable
          style={({ pressed }) => [styles.action, isCompact && styles.actionCompact, pressed && styles.pressed]}
          onPress={() => router.push('/shop')}
          accessibilityRole="button"
          accessibilityLabel="Apri lo shop del museo"
        >
          <ShoppingBag size={18} color="#FFFFFF" />
          <Text style={styles.actionText}>Shop</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.action,
            isCompact && styles.actionCompact,
            styles.chatAction,
            pressed && styles.pressed,
          ]}
          onPress={() => setIsChatOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Apri il chatbot Khufu"
        >
          <MessageCircle size={18} color={Colors.surface} />
          <Text style={[styles.actionText, styles.chatText]}>Chat</Text>
        </Pressable>
      </View>

      <ChatbotModal isVisible={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 94,
    zIndex: 1000,
    gap: 10,
    alignItems: 'flex-end',
  },
  containerCompact: {
    left: 14,
    right: 14,
    bottom: 88,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  action: {
    minHeight: 46,
    minWidth: 116,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(212, 166, 74, 0.45)',
    paddingHorizontal: 14,
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  actionCompact: {
    flex: 1,
    minHeight: 40,
    minWidth: 0,
    paddingHorizontal: 12,
  },
  chatAction: {
    backgroundColor: Colors.lightGold,
    borderColor: Colors.lightGold,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  chatText: {
    color: Colors.surface,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
});
