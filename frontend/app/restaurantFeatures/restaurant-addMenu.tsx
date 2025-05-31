import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

export default function AddMenu() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Tambah Menu</Text>
      </View>

      <View style={styles.imageBox}>
        <Text style={styles.imageText}>MASUKAN GAMBAR</Text>
      </View>

      <Text style={styles.description}>NAMA MENU</Text>
      <TextInput
        placeholder="Nasi Padang"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.description}>DESKRIPSI</Text>
      <TextInput
        placeholder="Deskripsi Menu"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.description}>JUMLAH (STOCK)</Text>
      <TextInput
        placeholder="Jumlah Makanan Yang Ingin di berikan"
        style={styles.input}
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>TAMBAHKAN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.berbagiDec.background,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
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
