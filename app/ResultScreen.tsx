import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Import navigation and route types
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types';

// Define types for navigation and route
type NavigationProp = StackNavigationProp<RootStackParamList, 'ResultScreen'>;
type RoutePropType = RouteProp<RootStackParamList, 'ResultScreen'>;

// Main Component
const ResultScreen = () => {
  // Navigation and Route
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();

  // Extract parameters
  const { score = 0, total = 10 } = route.params || {}; // Default values to avoid crashes

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz Completed!</Text>
      <Text style={styles.scoreText}>
        Your Score: {score}/{total}
      </Text>

      <Text style={styles.message}>
        {score / total >= 0.7
          ? 'Great job! 🎉'
          : score / total >= 0.4
            ? 'Good effort! 👍'
            : 'Keep practicing! 💪'}
      </Text>

      {/* Button to go back to Home */}
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('HomeScreen', { username: 'Guest' })}
      />

    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E2F',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    color: '#FFFFFF',
  },
  message: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default ResultScreen;
