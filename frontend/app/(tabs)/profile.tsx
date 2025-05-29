import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color={Colors.berbagiDec.textPrimary} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Profil</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require('@/assets/images/profile.jpeg')}
          style={styles.avatar}
        />
        <View>
        <Text style={styles.name}>Albert Suprianto</Text>
        <Text style={styles.email}>albert.suprianto@gmail.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit Profil</Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileContainer}>
        <ProfileContainer icon="settings-outline" label="Setting" />
        <ProfileContainer icon="location-outline" label="Lokasi" />
        <ProfileContainer icon="time-outline" label="Riwayat" />
        <ProfileContainer icon="log-out-outline" label="Keluar" />
      </View>
    </View>
  );
}

function ProfileContainer({ icon, label }: { icon: any; label: string }) {
  return (
    <TouchableOpacity style={styles.profileItem}>
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
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 10, 
    paddingHorizontal: 30,
  },
  avatar: {
    flexDirection: 'row',
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
    fontSize: 10,
    marginTop: 3,
    color: Colors.berbagiDec.textScondary,
  },
  editButton: {
    backgroundColor: Colors.berbagiDec.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 3,
    alignItems: 'center',
    width: '70%'
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12, 
  },
  profileContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 10,
    backgroundColor: Colors.berbagiDec.background,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
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
