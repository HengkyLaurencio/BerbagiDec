import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

import { useAuth } from '@/contexts/AuthContext';

export default function AddMenu() {
  const navigation = useNavigation();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const { token } = useAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      console.warn("Gambar belum dipilih.");
      return null;
    }
  
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      name: 'menu-image.jpg',
      type: 'image/jpeg',
    } as any);
  
    try {
      const res = await fetch('http://hengkylaurencio.cloud:3000/upload/image', {
        method: 'POST',
        body: formData,
        // ⚠️ Penting: Jangan set 'Content-Type'!
      });
  
      const data = await res.json();
      return data.url; // Misalnya: "/images/xxx.png"
    } catch (error) {
      Alert.alert('Gagal upload gambar');
      console.error(error);
      return null;
    }
  };
  

  const handleSubmit = async () => {
    if (!token) return;
    if (!image || !name || !description || !quantity || !price) {
      Alert.alert('Semua field harus diisi');
      return;
    }
  
    const uploadedImageUrl = await uploadImage();
    if (!uploadedImageUrl) return;
  
    const fullImageUrl = `http://hengkylaurencio.cloud:3000${uploadedImageUrl}`;
  
    const payload = {
      name,
      description,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      availableUntil: new Date().toISOString(),
      imageUrl: fullImageUrl,
    };
  
    try {
      const res = await fetch('http://hengkylaurencio.cloud:3000/food', {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (res.ok) {
        Alert.alert('Menu berhasil ditambahkan');
        navigation.goBack();
      } else {
        // Coba parsing JSON response error
        const errorData: { message?: string; errors?: string[] } = await res.json();
  
        const message =
          errorData.errors?.join('\n') ||
          errorData.message ||
          `Terjadi kesalahan dengan kode ${res.status}`;
  
        Alert.alert('Gagal menambahkan menu', message);
      }
    } catch (error: any) {
      Alert.alert('Terjadi kesalahan', error?.message || 'Unknown error');
      console.error(error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Tambah Menu</Text>
      </View>

      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.previewImage} />
        ) : (
          <Text style={styles.imageText}>MASUKKAN GAMBAR</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.description}>NAMA MENU</Text>
      <TextInput
        placeholder="Nasi Padang"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.description}>DESKRIPSI</Text>
      <TextInput
        placeholder="Deskripsi Menu"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.description}>JUMLAH (STOK)</Text>
      <TextInput
        placeholder="Jumlah"
        style={styles.input}
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <Text style={styles.description}>HARGA</Text>
      <TextInput
        placeholder="Harga"
        style={styles.input}
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>TAMBAHKAN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.berbagiDec.background,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: Colors.berbagiDec.textPrimary,
  },
  imageBox: {
    backgroundColor: '#eef2f7',
    height: 180,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 25,
  },
  imageText: {
    color: '#999',
    fontSize: 14,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  description: {
    color: Colors.berbagiDec.textPrimary,
    marginHorizontal: 25,
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#eef2f7',
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    marginBottom: 16,
    color: Colors.berbagiDec.textPrimary,
    marginHorizontal: 25,
  },
  addButton: {
    backgroundColor: Colors.berbagiDec.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
