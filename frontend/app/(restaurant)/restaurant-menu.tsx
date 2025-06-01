import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';

interface MenuItem {
  id: number;
  name: string;
  sold: number;
  quantity: number;
  imageUrl: string;
}

export default function RestaurantMenuPage() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const { token } = useAuth();


  const fetchMenu = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://hengkylaurencio.cloud:3000/food/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const json = await res.json();
      if (json.status === 'success') {
        setMenuData(json.data);
      }
    } catch (err) {
      console.error('Gagal mengambil menu:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMenu();
    }, [token])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Menu Hari Ini</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/restaurantFeatures/restaurant-addMenu')}>
        <Ionicons name="add" size={20} color={Colors.berbagiDec.textPrimary} />
        <Text style={styles.addButtonText}>Tambah Menu</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.berbagiDec.primary} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {menuData.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image
                source={{ uri: `${item.imageUrl}` }}
                style={styles.image}
              />
              <View style={styles.cardText}>
                <Text style={styles.menuTitle}>{item.name}</Text>
                <Text style={styles.menuStock}>{item.quantity - item.sold}/{item.quantity} stok tersedia</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
