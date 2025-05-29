import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';

const data = [
  {
    id: 1,
    title: 'Nasi Padang',
    subtitle: 'Rumah Padang Sederhana',
    datetime: 'Senin, 1 Januari 2025, 15:00',
    status: 'Selesai',
    statusColor: '#2ECC71',
  },
  {
    id: 2,
    title: 'Nasi Padang',
    subtitle: 'Rumah Padang Sederhana',
    datetime: 'Senin, 1 Januari 2025, 15:00',
    status: 'Proses',
    statusColor: '#F39C12',
  },
  {
    id: 3,
    title: 'Nasi Padang',
    subtitle: 'Rumah Padang Sederhana',
    datetime: 'Senin, 1 Januari 2025, 15:00',
    status: 'Gagal',
    statusColor: '#E74C3C',
  },
];

export default function HistoryScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Riwayat</Text>
      </View>

      <ScrollView style={styles.scroll}>
          {data.map((item) => (
          <TouchableOpacity
               key={item.id}
               style={styles.card}
               onPress={() => {
                    
               }}
          >
               <Image
               source={require('@/assets/images/food.jpg')}
               style={styles.image}
               />
               <View style={styles.cardContent}>
               <Text style={styles.cardTitle}>{item.title}</Text>
               <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
               <Text style={styles.cardDate}>{item.datetime}</Text>
               <Text style={[styles.cardStatus, { color: item.statusColor }]}>
                    {item.status}
               </Text>
               </View>
          </TouchableOpacity>
  ))}
</ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.berbagiDec.background,
    paddingTop: 40,
  },
  header: {
     flexDirection: "row",
     alignItems: "center",
     marginHorizontal: 16,
     marginBottom: 10,
  },
  title: {
     fontSize: 20,
     fontWeight: "bold",
     marginLeft: 8,
  },
  scroll: {
    flex: 1,
  },
  card: {
     flexDirection: 'row',
     backgroundColor: Colors.berbagiDec.background,
     borderRadius: 12,
     padding: 10,
     marginBottom: 12,
     elevation: 2,
     shadowColor: '#000',
     shadowOpacity: 0.1,
     shadowRadius: 3,
     marginHorizontal: 25,
   },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 3,
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 5,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  cardSubtitle: {
    color: Colors.berbagiDec.textPrimary,
    fontSize: 15,
    fontWeight: "bold",
  },
  cardDate: {
     fontSize: 15,
     color: Colors.berbagiDec.textPrimary,
   },
  cardStatus: {
    marginTop: 4,
    fontWeight: 'bold',
  },
});
