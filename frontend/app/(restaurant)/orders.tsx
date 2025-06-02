import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

type Order = {
  id: number;
  quantity: number;
  createdAt: string;
  status: string;
  foodItem: {
    name: string;
  };
  user: {
    name: string;
  };
};

export default function OrdersScreen() {
  const { token } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "http://hengkylaurencio.cloud:3000/transactions/store",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();

      if (json.status === "success") {
        const today = new Date().toISOString().split("T")[0];
        const filtered = json.data.filter((order: any) =>
          order.createdAt.startsWith(today)
        );
        setOrders(filtered);
      } else {
        console.error("Failed to fetch orders:", json.message);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
        }, [token])
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#FFA000";
      case "completed":
        return "#388E3C";
      case "failed":
        return "#D32F2F";
      default:
        return "#555";
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Pesanan Hari Ini</Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : orders.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Belum ada pesanan hari ini.
        </Text>
      ) : (
        orders.map((order, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/restaurantFeatures/detailOrders/[transactionId]",
                params: { transactionId: String(order.id) },
              })
            }
          >
            <View style={styles.topRow}>
              <Text style={styles.orderIdName}>{order.foodItem.name}</Text>
              <Text style={styles.timeText}>{formatTime(order.createdAt)}</Text>
            </View>

            <Text style={styles.customerName}>Pembeli: {order.user.name}</Text>

            <View style={styles.bottomRow}>
              <Text style={styles.menuItem}>
                Jumlah dibeli: {order.quantity}
              </Text>
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(order.status) },
                ]}
              >
                {order.status === "pending"
                  ? "Proses"
                  : order.status === "completed"
                  ? "Selesai"
                  : "Dibatalkan"}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
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
    marginBottom: 4,
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
  customerName: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
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
