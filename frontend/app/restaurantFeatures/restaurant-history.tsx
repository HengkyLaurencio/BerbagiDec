import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useAuth } from "@/contexts/AuthContext";

type Transaction = {
  id: number;
  foodItem: {
    name: string;
    imageUrl: string;
    description: string;
  };
  pickupTime: string;
  status: string;
};

export default function StoreHistoryScreen() {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('http://hengkylaurencio.cloud:3000/transactions/store',
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const json = await res.json();
        if (json.status === 'success') {
          setTransactions(json.data);
        } else {
          console.error('Fetch failed:', json.message);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#2ECC71';
      case 'pending':
        return '#F39C12';
      case 'failed':
        return '#E74C3C';
      default:
        return '#95A5A6';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Riwayat Restoran</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.berbagiDec.primary} style={{ marginTop: 50 }} />
      ) : (
        <ScrollView style={styles.scroll}>
          {transactions.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Image
                source={{ uri: `${item.foodItem.imageUrl}` }}
                style={styles.image}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.foodItem.name}</Text>
                <Text style={styles.cardSubtitle}>{item.foodItem.description}</Text>
                <Text style={styles.cardDate}>{formatDate(item.pickupTime)}</Text>
                <Text style={[styles.cardStatus, { color: getStatusColor(item.status) }]}>
                  {item.status === 'completed'
                    ? 'Selesai'
                    : item.status === 'pending'
                    ? 'Proses'
                    : item.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.berbagiDec.background,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: Colors.berbagiDec.textPrimary,
  },
  scroll: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.berbagiDec.background,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginHorizontal: 25,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 3,
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 5,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardSubtitle: {
    color: Colors.berbagiDec.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  cardDate: {
    fontSize: 13,
    color: Colors.berbagiDec.textPrimary,
  },
  cardStatus: {
    marginTop: 6,
    fontWeight: 'bold',
  },
});
