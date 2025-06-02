import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';

export default function RestaurantProfileScreen() {
  const navigation = useNavigation();
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      if (!token) return;

      try {
        const res = await fetch('http://hengkylaurencio.cloud:3000/restaurant/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();
        if (json.status === 'success') {
          setName(json.data.name);
          setEmail(json.data.email);
        } else {
          console.warn('Gagal ambil data restoran:', json.message);
        }
      } catch (err) {
        console.error('Error fetching restaurant profile:', err);
      }
    };

    fetchRestaurantProfile();
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Restoran</Text>
        </View>

        <View style={styles.profileSection}>
          <Ionicons name="home-outline" size={250} color={Colors.berbagiDec.primary} />
            <Text style={styles.name}>tes{name}</Text>
            <Text style={styles.email}>tes@gmail.com{email}</Text>
            <TouchableOpacity onPress={() => router.push('/restaurantFeatures/restaurant-editprofile')} style={styles.editButton}>
              <Text style={styles.editText}>Edit Profil</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <ProfileContainer icon="time-outline" label="Riwayat" onPress={() => router.push('/restaurant-history')} />
          <ProfileContainer
            icon="log-out-outline"
            label="Keluar"
            onPress={() => {
              console.log('Logging out...');
              router.replace('/auth/login');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileContainer({ icon, label, onPress }: { icon: any; label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.profileItem} onPress={onPress}>
      <View style={styles.profileLeft}>
        <Ionicons name={icon} size={22} color={Colors.berbagiDec.primary} />
        <Text style={styles.profileLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.berbagiDec.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: Colors.berbagiDec.textPrimary,
  },
  profileSection: {
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 14, 
      gap: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.berbagiDec.textPrimary,
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    marginTop: 2,
    color: Colors.berbagiDec.textScondary,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: Colors.berbagiDec.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 6,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  profileContainer: {
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 10,
    backgroundColor: Colors.berbagiDec.surface,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileLabel: {
    fontSize: 16,
    color: Colors.berbagiDec.textPrimary,
  },
});
