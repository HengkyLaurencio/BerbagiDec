import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

export default function OrderUserPage() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header} numberOfLines={1} ellipsizeMode="tail">
          Nasi Padang, Rumah Padang Sederhana
        </Text>
      </View>

      <Image
        source={require("@/assets/images/food.jpg")}
        style={styles.foodImage}
      />

      <View style={styles.contentWrapper}>
        <Text style={styles.foodTitle}>Nasi Padang</Text>
        <Text style={styles.description}>
          Nikmati kelezatan masakan khas Minang dalam satu paket lengkap! Dalam
          paket ini, kamu akan mendapatkan nasi hangat dengan aneka lauk pilihan
          seperti rendang sapi empuk, ayam pop, telur balado, sayur nangka,
          sambal ijo, dan kerupuk renyah.
        </Text>

        <Text style={styles.sectionTitle}>Detail</Text>
        <Text style={styles.detailText}>Pengambilan Pukul 18:00 - 20:00</Text>
        <Text style={styles.restaurantName}>Rumah Padang Sederhana</Text>
        <Text style={styles.address}>
          Jl. Tanjung Duren Raya No.54 1, RT.1/RW.4, Tj. Duren Utara, Kec.
          Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta
          11470
        </Text>

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
          <Text style={styles.restaurantName}>Rumah Padang Sederhana</Text>
          <Text style={styles.address}>
            Jl. Tanjung Duren Raya No.54 1, RT.1/RW.4, Tj. Duren Utara, Kec.
            Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta
            11470
          </Text>
          <View style={styles.confirmCard}>
            <Image
              source={require("@/assets/images/food.jpg")}
              style={styles.confirmImage}
            />
            <View style={styles.confirmRight}>
              <Text style={styles.foodTitle}>Nasi Padang</Text>
              <Text style={{ color: "red" }}>Pengambilan Pukul 15:00</Text>
            </View>
          </View>
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
    paddingTop: 40,
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
