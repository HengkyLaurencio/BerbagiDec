import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useAuth } from "@/contexts/AuthContext";

export default function RestaurantProfileScreen() {
  const { token } = useAuth();
  const [storeName, setStoreName] = useState("Memuat...");
  const [userEmail, setUserEmail] = useState("Memuat...");
  const [isOpen, setIsOpen] = useState(true);

  const toggleStatus = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token) return;

      try {
        // Fetch store name
        const storeRes = await fetch("http://hengkylaurencio.cloud:3000/store/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const storeJson = await storeRes.json();
        if (storeJson.status === "success") {
          setStoreName(storeJson.data.storeName);
        } else {
          console.warn("Gagal mengambil nama toko:", storeJson.message);
        }

        // Fetch user email
        const userRes = await fetch("http://hengkylaurencio.cloud:3000/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const userJson = await userRes.json();
        if (userJson.status === "success") {
          setUserEmail(userJson.data.email);
        } else {
          console.warn("Gagal mengambil email user:", userJson.message);
        }
      } catch (err) {
        console.error("Gagal mengambil data profil:", err);
      }
    };

    fetchProfileData();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Restoran</Text>

      <View style={styles.profileSection}>
        <Text style={styles.name}>{storeName}</Text>
        <Text style={styles.email}>{userEmail}</Text>

        <View style={styles.iconContainer}>
          <Ionicons name="home-outline" size={250} color={Colors.berbagiDec.primary} />
        </View>

        <TouchableOpacity
          style={[
            styles.statusContainer,
            { backgroundColor: isOpen ? Colors.berbagiDec.primary : '#FF3B30' }
          ]}
          onPress={toggleStatus}
        >
          <Text style={styles.statusText}>{isOpen ? 'OPEN' : 'CLOSE'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <ProfileContainer icon="settings-outline" label="Setting" />
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 30,
    gap: 5,
  },
  iconContainer: {
    alignItems: 'center',
  },
  statusContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.berbagiDec.textPrimary,
    marginTop: 8,
  },
  email: {
    fontSize: 15,
    color: Colors.berbagiDec.textScondary,
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
    backgroundColor: Colors.berbagiDec.surface,
    alignItems: 'center',
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
