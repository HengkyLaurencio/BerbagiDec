import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import FoodCard from "../../components/FoodCard";
import { Colors } from '@/constants/Colors';
import { useRouter} from 'expo-router';


export default function Home() {
  const router = useRouter();
  return (
    
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <View style={styles.header}>
        <Text style={styles.greeting}>Selamat Pagi, Albert</Text>
        <TouchableOpacity onPress={() => router.push('/(user)/user-profile')}>
          <Image
            source={require('@/assets/images/profile.jpeg')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onFocus={() => router.push('/search')} 
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Selengkapnya</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Rekomendasi</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        <TouchableOpacity onPress={() => router.push('/user-order')}>
          <FoodCard
            title="Nasi Padang"
            subtitle="Rumah Padang Sederhana"
            image={require("../../assets/images/foodHome.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/user-order')}>
          <FoodCard
            title="Nasi Goreng"
            subtitle="Warung Mas Rudi"
            image={require("../../assets/images/foodHome.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/user-order')}>
          <FoodCard
            title="Mie Ayam"
            subtitle="Bakmi Enak"
            image={require("../../assets/images/foodHome.jpg")}
          />
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.sectionTitle}>Terdekat</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        <TouchableOpacity onPress={() => router.push('/user-order')}>
          <FoodCard
            title="Nasi Padang"
            subtitle="Rumah Padang Sederhana"
            image={require("../../assets/images/foodHome.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/user-order')}>
          <FoodCard
            title="Ayam Geprek"
            subtitle="Geprek Juara"
            image={require("../../assets/images/food.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/user-order')}>
          <FoodCard
            title="Soto Ayam"
            subtitle="Soto Pak Gino"
            image={require("../../assets/images/food.jpg")}
          />
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
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
    marginTop: 40,
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
    alignItems: "flex-start",
  },
  menuOverlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  menuContent: {
    marginLeft: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  menuSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginTop: 4,
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
