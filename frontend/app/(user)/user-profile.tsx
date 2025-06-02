import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
useEffect(() => {
    const fetchUserName = async () => {
      if (!token) return;

      try {
        const res = await fetch('http://hengkylaurencio.cloud:3000/user/me', {
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
          console.warn('Gagal ambil nama:', json.message);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUserName();
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
          <Text style={styles.title}>Profil</Text>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={require('@/assets/images/profile.jpeg')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <TouchableOpacity onPress={() => router.push('/user-editprofile')}style={styles.editButton}>
              <Text style={styles.editText}>Edit Profil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileContainer}>
            <ProfileContainer
              icon="time-outline"
              label="Riwayat"
              onPress={() => router.push('/history')}
            />
            <ProfileContainer
              icon="log-out-outline"
              label="Keluar"
              onPress={() => {
                // Replace this with your logout logic if you have it in context
                console.log('Logging out...');
                router.replace('/auth/login'); 
              }}
            />
        </View>


        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>Daftar Menjadi Mitra</Text>
          <Text style={styles.menuSubtitle}>
            Mari kita membuat Indonesia menjadi lebih baik dengan membantu sesama.
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register_rest')} style={styles.button} >
            <Text style={styles.buttonText}>Daftar</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.berbagiDec.surface,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.berbagiDec.textPrimary,
  },
  email: {
    fontSize: 12,
    marginTop: 2,
    color: Colors.berbagiDec.textScondary,
  },
  editButton: {
    backgroundColor: Colors.berbagiDec.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 6,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
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
  menuContent: {
    backgroundColor: Colors.berbagiDec.primary,
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 16,
    borderRadius: 15,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 6,
    lineHeight: 20,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#FF7F5C",
    paddingHorizontal: 16, // disesuaikan
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start', // supaya hanya selebar teks
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },  
});
