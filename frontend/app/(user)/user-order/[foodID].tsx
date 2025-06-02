import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { TextInput } from "react-native";

import { useAuth } from "@/contexts/AuthContext";

export default function OrderUserPage() {
  const { foodID } = useLocalSearchParams<{ foodID: string }>();
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [foodData, setFoodData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orderQuantity, setOrderQuantity] = useState("1");

  const { token } = useAuth();

  const handleConfirm = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(
          `http://hengkylaurencio.cloud:3000/food/${foodID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const json = await res.json();
        setFoodData(json.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [foodID]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.berbagiDec.primary} />
      </View>
    );
  }

  if (!foodData) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", padding: 20 }}>
          Data makanan tidak ditemukan.
        </Text>
      </View>
    );
  }

  const {
    name,
    description,
    price,
    quantity,
    availableUntil,
    imageUrl,
    store,
  } = foodData;

  const formattedTime = new Date(availableUntil).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header} numberOfLines={1} ellipsizeMode="tail">
          {name}, {store.storeName}
        </Text>
      </View>

      <Image source={{ uri: `${imageUrl}` }} style={styles.foodImage} />

      <View style={styles.contentWrapper}>
        <Text style={styles.foodTitle}>{name}</Text>
        <Text style={styles.description}>{description}</Text>

        <Text style={styles.sectionTitle}>Detail</Text>
        <Text>Harga: Rp{price}</Text>
        <Text>Sisa stok: {quantity}</Text>
        <Text style={styles.detailText}>
          Pengambilan sebelum pukul {formattedTime}
        </Text>
        <Text style={styles.restaurantName}>{store.storeName}</Text>
        <Text style={styles.address}>{store.storeAddress}</Text>

        <Image
          source={require("@/assets/images/map.jpg")}
          style={styles.mapImage}
        />

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.orderButtonText}>PESAN</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.restaurantName}>{store.storeName}</Text>
          <Text style={styles.address}>{store.storeAddress}</Text>

          <View style={styles.confirmCard}>
            <Image
              source={{ uri: `${imageUrl}` }}
              style={styles.confirmImage}
            />

            <View style={styles.confirmRight}>
              <Text style={styles.foodTitle}>{name}</Text>
              <Text style={{ color: "red", marginTop: 4 }}>
                Pengambilan sebelum pukul {formattedTime}
              </Text>
            </View>
          </View>

          <Text style={{ marginBottom: 6, fontWeight: "bold" }}>
            Jumlah yang ingin dipesan
          </Text>
          <TextInput
            keyboardType="numeric"
            value={orderQuantity}
            onChangeText={setOrderQuantity}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 16,
            }}
            placeholder="Masukkan jumlah"
          />

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>KONFIRMASI</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.berbagiDec.background,
    paddingTop: 16,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
    color: Colors.berbagiDec.textPrimary,
  },
  foodImage: {
    width: "88%",
    marginHorizontal: 25,
    marginTop: 10,
    borderRadius: 20,
    height: 180,
  },
  contentWrapper: {
    paddingTop: 15,
    marginHorizontal: 25,
  },
  foodTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.berbagiDec.textPrimary,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: Colors.berbagiDec.textScondary,
    marginBottom: 16,
    textAlign: "justify",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.berbagiDec.textPrimary,
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: Colors.berbagiDec.textPrimary,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.berbagiDec.textPrimary,
    marginBottom: 2,
    marginTop:4,
  },
  address: {
    fontSize: 13,
    color: Colors.berbagiDec.textScondary,
    marginBottom: 12,
    textAlign: "justify",
  },
  mapImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: Colors.berbagiDec.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  confirmCard: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    gap: 16,
  },
  confirmImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  confirmRight: {
    flexDirection: "column",
  },
  confirmButton: {
    backgroundColor: Colors.berbagiDec.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
