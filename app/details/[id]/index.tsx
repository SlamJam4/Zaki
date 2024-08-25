import { useCallback, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';

import StyledText from '@/components/StyledText';
import { Colors } from '@/constants/Colors';

import BackIcon from '@/assets/icons/back.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import HeartIconOutline from '@/assets/icons/heart-outline.svg';
import ShareIcon from '@/assets/icons/share.svg';

const { width, height } = Dimensions.get('window');

const IMG_HEIGHT = Math.floor(height * 0.5);
const HEADER_CHANGE_POINT = IMG_HEIGHT - IMG_HEIGHT * 0.1;

export default function Index() {
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const scrollY = useSharedValue(0);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.value = offsetY;
    setIsDarkMode(offsetY > HEADER_CHANGE_POINT);
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, HEADER_CHANGE_POINT],
      ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
    );

    return {
      backgroundColor,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(scrollY.value > HEADER_CHANGE_POINT ? 1 : 0, {
      duration: 200,
    });

    return {
      opacity,
    };
  });

  const handleBack = () => {
    router.back();
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    // Implement share functionality here
    console.log('Share pressed');
  };

  const handleBookTable = () => {
    // Implement book a table functionality here
    console.log('Book a table pressed');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          statusBarStyle: isDarkMode ? 'dark' : 'light',
          statusBarTranslucent: true,
          headerTransparent: true,
          headerTintColor: isDarkMode ? 'black' : 'white',
          headerBackground: () => (
            <Animated.View
              style={[StyleSheet.absoluteFill, headerAnimatedStyle]}
            />
          ),
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={handleBack}
              style={[
                styles.iconButton,
                !isDarkMode && styles.glassyBackground,
                { width: 40, height: 40 },
              ]}
            >
              <BackIcon
                width={28}
                height={28}
                fill={isDarkMode ? 'black' : 'white'}
              />
            </Pressable>
          ),
          headerRight: () => (
            <View style={styles.headerIcons}>
              <Pressable
                onPress={toggleLike}
                style={[
                  styles.iconButton,
                  !isDarkMode && styles.glassyBackground,
                  { width: 40, height: 40 },
                ]}
              >
                {isLiked ? (
                  <HeartIcon
                    width={20}
                    height={20}
                    fill={isDarkMode ? 'tomato' : 'white'}
                  />
                ) : (
                  <HeartIconOutline
                    width={20}
                    height={20}
                    fill={isDarkMode ? 'black' : 'white'}
                  />
                )}
              </Pressable>
              <Pressable
                onPress={handleShare}
                style={[
                  styles.iconButton,
                  !isDarkMode && styles.glassyBackground,
                  { width: 40, height: 40 },
                ]}
              >
                <ShareIcon
                  width={20}
                  height={20}
                  fill={isDarkMode ? 'black' : 'white'}
                />
              </Pressable>
            </View>
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Animated.View style={titleAnimatedStyle}>
              <StyledText
                bold
                style={[
                  styles.headerTitle,
                  { color: isDarkMode ? 'black' : 'white' },
                ]}
              >
                Roadster Diner
              </StyledText>
            </Animated.View>
          ),
        }}
      />

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        <Image
          source={{
            uri: `https://picsum.photos/${Math.floor(width)}/${IMG_HEIGHT}`,
          }}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.content}>
          <StyledText bold style={styles.title}>
            Roadster Diner
          </StyledText>
          {[...Array(20)].map((_, i) => (
            <StyledText key={i} style={styles.paragraph}>
              This is paragraph {i + 1}. Keep scrolling to see the header
              animate.
            </StyledText>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.bookTableButton} onPress={handleBookTable}>
          <StyledText bold style={styles.bookTableButtonText}>
            Book a table
          </StyledText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  image: {
    width: '100%',
    height: IMG_HEIGHT,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  glassyBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
  },
  headerTitle: {
    fontSize: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 0.75,
    borderTopColor: '#e0e0e0',
  },
  bookTableButton: {
    backgroundColor: Colors.tint,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookTableButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
