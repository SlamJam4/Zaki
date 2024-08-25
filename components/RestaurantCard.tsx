import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';

import StyledText from '@/components/StyledText';

import StarIcon from '@/assets/icons/star.svg';

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
  activeAdCampaign: string | null;
}

interface RestaurantCardProps {
  restaurant: IRestaurant;
}

const getRatingColor = (rating: number): string => {
  if (rating === 0) return '#787878';  // Medium gray
  if (rating < 2) return '#E63946';    // Soft but vibrant red
  if (rating < 2.5) return '#F76E11';  // Soft but vibrant orange
  if (rating < 3) return '#FF9F1C';    // Warm amber
  if (rating < 3.5) return '#FFCA3A';  // Warm yellow
  if (rating < 4) return '#FFD700';    // Gold
  if (rating < 4.5) return '#8AC926';  // Lime green
  if (rating < 4.8) return '#168AAD';  // Ocean blue
  return '#184E77';                    // Deep blue
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const fakeDistance = (Math.random() * 5).toFixed(1);
  const { rating } = restaurant.details;
  const color = getRatingColor(rating);

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://picsum.photos/${Math.floor(width)}/${Math.floor(
              width * 0.6
            )}`,
          }}
          style={styles.image}
          contentFit="cover"
        />
        {restaurant.activeAdCampaign && (
          <View style={styles.adLabel}>
            <StyledText style={styles.adText}>Ad</StyledText>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <StyledText bold style={styles.name}>
            {restaurant.name}
          </StyledText>
          <StyledText style={styles.distance}>{fakeDistance} km</StyledText>
        </View>
        <View style={styles.infoRow}>
          <StyledText style={styles.cuisines}>
            {restaurant.cuisines.join(', ')}
          </StyledText>
          <StyledText style={styles.occasions}>
            {restaurant.occasions.join(', ')}
          </StyledText>
        </View>
        <View style={styles.detailsRow}>
          <StyledText style={styles.price}>
            ${restaurant.details.priceForTwo} for two
          </StyledText>
          {rating > 0 ? (
            <View style={styles.ratingContainer}>
              <StarIcon width={14} height={14} fill={color} />
              <StyledText style={[styles.rating, { color }]}>
                {rating.toFixed(1)}
              </StyledText>
            </View>
          ) : (
            <StyledText style={[styles.rating, { color }]}>
              No reviews yet
            </StyledText>
          )}
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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 8,
  },
  adLabel: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  adText: {
    color: 'white',
    fontSize: 12,
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
    marginBottom: 4,
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
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rating: {
    fontSize: 14,
    marginLeft: 4,
  },
});

export default RestaurantCard;
