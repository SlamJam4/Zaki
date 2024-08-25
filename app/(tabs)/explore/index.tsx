import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import StyledText from '@/components/StyledText';
import RestaurantCard from '@/components/RestaurantCard';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

const fetchRestaurants = async () => {
  const response = await fetch('https://59f6-185-187-94-33.ngrok-free.app/api/restaurants');
  if (!response.ok) {
    console.log(response)
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function index() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
  });

  if (isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <StyledText>Loading restaurants...</StyledText>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <StyledText>Error: {error.message}</StyledText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StyledText bold style={styles.title}>Explore Restaurants</StyledText>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Link href={'/details/1'}>
            <RestaurantCard restaurant={item} />
          </Link>

        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});