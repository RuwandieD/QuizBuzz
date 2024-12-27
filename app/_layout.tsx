import { AuthProvider } from './context/AuthContext'; 
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent splash screen auto-hide until fonts load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthProvider> {/* Wrap everything in AuthProvider */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" options={{ title: 'Login' }} />
          <Stack.Screen name="RegisterScreen" options={{ title: 'Register' }} />
          <Stack.Screen name="QuizDetailScreen" options={{ headerShown: false }} />
          <Stack.Screen name="ResultScreen" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider> 
  );
}
