import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();

  const [loaded] = useFonts({
    'Lexend-ExtraLight': require('@/assets/fonts/Lexend-ExtraLight.ttf'),
    'Lexend-Light': require('@/assets/fonts/Lexend-Light.ttf'),
    'Lexend-Regular': require('@/assets/fonts/Lexend-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ navigationBarColor: '#FFF', statusBarStyle: 'dark' }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="details/[id]/index"/>
      </Stack>
    </QueryClientProvider>
  );
}
