import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { ShoppingBag, Search, Filter, ArrowLeft } from 'lucide-react-native';
import Colors from '@/constants/colors';
import EgyptianPattern from '@/components/EgyptianPattern';

export default function ShopScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  
  const categories = [
    { id: 1, name: "Statues" },
    { id: 2, name: "Jewelry" },
    { id: 3, name: "Books" },
    { id: 4, name: "Papyrus" },
    { id: 5, name: "Souvenirs" },
  ];

  const shopItems = [
    { 
      id: 1, 
      name: "Pharaoh Statue", 
      price: "$24.99", 
      image: "https://images.unsplash.com/photo-1562619371-b67725b6fde2?q=80&w=3270&auto=format&fit=crop",
      category: "Statues",
      description: "Hand-crafted replica of King Tutankhamun"
    },
    { 
      id: 2, 
      name: "Egyptian Papyrus", 
      price: "$19.99", 
      image: "https://images.unsplash.com/photo-1591040092219-081fb773589d?q=80&w=3270&auto=format&fit=crop",
      category: "Papyrus",
      description: "Authentic papyrus with hieroglyphic art"
    },
    { 
      id: 3, 
      name: "Scarab Amulet", 
      price: "$12.99", 
      image: "https://images.unsplash.com/photo-1594733094166-d6565c6f7640?q=80&w=3270&auto=format&fit=crop",
      category: "Jewelry",
      description: "Replica of ancient Egyptian scarab amulet"
    },
    { 
      id: 4, 
      name: "Hieroglyphic Bookmark", 
      price: "$7.99", 
      image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=3270&auto=format&fit=crop",
      category: "Souvenirs",
      description: "Metal bookmark with hieroglyphic designs"
    },
    { 
      id: 5, 
      name: "Ancient Egypt Book", 
      price: "$29.99", 
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=3270&auto=format&fit=crop",
      category: "Books",
      description: "Illustrated guide to ancient Egyptian civilization"
    },
    { 
      id: 6, 
      name: "Nefertiti Bust", 
      price: "$34.99", 
      image: "https://images.unsplash.com/photo-1594733676170-8d499ab7c8a2?q=80&w=3270&auto=format&fit=crop",
      category: "Statues",
      description: "Replica of the famous Nefertiti bust"
    },
    { 
      id: 7, 
      name: "Ankh Necklace", 
      price: "$16.99", 
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=3270&auto=format&fit=crop",
      category: "Jewelry",
      description: "Silver-plated ankh symbol necklace"
    },
    { 
      id: 8, 
      name: "Pyramid Model", 
      price: "$22.99", 
      image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=3270&auto=format&fit=crop",
      category: "Souvenirs",
      description: "Detailed model of the Great Pyramid of Giza"
    },
  ];

  const handleSearch = () => {
    Alert.alert(
      "Coming Soon...",
      "Search functionality will be available in a future update.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen options={{ 
        title: "Museum Shop",
        headerShown: true,
        headerStyle: {
          backgroundColor: '#231f20',
          borderBottomWidth: 2,
          borderBottomColor: Colors.gold,
        },
        headerTintColor: Colors.gold,
        headerTitleStyle: {
          fontWeight: 'bold',
          letterSpacing: 1,
        },
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={styles.headerButton}>
            <ArrowLeft size={24} color={Colors.gold} />
          </Pressable>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <ShoppingBag size={24} color={Colors.gold} />
          </View>
        )
      }} />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.backgroundPattern}>
          {/* Shop Hero */}
          <View style={styles.heroContainer}>
            <Image 
              source={{ uri: "https://shop.museoegizio.it/media/wysiwyg/banner02.jpg" }} 
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <View style={styles.heroTitleContainer}>
                <Text style={styles.heroTitle}>MUSEUM SHOP</Text>
                <View style={styles.titleUnderline} />
              </View>
              <Text style={styles.heroSubtitle}>Porta a casa un pezzo dell'antico Egitto</Text>
            </View>
          </View>
          
          {/* Search and Filter */}
          <View style={styles.searchContainer}>
            <Pressable style={styles.searchInputContainer} onPress={handleSearch}>
              <Search size={20} color={Colors.gold} />
              <Text style={styles.searchPlaceholder}>Coming soon...</Text>
            </Pressable>
            <Pressable style={styles.filterButton} onPress={handleSearch}>
              <Filter size={20} color={Colors.gold} />
            </Pressable>
          </View>
          
          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <Pressable style={[styles.categoryButton, styles.categoryButtonActive]}>
              <Text style={[styles.categoryText, styles.categoryTextActive]}>All</Text>
            </Pressable>
            
            {categories.map(category => (
              <Pressable key={category.id} style={styles.categoryButton}>
                <Text style={styles.categoryText}>{category.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
          
          <EgyptianPattern style={styles.divider} color={Colors.gold} />
          
          {/* Featured Section */}
          <View style={styles.featuredSection}>
            <Image 
              source={{ uri: "https://archeologiavocidalpassato.com/wp-content/uploads/2016/01/museo-egizio_gallerie5.jpg" }}
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <View style={styles.featuredOverlay}>
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>Collezione Esclusiva</Text>
                <Text style={styles.featuredDescription}>
                  Scopri la nostra collezione esclusiva di repliche di qualità museale, realizzate con attenzione ai dettagli storici.
                </Text>
                <Pressable style={styles.featuredButton}>
                  <Text style={styles.featuredButtonText}>Esplora Collezione</Text>
                </Pressable>
              </View>
            </View>
          </View>
          
          {/* Products Grid */}
          <View style={styles.productsGrid}>
            {shopItems.map(item => (
              <Pressable key={item.id} style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productContent}>
                  <Text style={styles.productCategory}>{item.category}</Text>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231f20',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#231f20',
  },
  backgroundPattern: {
    flex: 1,
    backgroundColor: '#231f20',
    backgroundImage: "url('https://www.transparenttextures.com/patterns/papyrus.png')",
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  headerRight: {
    marginRight: 16,
  },
  heroContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
    marginBottom: 24,
    borderBottomWidth: 3,
    borderBottomColor: Colors.gold,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitleContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.7)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 30,
    paddingVertical: 16,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 3,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  titleUnderline: {
    height: 3,
    width: 100,
    backgroundColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    borderRadius: 1.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: 'rgba(212, 175, 55, 0.6)',
    fontStyle: 'italic',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  categoryButtonActive: {
    backgroundColor: Colors.gold,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  categoryTextActive: {
    color: '#231f20',
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
    height: 20,
  },
  featuredSection: {
    marginHorizontal: 16,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
  },
  featuredContent: {
    padding: 20,
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    lineHeight: 20,
  },
  featuredButton: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  featuredButtonText: {
    color: '#231f20',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 160,
  },
  productContent: {
    padding: 12,
  },
  productCategory: {
    fontSize: 12,
    color: 'rgba(212, 175, 55, 0.7)',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  productDescription: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gold,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});