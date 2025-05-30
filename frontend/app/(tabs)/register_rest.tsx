import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RegisterRestoran() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // Logic untuk register restoran
    console.log('Register Restoran pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.greenHeader}>
        <Text style={styles.headerTitle}>Daftar Restoran</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="restoran@gmail.com"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { marginTop: 20 }]}>NAMA RESTORAN</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Warteg Sederhana"
          placeholderTextColor="#aaa"
          value={restaurantName}
          onChangeText={setRestaurantName}
        />
        <Text style={[styles.label, { marginTop: 20 }]}>ALAMAT RESTORAN</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Jl. Tanjung Duren Barat No. 1"
          placeholderTextColor="#aaa"
          value={restaurantAddress}
          onChangeText={setRestaurantAddress}
        />

        <Text style={[styles.label, { marginTop: 20 }]}>PASSWORD</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="***********"
            placeholderTextColor="#8c94a3"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#8c94a3"
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>KONFIRMASI PASSWORD</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="***********"
            placeholderTextColor="#8c94a3"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Feather
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#8c94a3"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>DAFTAR</Text>
        </TouchableOpacity>

        <Text style={styles.loginRedirectText}>
          Sudah punya akun?{' '}
          <Text style={styles.loginLink} onPress={() => router.replace('/login')}>
            Masuk
          </Text>
        </Text>

        <Text style={styles.registerText}>
          Daftar sebagai pengguna?{' '}
          <Text style={styles.registerLink} onPress={() => router.replace('/register_user')}>
            Klik di sini
          </Text>
        </Text>
      </View>
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
    top: 50,
    left: 25,
    zIndex: 10,
  },
  greenHeader: {
    alignItems: 'center',
    marginBottom:5,
    zIndex: 1,
  },
  headerTitle: {
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 7,
    marginTop: 85,
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
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
    padding: 20,
    borderRadius: 12,
    color: '#000',
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 5,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
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
  loginRedirectText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  loginLink: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 12,
    color: '#666',
  },
  registerLink: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
});
