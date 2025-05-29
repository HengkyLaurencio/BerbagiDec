// frontend/app/(tabs)/detailOrders.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const DetailOrders = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/orders")}
          style={styles.backIcon}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.orderInfo}>#001 Albert Suproanto</Text>
      </View>

      {/* Order Box */}
      <View style={styles.orderBox}>
        <View style={styles.orderRow}>
          <Text style={styles.timeText}>15:00</Text>
          <Text style={styles.statusText}>Diproses</Text>
        </View>

        <Text style={styles.menuText}>Nasi Padang</Text>
        <Text style={styles.pickupText}>Ambil Sendiri</Text>
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
    </View>
  );
};

export default DetailOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  backIcon: {
    marginRight: 12,
  },
  orderInfo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
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
    alignItems: "center",
    marginBottom: 15,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f2994a",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 5,
    color: "#000",
  },
  pickupText: {
    fontSize: 14,
    color: "#555",
  },
  footer: {
    marginTop: "auto",
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
