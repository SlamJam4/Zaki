import { useState } from "react";
import { Dimensions, StyleSheet, View, ScrollView, Pressable } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Stack } from "expo-router";
import { Image } from "expo-image";

import StyledText from "@/components/StyledText";

import HeartIcon from '@/assets/icons/heart.svg';
import HeartIconOutline from '@/assets/icons/heart-outline.svg';
import ShareIcon from '@/assets/icons/share.svg';

const { width, height } = Dimensions.get('window');

const IMG_HEIGHT = Math.floor(height * 0.5);
const HEADER_CHANGE_POINT = IMG_HEIGHT - (IMG_HEIGHT * 0.225);

export default function Index() {
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
        const opacity = withTiming(scrollY.value > HEADER_CHANGE_POINT ? 1 : 0, { duration: 200 });

        return {
            opacity,
        };
    });

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleShare = () => {
        // Implement share functionality here
        console.log('Share pressed');
    };

    return (
        <>
            <Stack.Screen
                options={{
                    statusBarStyle: isDarkMode ? 'dark' : 'light',
                    statusBarTranslucent: true,
                    headerTransparent: true,
                    headerTintColor: isDarkMode ? 'black' : 'white',
                    headerBackground: () => (
                        <Animated.View style={[StyleSheet.absoluteFill, headerAnimatedStyle]} />
                    ),
                    headerRight: () => (
                        <View style={styles.headerIcons}>
                            <Pressable onPress={toggleLike} style={styles.iconButton}>
                                {isLiked ? (
                                    <HeartIcon width={24} height={24} fill={isDarkMode ? 'tomato' : 'white'} />
                                ) : (
                                    <HeartIconOutline width={24} height={24} fill={isDarkMode ? 'black' : 'white'} />
                                )}
                            </Pressable>
                            <Pressable onPress={handleShare} style={styles.iconButton}>
                                <ShareIcon width={24} height={24} fill={isDarkMode ? 'black' : 'white'} />
                            </Pressable>
                        </View>
                    ),
                    headerTitle: () => (
                        <Animated.View style={titleAnimatedStyle}>
                            <StyledText bold style={[styles.headerTitle, { color: isDarkMode ? 'black' : 'white' }]}>
                                Title Here
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
                    source={{ uri: `https://picsum.photos/${Math.floor(width)}/${IMG_HEIGHT}` }}
                    style={styles.image}
                    contentFit='cover'
                />
                <View style={styles.content}>
                    <StyledText bold style={styles.title}>Scroll for content</StyledText>
                    {[...Array(20)].map((_, i) => (
                        <StyledText key={i} style={styles.paragraph}>
                            This is paragraph {i + 1}. Keep scrolling to see the header animate.
                        </StyledText>
                    ))}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 100,
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
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
    },
});
