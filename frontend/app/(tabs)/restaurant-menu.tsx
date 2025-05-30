import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const menuData = [
  {
    id: 1,
    name: 'Nasi Padang',
    image: require('@/assets/images/food.jpg'),
    stock: '5/10',
  },
  {
    id: 2,
    name: 'Nasi Padang',
    image: require('@/assets/images/food.jpg'),
    stock: '5/10',
  },
];

export default function RestaurantMenuPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Menu Hari Ini</Text>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={35} color={"black"} />
        <Text style={styles.addButtonText}>Tambah Menu</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {menuData.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardText}>
              <Text style={styles.menuTitle}>{item.name}</Text>
              <Text style={styles.menuStock}>{item.stock}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.berbagiDec.background,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: '500',
    color: Colors.berbagiDec.textPrimary,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 6,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardText: {
    padding: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.berbagiDec.textPrimary,
    marginBottom: 4,
  },
  menuStock: {
    fontSize: 14,
    color: Colors.berbagiDec.textScondary,
  },
});
