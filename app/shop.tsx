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
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={styles.headerButton}>
            <ArrowLeft size={24} color={Colors.text} />
          </Pressable>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <ShoppingBag size={24} color={Colors.gold} />
          </View>
        )
      }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Shop Hero */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: "https://shop.museoegizio.it/media/wysiwyg/banner02.jpg" }} 
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Museum Shop</Text>
            <Text style={styles.heroSubtitle}>Take home a piece of ancient Egypt</Text>
          </View>
        </View>
        
        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <Pressable style={styles.searchInputContainer} onPress={handleSearch}>
            <Search size={20} color={Colors.lightText} />
            <Text style={styles.searchPlaceholder}>Coming soon...</Text>
          </Pressable>
          <Pressable style={styles.filterButton} onPress={handleSearch}>
            <Filter size={20} color={Colors.text} />
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
        
        <EgyptianPattern style={styles.divider} />
        
        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <Image 
            source={{ uri: "https://archeologiavocidalpassato.com/wp-content/uploads/2016/01/museo-egizio_gallerie5.jpg" }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>Exclusive Collection</Text>
            <Text style={styles.featuredDescription}>
              Discover our exclusive collection of museum-quality replicas, crafted with attention to historical detail.
            </Text>
            <Pressable style={styles.featuredButton}>
              <Text style={styles.featuredButtonText}>Explore Collection</Text>
            </Pressable>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.papyrus,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerRight: {
    marginRight: 16,
  },
  heroContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
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
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: Colors.lightText,
    fontStyle: 'italic',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
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
    backgroundColor: Colors.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryButtonActive: {
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    borderColor: Colors.gold,
  },
  categoryText: {
    color: Colors.text,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: Colors.gold,
    fontWeight: '600',
  },
  divider: {
    marginBottom: 16,
  },
  featuredSection: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
    backgroundColor: Colors.card,
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  featuredButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: Colors.card,
    fontWeight: '600',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  productCard: {
    width: '50%',
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  productContent: {
    backgroundColor: Colors.card,
    padding: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderTopWidth: 0,
  },
  productCategory: {
    fontSize: 12,
    color: Colors.lightText,
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: Colors.lightText,
    marginBottom: 8,
    height: 32,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gold,
  },
});