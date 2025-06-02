import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailOrders = () => {
  const { token } = useAuth();
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  const navigation = useNavigation();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`http://hengkylaurencio.cloud:3000/transactions/${transactionId}/get`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const json = await res.json();
        setTransaction(json.data);
      } catch (error) {
        console.error("Failed to fetch transaction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.berbagiDec.primary} />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>Gagal memuat data transaksi.</Text>
      </View>
    );
  }

  const { user, foodItem, quantity, totalPrice, status, pickupTime } = transaction;

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.orderInfo}>#{transaction.id} {user?.name}</Text>
      </View>

      {/* Image */}
      {foodItem?.imageUrl && (
        <Image source={{ uri: foodItem.imageUrl }} style={styles.foodImage} />
      )}

      {/* Order Details */}
      <View style={styles.orderBox}>
        <View style={styles.orderRow}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <View style={styles.orderRow}>
          <Text style={styles.label}>Waktu Ambil</Text>
          <Text style={styles.valueText}>{new Date(pickupTime).toLocaleString()}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.menuText}>{foodItem?.name}</Text>
        <Text style={styles.description}>{foodItem?.description}</Text>

        <View style={styles.orderRow}>
          <Text style={styles.label}>Jumlah</Text>
          <Text style={styles.valueText}>{quantity}</Text>
        </View>

        <View style={styles.orderRow}>
          <Text style={styles.label}>Harga Satuan</Text>
          <Text style={styles.valueText}>Rp {parseInt(foodItem?.price).toLocaleString()}</Text>
        </View>

        <View style={styles.orderRow}>
          <Text style={styles.label}>Total</Text>
          <Text style={[styles.valueText, { fontWeight: "bold" }]}>Rp {parseInt(totalPrice).toLocaleString()}</Text>
        </View>
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          activeOpacity={0.8}
          onPress={() => alert("Pesanan telah selesai!")}
        >
          <Text style={styles.doneButtonText}>PESANAN SELESAI</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailOrders;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 30,
    marginTop: 30,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  orderInfo: {
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 8,
    color: Colors.berbagiDec.textPrimary,
  },
  foodImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  orderBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  valueText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f2994a",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 5,
    color: "#000",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  footer: {
    marginBottom: 24,
  },
  doneButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
});
