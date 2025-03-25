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
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={styles.headerButton}>
            <ArrowLeft size={24} color={Colors.text} />
          </Pressable>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Coffee size={24} color={Colors.gold} />
          </View>
        )
      }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cafe Hero */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: "https://www.vivogreen.it/wp-content/uploads/2024/04/Il-trend-verso-una-ristorazione-piu-sostenibile-levoluzione-dei-gusti-dei-consumatori.jpeg" }} 
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Ristorazione</Text>
            <Text style={styles.heroSubtitle}>Relax and enjoy Egyptian flavors</Text>
          </View>
        </View>
        
        {/* Search */}
        <View style={styles.searchContainer}>
          <Pressable style={styles.searchInputContainer} onPress={handleSearch}>
            <Search size={20} color={Colors.lightText} />
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
        
        <EgyptianPattern style={styles.divider} />
        
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Today's Menu</Text>
          
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
          <Text style={styles.infoTitle}>Ristorazione Hours</Text>
          <Text style={styles.infoText}>Open daily from 9:00 AM to 4:30 PM</Text>
          <Text style={styles.infoText}>Located on the ground floor near the main entrance</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchInputContainer: {
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
  menuContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuItemContent: {
    flex: 1,
    padding: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gold,
  },
  menuItemCategory: {
    fontSize: 12,
    color: Colors.lightText,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: Colors.text,
  },
  infoContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
});