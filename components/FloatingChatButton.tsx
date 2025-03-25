import React, { useRef, useEffect } from 'react';
import { StyleSheet, Pressable, Animated, Image } from 'react-native';
import Colors from '@/constants/colors';

interface FloatingChatButtonProps {
  onPress: () => void;
}

export default function FloatingChatButton({ onPress }: FloatingChatButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation).start();

    return () => {
      scaleAnim.stopAnimation();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        style={styles.button}
        onPress={onPress}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', radius: 28 }}
      >
        <Image 
          source={{ uri: 'https://i.imgur.com/utO9ZvH.png' }} 
          style={styles.image} 
          resizeMode="contain"
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80, // Positioned lower
    right: 16,
    zIndex: 100,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gold, // Changed from '#000' to Colors.gold
  },
  image: {
    width: 40,
    height: 40,
  },
});