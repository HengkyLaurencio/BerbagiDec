import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch('http://hengkylaurencio.cloud:3000/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const json = await res.json();
        if (json.status === 'success') {
          setName(json.data.name);
          setEmail(json.data.email);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchProfile();
  }, [token]);

  const handleSave = async () => {
    try {
      const res = await fetch('http://hengkylaurencio.cloud:3000/user/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
        
      });
      const json = await res.json();
      if (json.status === 'success') {
        navigation.goBack();
      } else {
        alert('Gagal memperbarui profil');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Edit Profil</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={require('@/assets/images/profile.jpeg')}
          style={styles.avatar}
        />

        <Text style={styles.label}>Nama</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Nomor Telepon</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />


        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Simpan</Text>
        </TouchableOpacity>
      </View>
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
    gap: 14,
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
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.berbagiDec.surface,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: Colors.berbagiDec.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});