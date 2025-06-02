import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

interface Store {
  storeName: string;
  storeAddress: string;
}

interface FoodItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  store: Store;
}

export default function SearchScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchFoodData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://hengkylaurencio.cloud:3000/food", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json?.status === "success" && Array.isArray(json.data)) {
        setFoods(json.data.slice(0, 20));
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      fetchFoodData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Pencarian Makanan</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={{ marginRight: 6 }}
          />
          <TextInput
            placeholder="Cari nama makanan..."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Loading */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="green"
            style={{ marginTop: 20 }}
          />
        )}

        {/* Food List */}
        {!loading &&
          filteredFoods.map((food) => (
            <TouchableOpacity
              key={food.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/(user)/user-order/[foodID]",
                  params: { foodID: String(food.id) },
                })
              }
            >
              <Image
                source={
                  food.imageUrl
                    ? { uri: food.imageUrl }
                    : require("@/assets/images/food.jpg")
                }
                style={styles.cardImage}
              />

              <View style={styles.cardContent}>
                <Text
                  style={styles.cardTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {food.name}
                </Text>
                <Text
                  style={styles.cardSubtitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {food.description}
                </Text>
                <Text style={styles.cardPrice}>
                  Rp {parseInt(food.price).toLocaleString()}
                </Text>
                <Text
                  style={styles.cardStore}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {food.store.storeName} - {food.store.storeAddress}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingTop: Platform.OS === "android" ? 40 : 60,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 44,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden", // penting untuk batasi image/child
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: 100,
    height: 110,
    resizeMode: "cover",
    backgroundColor: "#eee",
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#555",
    marginVertical: 2,
  },
  cardPrice: {
    fontSize: 14,
    color: "green",
    fontWeight: "600",
    marginTop: 2,
  },
  cardStore: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
});
