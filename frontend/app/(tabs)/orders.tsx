import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OrdersScreen() {
  const orders = [
    {
      id: "#001",
      name: "Albert Suprianto",
      menu: "Nasi Padang",
      time: "15:00",
      status: "Proses",
    },
    {
      id: "#002",
      name: "Nadya Putri",
      menu: "Sate Ayam",
      time: "15:15",
      status: "Proses",
    },
    {
      id: "#003",
      name: "Budi Santoso",
      menu: "Bakso",
      time: "15:30",
      status: "Selesai",
    },
    {
      id: "#004",
      name: "Siti Aminah",
      menu: "Nasi Goreng Spesial",
      time: "15:45",
      status: "Dibatalkan",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Proses":
        return "#FFA000"; // Kuning
      case "Selesai":
        return "#388E3C"; // Hijau
      case "Dibatalkan":
        return "#D32F2F"; // Merah
      default:
        return "#555";
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Pesanan</Text>

      {/* Filter */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      {orders.map((order, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => {
            // Akan diarahkan ke halaman detail di kemudian hari
          }}
          activeOpacity={0.8}
        >
          {/* Top Row: ID, Name, and Time */}
          <View style={styles.topRow}>
            <Text style={styles.orderIdName}>
              {order.id} {order.name}
            </Text>
            <Text style={styles.timeText}>{order.time}</Text>
          </View>

          {/* Bottom Row: Menu and Status */}
          <View style={styles.bottomRow}>
            <Text style={styles.menuItem}>{order.menu}</Text>
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(order.status) },
              ]}
            >
              {order.status}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 8,
  },
  card: {
    backgroundColor: "#F9F9F9",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  orderIdName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    flexShrink: 1,
  },
  timeText: {
    fontSize: 14,
    color: "#555",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  menuItem: {
    fontSize: 14,
    color: "#333",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
