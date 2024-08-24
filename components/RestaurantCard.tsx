import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import StyledText from '@/components/StyledText'; 

const { width } = Dimensions.get('window');

interface IRestaurant {
  organization: string;
  name: string;
  cuisines: string[];
  occasions: string[];
  details: {
    priceForTwo: number;
    rating: number;
  };
}

interface RestaurantCardProps {
  restaurant: IRestaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  // Fake distance value for now
  const fakeDistance = (Math.random() * 5).toFixed(1);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://picsum.photos/${Math.floor(width)}/${Math.floor(width * 0.6)}` }}
        style={styles.image}
        contentFit='cover'
      />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <StyledText bold style={styles.name}>{restaurant.name}</StyledText>
          <StyledText style={styles.distance}>{fakeDistance} km</StyledText>
        </View>
        <View style={styles.infoRow}>
          <StyledText style={styles.cuisines}>{restaurant.cuisines.join(', ')}</StyledText>
          <StyledText style={styles.occasions}>{restaurant.occasions.join(', ')}</StyledText>
        </View>
        <View style={styles.detailsRow}>
          <StyledText style={styles.price}>${restaurant.details.priceForTwo} for two</StyledText>
          <StyledText style={styles.rating}>★ {restaurant.details.rating.toFixed(1)}</StyledText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 8
  },
  content: {
    paddingVertical: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    flex: 1,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cuisines: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  occasions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
  },
  rating: {
    fontSize: 14,
    color: '#FF8C00',
  },
});

export default RestaurantCard;