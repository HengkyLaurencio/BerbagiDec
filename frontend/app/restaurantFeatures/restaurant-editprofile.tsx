import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  Image, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';

export default function EditRestaurantProfileScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const { token } = useAuth();

  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');

  const fetchRestaurant = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://hengkylaurencio.cloud:3000/store/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();
      if (json.status === 'success') {
        const data = json.data;
        setStoreName(data.storeName);
        setStoreDescription(data.storeDescription);
        setStoreAddress(data.storeAddress);
        setLatitude(data.latitude?.toString() || '');
        setLongitude(data.longitude?.toString() || '');
        setOpenTime(data.openTime);
        setCloseTime(data.closeTime);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchRestaurant();
    }, [token])
  );


  const handleSave = async () => {
    try {
      const res = await fetch('http://hengkylaurencio.cloud:3000/store/me', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeName,
          storeDescription,
          storeAddress,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          openTime,
          closeTime,
        }),
      });
      const json = await res.json();
      if (json.status === 'success') {
        navigation.goBack();
      } else {
        Alert.alert('Gagal', 'Gagal memperbarui profil restoran.');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Edit Profil Restoran</Text>
      </View>

      <ScrollView style={styles.content}>
        <Image source={require('@/assets/images/profile.jpeg')} style={styles.avatar} />

        <Text style={styles.label}>Nama Restoran</Text>
        <TextInput style={styles.input} value={storeName} onChangeText={setStoreName} />
        <Text style={styles.label}>Deskripsi</Text>
        <TextInput style={styles.input} value={storeDescription} onChangeText={setStoreDescription} />

        <Text style={styles.label}>Alamat</Text>
        <TextInput style={styles.input} value={storeAddress} onChangeText={setStoreAddress} />

        <Text style={styles.label}>Jam Buka</Text>
        <TextInput style={styles.input} value={openTime} onChangeText={setOpenTime} placeholder="08:00" />

        <Text style={styles.label}>Jam Tutup</Text>
        <TextInput style={styles.input} value={closeTime} onChangeText={setCloseTime} placeholder="21:00" />

        <Text style={styles.label}>Pilih Lokasi Restoran</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude ? parseFloat(latitude) : -6.1686,
            longitude: longitude ? parseFloat(longitude) : 106.7918,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={(e) => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            setLatitude(latitude.toString());
            setLongitude(longitude.toString());
          }}
        >
          {latitude && longitude ? (
            <Marker
              coordinate={{
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
              }}
              title="Lokasi Restoran"
            />
          ) : null}
        </MapView>
        <Text style={styles.latlngText}>Latitude: {latitude}</Text>
        <Text style={styles.latlngText}>Longitude: {longitude}</Text>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.berbagiDec.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: Colors.berbagiDec.textPrimary,
  },
  content: {
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    backgroundColor: Colors.berbagiDec.surface,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.berbagiDec.textPrimary,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.berbagiDec.surface,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  latlngText: {
    fontSize: 14,
    color: '#444',
    marginTop: 10,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: Colors.berbagiDec.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
