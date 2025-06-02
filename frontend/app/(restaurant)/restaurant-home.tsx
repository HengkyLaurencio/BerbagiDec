import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Colors } from '@/constants/Colors';
import { useAuth } from "@/contexts/AuthContext";

export default function RestoranHomePage() {
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();
  const [storeName, setStoreName] = useState("Memuat...");
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  const radius = 80;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const percentage = total > 0 ? completed / total : 0;
  const strokeDashoffset = circumference * (1 - percentage);

  const fetchStoreNameAndMenu = async () => {
    if (!token) return;

    setLoading(true);
    try {
      // Ambil data toko
      const resStore = await fetch("http://hengkylaurencio.cloud:3000/store/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const storeJson = await resStore.json();
      if (storeJson.status === "success") {
        setStoreName(storeJson.data.storeName);
      } else {
        console.warn("Gagal mengambil nama toko:", storeJson.message);
        setStoreName("Gagal memuat nama toko");
      }

      // Ambil data menu
      const resMenu = await fetch("http://hengkylaurencio.cloud:3000/food/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const menuJson = await resMenu.json();
      if (menuJson.status === "success" && Array.isArray(menuJson.data)) {
        let totalSold = 0;
        let totalQuantity = 0;

        menuJson.data.forEach((item: { sold: number; quantity: number; }) => {
          totalSold += item.sold;
          totalQuantity += item.quantity;
        });

        setCompleted(totalSold);
        setTotal(totalQuantity);
      } else {
        console.warn("Gagal mengambil data menu:", menuJson.message);
      }
    } catch (err) {
      console.error("Error mengambil data:", err);
      setStoreName("Error memuat data");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStoreNameAndMenu();
    }, [token])
  );

  return (
    <View style={styles.container}>
      {loading ? (
      <ActivityIndicator size="large"  color={'#fff'} />
      ) : (
      <Text style={styles.storeName}>{storeName}</Text>
      )}
      <View style={styles.circleContainer}>
        <Svg width={200} height={200}>
          {/* Background Circle */}
          <Circle
            stroke="#D6F0E0"
            fill="none"
            cx="100"
            cy="100"
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <Circle
            stroke="#2D7A2D"
            fill="none"
            cx="100"
            cy="100"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin="100, 100"
          />
        </Svg>

        {/* Centered Text */}
        <View style={styles.centeredText}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.berbagiDec.primary} />
          ) : (
            <>
              <Text style={styles.targetText}>Target Hari Ini</Text>
              <Text style={styles.progressText}>
                {completed}/{total}
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  storeName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  circleContainer: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  targetText: {
    fontSize: 14,
    color: "#333",
  },
  progressText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
  },
});
