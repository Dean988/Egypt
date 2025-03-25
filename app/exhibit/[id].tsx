import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Clock, MapPin, ArrowLeft, Share2, Info, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import exhibits from '@/mocks/exhibits';
import EgyptianPattern from '@/components/EgyptianPattern';
import { useUserStore } from '@/store/user-store';

export default function ExhibitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Get the exhibit by ID
  const exhibit = exhibits.find(e => e.id === id);
  
  if (!exhibit) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Exhibit not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: exhibit.name,
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <ArrowLeft size={24} color={Colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Image */}
          <View style={styles.heroContainer}>
            <Image 
              source={{ uri: exhibit.imageUrl }} 
              style={styles.heroImage}
            />
            <View style={styles.heroOverlay}>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{exhibit.category || "Artifact"}</Text>
              </View>
            </View>
          </View>
          
          {/* Exhibit Info */}
          <View style={styles.infoContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{exhibit.name}</Text>
              <Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
                <Heart 
                  size={24} 
                  color={isFavorite ? Colors.error : Colors.lightText} 
                  fill={isFavorite ? Colors.error : 'transparent'}
                />
              </Pressable>
            </View>
            
            <Text style={styles.period}>{exhibit.period || "Ancient Egypt"}</Text>
            
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Clock size={18} color={Colors.nileBlue} />
                <Text style={styles.metaText}>{exhibit.date || "Unknown"}</Text>
              </View>
              <View style={styles.metaItem}>
                <MapPin size={18} color={Colors.nileBlue} />
                <Text style={styles.metaText}>{exhibit.location || "Floor 1"}</Text>
              </View>
            </View>
            
            <EgyptianPattern style={styles.divider} />
            
            <Text style={styles.description}>{exhibit.description}</Text>
            
            <View style={styles.factContainer}>
              <View style={styles.factHeader}>
                <Info size={18} color={Colors.gold} />
                <Text style={styles.factTitle}>Did you know?</Text>
              </View>
              <Text style={styles.factText}>
                {exhibit.fact || "This artifact was discovered during excavations in the Valley of the Kings in the early 20th century."}
              </Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button 
                title="View in 3D" 
                onPress={() => {}} 
                style={styles.button}
              />
              <Button 
                title="Share" 
                onPress={() => {}} 
                variant="secondary"
                style={styles.button}
                icon={<Share2 size={18} color={Colors.text} />}
              />
            </View>
          </View>
          
          {/* Related Exhibits */}
          <View style={styles.relatedContainer}>
            <Text style={styles.relatedTitle}>Related Exhibits</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedContent}
            >
              {exhibits.slice(0, 3).map(relatedExhibit => (
                <Pressable 
                  key={relatedExhibit.id}
                  style={styles.relatedItem}
                  onPress={() => router.push(`/exhibit/${relatedExhibit.id}`)}
                >
                  <Image 
                    source={{ uri: relatedExhibit.imageUrl }} 
                    style={styles.relatedImage}
                  />
                  <View style={styles.relatedInfo}>
                    <Text style={styles.relatedName} numberOfLines={1}>
                      {relatedExhibit.name}
                    </Text>
                    <View style={styles.relatedMeta}>
                      <Text style={styles.relatedPeriod} numberOfLines={1}>
                        {relatedExhibit.period || "Ancient Egypt"}
                      </Text>
                      <ChevronRight size={16} color={Colors.lightText} />
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.papyrus,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  badgeContainer: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: Colors.card,
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoContainer: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    marginRight: 16,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  period: {
    fontSize: 16,
    color: Colors.lightText,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: Colors.nileBlue,
    fontWeight: '500',
  },
  divider: {
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  factContainer: {
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 197, 24, 0.3)',
  },
  factHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  factText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
  relatedContainer: {
    padding: 16,
    paddingTop: 0,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  relatedContent: {
    paddingBottom: 8,
  },
  relatedItem: {
    width: 160,
    marginRight: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  relatedImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  relatedInfo: {
    padding: 8,
  },
  relatedName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  relatedMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  relatedPeriod: {
    fontSize: 12,
    color: Colors.lightText,
    flex: 1,
  },
  spacer: {
    height: 100,
  },
});