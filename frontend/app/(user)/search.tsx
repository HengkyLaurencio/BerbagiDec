import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from 'expo-router';

const tags = ["Padang", "Sate", "Bakso", "Ayam Bakar", "Nasi Goreng"];
const dummyFood = {
  title: "Nasi Padang",
  subtitle: "Hari ini, 18:00 - 20:00",
  distance: "1.5 Km",
  image: require("../../assets/images/food.jpg"),
};

export default function SearchScreen() {
    const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <Ionicons name="arrow-back" size={24} color= "Black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Pencarian</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {/* Riwayat Pencarian */}
      <Text style={styles.sectionTitle}>Riwayat Pencarian</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Sekitar Anda */}
      <Text style={styles.sectionTitle}>Sekitar Anda</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardRow}>
        {[...Array(3)].map((_, i) => (
          <FoodCard key={`nearby-${i}`} {...dummyFood} />
        ))}
      </ScrollView>

      {/* Pernah Anda Pesan */}
      <Text style={styles.sectionTitle}>Pernah Anda Pesan</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardRow}>
        {[...Array(3)].map((_, i) => (
          <FoodCard key={`ordered-${i}`} {...dummyFood} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

interface FoodCardProps {
  title: string;
  subtitle: string;
  distance: string;
  image: any;
}

const FoodCard: React.FC<FoodCardProps> = ({ title, subtitle, distance, image }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardDistance}>{distance}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 16,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
  },
  tag: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  cardRow: {
    paddingLeft: 16,
    
  },
  card: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 110,
  },
  cardContent: {
    padding: 10,
  },
  cardDistance: {
    fontSize: 12,
    color: "#555",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
});
