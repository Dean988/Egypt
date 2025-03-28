import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Coffee, Search, ArrowLeft, ShoppingBag } from 'lucide-react-native';
import Colors from '@/constants/colors';
import EgyptianPattern from '@/components/EgyptianPattern';

export default function CafeScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  
  const categories = [
    { id: 1, name: "Coffee" },
    { id: 2, name: "Tea" },
    { id: 3, name: "Pastries" },
    { id: 4, name: "Sandwiches" },
    { id: 5, name: "Desserts" },
  ];

  const menuItems = [
    { 
      id: 1, 
      name: "Nile Coffee", 
      price: "$4.99", 
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=3337&auto=format&fit=crop",
      category: "Coffee",
      description: "Rich blend with cardamom and cinnamon"
    },
    { 
      id: 2, 
      name: "Pharaoh's Delight", 
      price: "$5.99", 
      image: "https://images.unsplash.com/photo-1572286258217-215cf8e9d99e?q=80&w=3270&auto=format&fit=crop",
      category: "Coffee",
      description: "Espresso with date syrup and cream"
    },
    { 
      id: 3, 
      name: "Egyptian Pastry", 
      price: "$3.99", 
      image: "https://images.unsplash.com/photo-1558326567-98166e232c52?q=80&w=3269&auto=format&fit=crop",
      category: "Pastries",
      description: "Flaky pastry with honey and pistachios"
    },
    { 
      id: 4, 
      name: "Oasis Smoothie", 
      price: "$6.99", 
      image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=3270&auto=format&fit=crop",
      category: "Drinks",
      description: "Refreshing blend of dates, banana and almond milk"
    },
    { 
      id: 5, 
      name: "Hibiscus Tea", 
      price: "$3.99", 
      image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=3270&auto=format&fit=crop",
      category: "Tea",
      description: "Traditional Egyptian karkade tea"
    },
    { 
      id: 6, 
      name: "Falafel Wrap", 
      price: "$7.99", 
      image: "https://images.unsplash.com/photo-1561400934-58d6896b7e4f?q=80&w=3270&auto=format&fit=crop",
      category: "Sandwiches",
      description: "Falafel with tahini sauce and vegetables"
    },
    { 
      id: 7, 
      name: "Baklava", 
      price: "$4.99", 
      image: "https://images.unsplash.com/photo-1625517236224-4f4f6b2c9d33?q=80&w=3270&auto=format&fit=crop",
      category: "Desserts",
      description: "Sweet pastry with layers of nuts and honey"
    },
    { 
      id: 8, 
      name: "Mint Tea", 
      price: "$3.99", 
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=3270&auto=format&fit=crop",
      category: "Tea",
      description: "Fresh mint leaves with green tea"
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
        title: "Ristorazione",
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
          textShadowColor: 'rgba(0, 0, 0, 0.7)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
        },
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={styles.headerButton}>
            <ArrowLeft size={24} color={Colors.gold} />
          </Pressable>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Coffee size={24} color={Colors.gold} />
          </View>
        )
      }} />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.backgroundPattern}>
          {/* Cafe Hero */}
          <View style={styles.heroContainer}>
            <Image 
              source={{ uri: "https://www.vivogreen.it/wp-content/uploads/2024/04/Il-trend-verso-una-ristorazione-piu-sostenibile-levoluzione-dei-gusti-dei-consumatori.jpeg" }} 
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <View style={styles.heroTitleContainer}>
                <Text style={styles.heroTitle}>RISTORAZIONE</Text>
                <View style={styles.titleUnderline} />
              </View>
              <Text style={styles.heroSubtitle}>Sapori e atmosfere dell'antico Egitto</Text>
            </View>
          </View>
          
          {/* Search */}
          <View style={styles.searchContainer}>
            <Pressable style={styles.searchInputContainer} onPress={handleSearch}>
              <Search size={20} color={Colors.gold} />
              <Text style={styles.searchPlaceholder}>Coming soon...</Text>
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
          
          {/* Menu Items */}
          <View style={styles.menuContainer}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>MENU DEL GIORNO</Text>
              <View style={styles.sectionTitleUnderline} />
            </View>
            
            {menuItems.map(item => (
              <View key={item.id} style={styles.menuItem}>
                <Image source={{ uri: item.image }} style={styles.menuItemImage} />
                <View style={styles.menuItemContent}>
                  <View style={styles.menuItemHeader}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemPrice}>{item.price}</Text>
                  </View>
                  <Text style={styles.menuItemCategory}>{item.category}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
          
          {/* Cafe Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Orari di Apertura</Text>
            <Text style={styles.infoText}>Tutti i giorni dalle 9:00 alle 16:30</Text>
            <Text style={styles.infoText}>Situato al piano terra vicino all'ingresso principale</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchInputContainer: {
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
  sectionTitleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 2,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sectionTitleUnderline: {
    height: 3,
    width: 80,
    backgroundColor: Colors.gold,
    borderRadius: 1.5,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuItemImage: {
    width: 100,
    height: 100,
  },
  menuItemContent: {
    flex: 1,
    padding: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gold,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  menuItemCategory: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 6,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  infoContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});