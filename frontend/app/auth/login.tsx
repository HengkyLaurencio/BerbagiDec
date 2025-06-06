import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';


export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://hengkylaurencio.cloud:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login gagal');
      }

      const { token, user } = result.data;
      login(token, user); // Simpan ke context

      Alert.alert('Sukses', 'Login berhasil!');

      // Redirect sesuai role
      if (user.role === 'CUSTOMER') {
        router.replace('/(user)/user-home');
      } else if (user.role === 'PARTNER') {
        router.replace('/(restaurant)/restaurant-home');
      } else {
        router.replace('/');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Terjadi kesalahan');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greenHeader}>
        <Text style={styles.headerTitle}>Masuk Akun</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { marginTop: 20 }]}>PASSWORD</Text>
        <View style={styles.passwordBox}>
        <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            placeholder="***********"
            placeholderTextColor="#8c94a3"
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>MASUK</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Tidak memiliki akun?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => router.replace('./register_user')}
          >
            Daftar
          </Text>
        </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e7d32', // Hijau header
  },
  greenHeader: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: -20,
    zIndex: 1,
  },
  headerTitle: {
    textShadowOffset: {width: 0, height:5},
    textShadowRadius: 7,
    marginTop: 450,
    marginBottom: 30,
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
  eyeButton: {
    marginLeft: 10,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 25,
  },
  forgotPasswordText: {
    color: '#2e7d32',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
    marginTop: 'auto',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  registerLink: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
    rememberForgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    color: '#555',
    marginLeft: -8,
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

});
