import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import FoodCard from "../../components/FoodCard";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Location from "expo-location";

type Store = {
  id: number;
  storeName: string;
  latitude: string;
  longitude: string;
};

type FoodItem = {
  id: number;
  name: string;
  imageUrl: string;
  store: Store;
  distance?: number;
};

export default function Home() {
  const router = useRouter();
  const { token } = useAuth();
  const [name, setName] = useState("");

  const [recommended, setRecommended] = useState<FoodItem[]>([]);
  const [nearby, setNearby] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;
        // Fetch data from API
        const res = await fetch("http://hengkylaurencio.cloud:3000/food", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const json = await res.json();

        if (json.status === "success") {
          const foods: FoodItem[] = json.data;

          // Ambil 5 makanan pertama untuk rekomendasi
          setRecommended(foods.slice(0, 5));

          // Ambil lokasi pengguna
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.warn("Izin lokasi ditolak");
            return;
          }

          const location = await Location.getCurrentPositionAsync({});
          const userLat = location.coords.latitude;
          const userLon = location.coords.longitude;

          // Hitung jarak Euclidean dan ambil 5 terdekat
          const withDistance = foods.map((food) => {
            const storeLat = parseFloat(food.store.latitude);
            const storeLon = parseFloat(food.store.longitude);
            const distance = Math.sqrt(
              Math.pow(storeLat - userLat, 2) + Math.pow(storeLon - userLon, 2)
            );
            return { ...food, distance };
          });

          const sortedByDistance = withDistance
            .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
            .slice(0, 5);

          setNearby(sortedByDistance);
        }
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://hengkylaurencio.cloud:3000/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const json = await res.json();
        if (json.status === "success") {
          setName(json.data.name);
        } else {
          console.warn("Gagal ambil nama:", json.message);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUserName();
  }, [token]);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Selamat Pagi, {name || "..."}</Text>
          <TouchableOpacity onPress={() => router.push("/(user)/user-profile")}>
            <Image
              source={require("@/assets/images/profile.jpeg")}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onFocus={() => router.push("/search")}
          />
        </View>

        <View style={styles.menuContainer}>
          <Image
            source={require("../../assets/images/foodHome.jpg")}
            style={styles.menuImage}
          />
          <View style={styles.menuOverlay}>
            <View style={styles.menuOverlayBackground} />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Menu Hari Ini</Text>
              <Text style={styles.menuSubtitle}>
                Jangan Sampe Ada Makanan Tersisa
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Rekomendasi</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {recommended.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/(user)/user-order/[foodID]",
                  params: { foodID: String(item.id) },
                })
              }
            >
              <FoodCard
                title={item.name}
                subtitle={item.store.storeName}
                image={{ uri: item.imageUrl }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Terdekat</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {nearby.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/(user)/user-order/[foodID]",
                  params: { foodID: String(item.id) },
                })
              }
            >
              <FoodCard
                title={item.name}
                subtitle={item.store.storeName}
                image={{ uri: item.imageUrl }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginTop: 18,
  },

  greeting: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.berbagiDec.textPrimary,
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.berbagiDec.surface,
  },

  searchContainer: {
    margin: 16,
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  menuContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  menuImage: {
    width: "100%",
    height: 180,
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  menuOverlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  menuTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: 'center',
  },
  menuSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginTop: 4,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: "#FF7F5C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 10,
  },
  horizontalScroll: {
    paddingLeft: 16,
    marginBottom: 10,
  },
});
