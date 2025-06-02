import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import MapView, { Marker } from 'react-native-maps';

export default function RegisterRestoran() {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [openTime, setOpenTime] = useState('08:00');
  const [closeTime, setCloseTime] = useState('17:00');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { token } = useAuth();

  const handleRegister = async () => {
    if (!token) return;

    if (!restaurantName || !restaurantDescription || !restaurantAddress || !openTime || !closeTime) {
      Alert.alert('Peringatan', 'Semua field wajib diisi.');
      return;
    }

    try {
      const response = await fetch('http://hengkylaurencio.cloud:3000/store', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeName: restaurantName,
          storeDescription: restaurantDescription,
          storeAddress: restaurantAddress,
          latitude: 0,
          longitude: 0,
          openTime,
          closeTime,
        }),
      });
  
      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        const text = await response.text(); // bisa HTML kalau error
        if (contentType?.includes('application/json')) {
          const errJson = JSON.parse(text);
          Alert.alert('Gagal', errJson.message || 'Gagal mendaftarkan restoran.');
        } else {
          console.log('Error response:', text);
          Alert.alert('Gagal', 'Server mengembalikan HTML/error page.');
        }
        return;
      }
  
      Alert.alert('Berhasil', 'Restoran berhasil didaftarkan!', [
        { text: 'OK', onPress: () => router.replace('/auth/login') },
      ]);
    } catch (error) {
      console.error('Catch error:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat mendaftar.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.greenHeader}>
          <Text style={styles.headerTitle}>Daftar Restoran</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nama Restoran</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Warteg Sederhana"
            value={restaurantName}
            onChangeText={setRestaurantName}
          />

          <Text style={[styles.label, { marginTop: 20 }]}>Deskripsi</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            placeholder="Contoh: Menyediakan makanan rumahan murah meriah"
            multiline
            value={restaurantDescription}
            onChangeText={setRestaurantDescription}
          />

          <Text style={[styles.label, { marginTop: 20 }]}>Alamat</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Jl. Tanjung Duren Barat No. 1"
            value={restaurantAddress}
            onChangeText={setRestaurantAddress}
          />

          <Text style={[styles.label, { marginTop: 20 }]}>Jam Buka</Text>
          <TextInput
            style={styles.input}
            placeholder="08:00"
            value={openTime}
            onChangeText={setOpenTime}
          />

          <Text style={[styles.label, { marginTop: 20 }]}>Jam Tutup</Text>
          <TextInput
            style={styles.input}
            placeholder="17:00"
            value={closeTime}
            onChangeText={setCloseTime}
          />
          
          <Text style={[styles.label, { marginTop: 20 }]}>Pilih Lokasi Restoran</Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -6.168624653279471,
              longitude: 106.79188806563616,
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


          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e7d32',
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 10,
  },
  greenHeader: {
    alignItems: 'center',
    marginBottom: 5,
    zIndex: 1,
  },
  headerTitle: {
    marginTop: 100,
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 7,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 38,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f1f4f9',
    padding: 16,
    borderRadius: 12,
    color: '#000',
  },
  registerButton: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  map: {
  width: '100%',
  height: 200,
  borderRadius: 10,
  marginTop: 10,
  },
  latlngText: {
    marginTop: 10,
    fontSize: 14,
    color: '#444',
  },

});
