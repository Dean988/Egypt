import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, Rect } from 'react-native-svg';
import Colors from '@/constants/colors';

interface EgyptianPatternProps {
  color?: string;
  style?: any;
  variant?: 'simple' | 'elaborate';
}

export default function EgyptianPattern({ 
  color = Colors.gold, 
  style, 
  variant = 'simple' 
}: EgyptianPatternProps) {
  if (variant === 'elaborate') {
    return (
      <View style={[styles.container, style]}>
        <Svg height="24" width="100%" viewBox="0 0 800 24">
          <G fill={color}>
            {/* Base lines */}
            <Path d="M0,0 L800,0 L800,2 L0,2 Z" />
            <Path d="M0,22 L800,22 L800,24 L0,24 Z" />
            
            {/* Ankh symbols */}
            <Path d="M50,4 C50,8 54,12 54,16 C54,20 50,20 50,16 C50,12 46,8 46,4 Z" />
            <Path d="M48,16 L52,16 L52,20 L48,20 Z" />
            
            <Path d="M150,4 C150,8 154,12 154,16 C154,20 150,20 150,16 C150,12 146,8 146,4 Z" />
            <Path d="M148,16 L152,16 L152,20 L148,20 Z" />
            
            <Path d="M250,4 C250,8 254,12 254,16 C254,20 250,20 250,16 C250,12 246,8 246,4 Z" />
            <Path d="M248,16 L252,16 L252,20 L248,20 Z" />
            
            <Path d="M350,4 C350,8 354,12 354,16 C354,20 350,20 350,16 C350,12 346,8 346,4 Z" />
            <Path d="M348,16 L352,16 L352,20 L348,20 Z" />
            
            <Path d="M450,4 C450,8 454,12 454,16 C454,20 450,20 450,16 C450,12 446,8 446,4 Z" />
            <Path d="M448,16 L452,16 L452,20 L448,20 Z" />
            
            <Path d="M550,4 C550,8 554,12 554,16 C554,20 550,20 550,16 C550,12 546,8 546,4 Z" />
            <Path d="M548,16 L552,16 L552,20 L548,20 Z" />
            
            <Path d="M650,4 C650,8 654,12 654,16 C654,20 650,20 650,16 C650,12 646,8 646,4 Z" />
            <Path d="M648,16 L652,16 L652,20 L648,20 Z" />
            
            <Path d="M750,4 C750,8 754,12 754,16 C754,20 750,20 750,16 C750,12 746,8 746,4 Z" />
            <Path d="M748,16 L752,16 L752,20 L748,20 Z" />
            
            {/* Decorative elements */}
            <Path d="M100,8 L120,8 L120,16 L100,16 Z" />
            <Path d="M200,8 L220,8 L220,16 L200,16 Z" />
            <Path d="M300,8 L320,8 L320,16 L300,16 Z" />
            <Path d="M400,8 L420,8 L420,16 L400,16 Z" />
            <Path d="M500,8 L520,8 L520,16 L500,16 Z" />
            <Path d="M600,8 L620,8 L620,16 L600,16 Z" />
            <Path d="M700,8 L720,8 L720,16 L700,16 Z" />
          </G>
        </Svg>
      </View>
    );
  }
  
  // Simple pattern (default)
  return (
    <View style={[styles.container, style]}>
      <Svg height="8" width="100%" viewBox="0 0 800 8">
        <G fill={color}>
          <Path d="M0,0 L800,0 L800,2 L0,2 Z" />
          <Path d="M0,4 L800,4 L800,6 L0,6 Z" />
          <Path d="M10,2 L30,2 L30,4 L10,4 Z" />
          <Path d="M50,2 L70,2 L70,4 L50,4 Z" />
          <Path d="M90,2 L110,2 L110,4 L90,4 Z" />
          <Path d="M130,2 L150,2 L150,4 L130,4 Z" />
          <Path d="M170,2 L190,2 L190,4 L170,4 Z" />
          <Path d="M210,2 L230,2 L230,4 L210,4 Z" />
          <Path d="M250,2 L270,2 L270,4 L250,4 Z" />
          <Path d="M290,2 L310,2 L310,4 L290,4 Z" />
          <Path d="M330,2 L350,2 L350,4 L330,4 Z" />
          <Path d="M370,2 L390,2 L390,4 L370,4 Z" />
          <Path d="M410,2 L430,2 L430,4 L410,4 Z" />
          <Path d="M450,2 L470,2 L470,4 L450,4 Z" />
          <Path d="M490,2 L510,2 L510,4 L490,4 Z" />
          <Path d="M530,2 L550,2 L550,4 L530,4 Z" />
          <Path d="M570,2 L590,2 L590,4 L570,4 Z" />
          <Path d="M610,2 L630,2 L630,4 L610,4 Z" />
          <Path d="M650,2 L670,2 L670,4 L650,4 Z" />
          <Path d="M690,2 L710,2 L710,4 L690,4 Z" />
          <Path d="M730,2 L750,2 L750,4 L730,4 Z" />
          <Path d="M770,2 L790,2 L790,4 L770,4 Z" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
  },
});