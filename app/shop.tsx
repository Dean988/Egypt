import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Check, Search, ShoppingBag, SlidersHorizontal } from 'lucide-react-native';
import Colors from '@/constants/colors';

const products = [
  {
    id: 'p1',
    name: 'Replica statuetta di Bastet',
    price: '24,90 EUR',
    category: 'Repliche',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1200&auto=format&fit=crop',
    description: 'Resina rifinita a mano, formato da scrivania.',
  },
  {
    id: 'p2',
    name: 'Quaderno papiro',
    price: '12,50 EUR',
    category: 'Cartoleria',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop',
    description: 'Copertina materica con pattern ispirato ai papiri.',
  },
  {
    id: 'p3',
    name: 'Collana Ankh satinata',
    price: '18,00 EUR',
    category: 'Gioielli',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop',
    description: 'Pendente leggero con finitura bronzo caldo.',
  },
  {
    id: 'p4',
    name: 'Guida illustrata del museo',
    price: '29,00 EUR',
    category: 'Libri',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop',
    description: 'Percorso visuale tra sale, opere e contesto storico.',
  },
  {
    id: 'p5',
    name: 'Segnalibro geroglifico',
    price: '7,90 EUR',
    category: 'Cartoleria',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=1200&auto=format&fit=crop',
    description: 'Metallo sottile, ideale insieme alla guida cartacea.',
  },
  {
    id: 'p6',
    name: 'Modello piramide',
    price: '22,00 EUR',
    category: 'Repliche',
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1200&auto=format&fit=crop',
    description: 'Oggetto compatto per ricordare la visita.',
  },
];

const categories = ['Tutto', 'Repliche', 'Gioielli', 'Libri', 'Cartoleria'];

export default function ShopScreen() {
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tutto');
  const [selected, setSelected] = useState<string[]>([]);
  const isWide = width >= 920;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'Tutto' || product.category === category;
      const matchesQuery = `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const toggleProduct = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Stack.Screen
        options={{
          title: 'Shop',
          headerShown: true,
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.gold,
          headerTitleStyle: { fontWeight: '800' },
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, isWide && styles.heroWide]}>
          <View style={styles.heroText}>
            <Text style={styles.kicker}>Shop del museo</Text>
            <Text style={[styles.title, !isWide && styles.titleCompact]}>
              Souvenir scelti per continuare la visita anche fuori dalle sale.
            </Text>
            <Text style={[styles.subtitle, !isWide && styles.subtitleCompact]}>
              Una selezione compatta di libri, repliche e piccoli oggetti ispirati alla collezione.
            </Text>
          </View>
          <Image
            source={{ uri: 'https://shop.museoegizio.it/media/wysiwyg/banner02.jpg' }}
            style={[styles.heroImage, isWide && styles.heroImageWide]}
          />
        </View>

        <View style={styles.toolbar}>
          <View style={styles.searchBox}>
            <Search size={18} color={Colors.lightText} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
              placeholder="Cerca prodotti"
              placeholderTextColor={Colors.lightText}
            />
          </View>
          <View style={styles.filterIcon}>
            <SlidersHorizontal size={20} color={Colors.deepGold} />
          </View>
        </View>

        <View style={[styles.categories, !isWide && { width: Math.max(width - 36, 0) }]}>
          {categories.map((item) => (
            <Pressable
              key={item}
              style={[styles.category, category === item && styles.categoryActive]}
              onPress={() => setCategory(item)}
              accessibilityRole="button"
              accessibilityState={{ selected: category === item }}
            >
              <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.grid, isWide && styles.gridWide]}>
          {filteredProducts.map((product) => {
            const isSelected = selected.includes(product.id);
            return (
              <Pressable
                key={product.id}
                style={({ pressed }) => [
                  styles.card,
                  isWide && styles.cardWide,
                  isSelected && styles.cardSelected,
                  pressed && styles.pressed,
                ]}
                onPress={() => toggleProduct(product.id)}
                accessibilityRole="button"
                accessibilityLabel={`${product.name}, ${product.price}`}
              >
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.productCategory}>{product.category}</Text>
                    {isSelected && (
                      <View style={styles.selectedDot}>
                        <Check size={14} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productDescription}>{product.description}</Text>
                  <View style={styles.buyRow}>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <Text style={styles.addText}>{isSelected ? 'Nel carrello' : 'Aggiungi'}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.cartSummary}>
          <ShoppingBag size={20} color={Colors.deepGold} />
          <Text style={styles.cartText}>
            {selected.length === 0
              ? 'Seleziona uno o piu prodotti per preparare il ritiro allo shop.'
              : `${selected.length} prodotti selezionati. Il checkout online e in preparazione.`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 128,
  },
  hero: {
    backgroundColor: Colors.surface,
    padding: 22,
    gap: 18,
  },
  heroWide: {
    minHeight: 360,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 72,
  },
  heroText: {
    flex: 1,
    maxWidth: 620,
  },
  kicker: {
    color: Colors.lightGold,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
  },
  title: {
    color: Colors.inverseText,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
  },
  titleCompact: {
    fontSize: 31,
    lineHeight: 37,
    maxWidth: 340,
  },
  subtitle: {
    color: '#E7DCCB',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  subtitleCompact: {
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 340,
  },
  heroImage: {
    width: '100%',
    height: 210,
    borderRadius: 8,
  },
  heroImageWide: {
    width: 420,
    height: 260,
  },
  toolbar: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 18,
    marginTop: 20,
  },
  searchBox: {
    flex: 1,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    outlineStyle: 'none' as any,
  },
  filterIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categories: {
    maxWidth: 1180,
    width: '100%',
    boxSizing: 'border-box' as any,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 4,
  },
  category: {
    minHeight: 40,
    justifyContent: 'center',
    borderRadius: 7,
    paddingHorizontal: 14,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryActive: {
    backgroundColor: Colors.deepGold,
    borderColor: Colors.deepGold,
  },
  categoryText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  grid: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    gap: 14,
  },
  gridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardWide: {
    width: '31.8%',
  },
  cardSelected: {
    borderColor: Colors.deepGold,
  },
  productImage: {
    width: '100%',
    height: 190,
  },
  cardBody: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productCategory: {
    color: Colors.deepGold,
    fontSize: 12,
    fontWeight: '800',
  },
  selectedDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.deepGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productName: {
    color: Colors.text,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '800',
  },
  productDescription: {
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  buyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
  productPrice: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  addText: {
    color: Colors.deepGold,
    fontSize: 14,
    fontWeight: '800',
  },
  cartSummary: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 18,
    paddingHorizontal: 18,
  },
  cartText: {
    flex: 1,
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
});
