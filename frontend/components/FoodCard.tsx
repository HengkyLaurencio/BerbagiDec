import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface FoodCardProps {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
}

const FoodCard: React.FC<FoodCardProps> = ({ title, subtitle, image }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    height: 150,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});

export default FoodCard;
