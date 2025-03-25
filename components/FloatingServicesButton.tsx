import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Pressable, Animated, Image, View, Text, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingBag, UtensilsCrossed, X, Search } from 'lucide-react-native';
import Colors from '@/constants/colors';
import EgyptianPattern from './EgyptianPattern';

export default function FloatingServicesButton() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<'shop' | 'restaurant' | null>(null);

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

  const handlePress = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setActiveSection(null);
  };

  const selectSection = (section: 'shop' | 'restaurant') => {
    setActiveSection(section);
  };

  const navigateToShop = () => {
    closeMenu();
    router.push('/shop');
  };

  const navigateToRestaurant = () => {
    closeMenu();
    router.push('/cafe'); // Currently points to cafe since we don't have a dedicated restaurant page
  };

  const shopItems = [
    { id: 1, name: "Pharaoh Statue", price: "$24.99", image: "https://images.unsplash.com/photo-1562619371-b67725b6fde2?q=80&w=3270&auto=format&fit=crop" },
    { id: 2, name: "Egyptian Papyrus", price: "$19.99", image: "https://images.unsplash.com/photo-1591040092219-081fb773589d?q=80&w=3270&auto=format&fit=crop" },
    { id: 3, name: "Scarab Amulet", price: "$12.99", image: "https://images.unsplash.com/photo-1594733094166-d6565c6f7640?q=80&w=3270&auto=format&fit=crop" },
    { id: 4, name: "Hieroglyphic Bookmark", price: "$7.99", image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=3270&auto=format&fit=crop" },
  ];

  const restaurantItems = [
    { id: 1, name: "Mediterranean Platter", price: "$18.99", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=3269&auto=format&fit=crop" },
    { id: 2, name: "Nile River Fish", price: "$22.99", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=3270&auto=format&fit=crop" },
    { id: 3, name: "Egyptian Koshari", price: "$14.99", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=3270&auto=format&fit=crop" },
    { id: 4, name: "Lamb Tagine", price: "$24.99", image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=3164&auto=format&fit=crop" },
  ];

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
        onPress={handlePress}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', radius: 28 }}
      >
        <Image 
          source={{ uri: 'https://i.imgur.com/KKezak7.png' }} 
          style={styles.image} 
          resizeMode="contain"
        />
      </Pressable>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.menuContainer}>
            <Pressable style={styles.menuContent} onPress={(e) => e.stopPropagation()}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Museum Services</Text>
                <Pressable onPress={closeMenu} style={styles.closeButton}>
                  <X size={20} color={Colors.text} />
                </Pressable>
              </View>
              
              <EgyptianPattern color={Colors.gold} />
              
              {/* Search Bar - Coming Soon */}
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Search size={20} color={Colors.lightText} />
                  <Text style={styles.searchPlaceholder}>Coming soon...</Text>
                </View>
              </View>
              
              <View style={styles.menuTabs}>
                <Pressable 
                  style={[
                    styles.menuTab, 
                    activeSection === 'shop' && styles.menuTabActive
                  ]}
                  onPress={() => selectSection('shop')}
                >
                  <ShoppingBag size={18} color={activeSection === 'shop' ? Colors.gold : Colors.text} />
                  <Text style={[
                    styles.menuTabText,
                    activeSection === 'shop' && styles.menuTabTextActive
                  ]}>Museum Shop</Text>
                </Pressable>

                <Pressable 
                  style={[
                    styles.menuTab, 
                    activeSection === 'restaurant' && styles.menuTabActive
                  ]}
                  onPress={() => selectSection('restaurant')}
                >
                  <UtensilsCrossed size={18} color={activeSection === 'restaurant' ? Colors.gold : Colors.text} />
                  <Text style={[
                    styles.menuTabText,
                    activeSection === 'restaurant' && styles.menuTabTextActive
                  ]}>Ristorazione</Text>
                </Pressable>
              </View>
              
              {activeSection === 'shop' && (
                <View style={styles.sectionContent}>
                  <View style={styles.sectionHeader}>
                    <Image 
                      source={{ uri: "https://shop.museoegizio.it/media/wysiwyg/banner02.jpg" }} 
                      style={styles.sectionImage}
                      resizeMode="cover"
                    />
                    <View style={styles.sectionOverlay}>
                      <Text style={styles.sectionTitle}>Museum Shop</Text>
                      <Text style={styles.sectionSubtitle}>Take home a piece of ancient Egypt</Text>
                    </View>
                  </View>
                  
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.itemsContainer}
                  >
                    {shopItems.map(item => (
                      <View key={item.id} style={styles.itemCard}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                      </View>
                    ))}
                  </ScrollView>
                  
                  <Pressable style={styles.viewAllButton} onPress={navigateToShop}>
                    <Text style={styles.viewAllText}>View All Products</Text>
                  </Pressable>
                </View>
              )}

              {activeSection === 'restaurant' && (
                <View style={styles.sectionContent}>
                  <View style={styles.sectionHeader}>
                    <Image 
                      source={{ uri: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=3174&auto=format&fit=crop" }} 
                      style={styles.sectionImage}
                      resizeMode="cover"
                    />
                    <View style={styles.sectionOverlay}>
                      <Text style={styles.sectionTitle}>Ristorazione</Text>
                      <Text style={styles.sectionSubtitle}>Authentic Mediterranean cuisine</Text>
                    </View>
                  </View>
                  
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.itemsContainer}
                  >
                    {restaurantItems.map(item => (
                      <View key={item.id} style={styles.itemCard}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                      </View>
                    ))}
                  </ScrollView>
                  
                  <Pressable style={styles.viewAllButton} onPress={navigateToRestaurant}>
                    <Text style={styles.viewAllText}>View Full Menu</Text>
                  </Pressable>
                </View>
              )}
              
              {!activeSection && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>Select a service to explore</Text>
                </View>
              )}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 160, // Positioned higher
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  menuContent: {
    width: '100%',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
  menuTabs: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'space-around', // Distribute tabs evenly
  },
  menuTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  menuTabActive: {
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  menuTabText: {
    marginLeft: 8,
    fontWeight: '500',
    color: Colors.text,
  },
  menuTabTextActive: {
    color: Colors.gold,
  },
  sectionContent: {
    padding: 16,
  },
  sectionHeader: {
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  sectionImage: {
    width: '100%',
    height: '100%',
  },
  sectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  itemsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  itemCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: Colors.papyrus,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemImage: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    padding: 8,
    paddingBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.gold,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  viewAllButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  viewAllText: {
    color: Colors.card,
    fontWeight: '600',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    color: Colors.lightText,
    fontSize: 16,
  },
});