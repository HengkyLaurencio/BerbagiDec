import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const slides = [
  {
    id: '1',
    title: 'Semua Favoritmu',
    description: 'Dapatkan semua makanan favoritmu di satu tempat, kamu pesan, kami antar',
    image: require('../assets/images/onboard1.jpg'),
  },
  {
    id: '2',
    title: 'Harga Terjangkau',
    description: 'Nikmati hidangan lezat tanpa menguras dompet, makanan berkualitas dengan harga bersahabat',
    image: require('../assets/images/onboard2.jpg'),
  },
  {
    id: '3',
    title: 'Bahan Segar',
    description: 'Kami hanya menggunakan bahan-bahan segar untuk menyajikan hidangan terbaik untukmu',
    image: require('../assets/images/onboard3.jpg'),
  },
  {
    id: '4',
    title: 'Pembayaran Mudah',
    description: 'Bayar dengan mudah menggunakan berbagai metode yang tersedia sesuai kenyamananmu',
    image: require('../assets/images/onboard4.jpg'),
  }

];

const Onboarding = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { token, user } = useAuth();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/auth/login');
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const renderIndicators = () => (
    <View style={styles.indicatorContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            currentIndex === index && styles.activeIndicator,
          ]}
        />
      ))}
    </View>
  );

  useEffect(() => {
    if (!token || !user) {
      return;
    }

    // Sudah login, arahkan berdasarkan role
    if (user.role === 'CUSTOMER') {
      router.replace('/(user)/user-home');
    } else if (user.role === 'PARTNER') {
      router.replace('/(restaurant)/restaurant-home');
    } else {
      router.replace('/');
    }
  }, [token, user]);

  return (
    <SafeAreaView style={styles.container}>  
    <StatusBar/>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        scrollEventThrottle={16}
      />
      {renderIndicators()}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? 'Start' : 'Next'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  indicator: {
    width: 10,
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#2e7d32',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    marginBottom:60,
  },
  nextButton: {
    backgroundColor: '#2e7d32',
    width:330,
    height:55,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipText: {
    color: '#999',
    fontSize: 14,
  },
});
