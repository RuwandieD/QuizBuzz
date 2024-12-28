import { AuthProvider } from './context/AuthContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Image, StyleSheet } from 'react-native';

// Prevent splash screen auto-hide until fonts or data are ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  // Load fonts
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function prepareApp() {
      try {
        // Simulate a loading process (e.g., fetch API data or cache resources)
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading
      } catch (error) {
        console.warn(error);
      } finally {
        // Mark the app as ready once fonts and resources are loaded
        setAppIsReady(true);
        await SplashScreen.hideAsync(); // Hide splash screen
      }
    }

    if (fontsLoaded) {
      prepareApp(); // Start preparation when fonts are loaded
    }
  }, [fontsLoaded]);

  // Show a custom splash screen while loading
  if (!appIsReady) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('../assets/images/splash.png')} style={styles.splashImage} />
      </View>
    );
  }

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

// Splash Screen Styles
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E2F', // Match theme background color
  },
  splashImage: {
    width: '100%',      // Make it cover the full width
    height: '100%',     // Make it cover the full height
    resizeMode: 'cover' // Cover the screen while preserving aspect ratio
  },
});

