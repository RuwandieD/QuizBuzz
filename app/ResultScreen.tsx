import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Import navigation and route types
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


// Define types for navigation and route
type NavigationProp = StackNavigationProp<RootStackParamList, 'ResultScreen'>;
type RoutePropType = RouteProp<RootStackParamList, 'ResultScreen'> & {
  params: {
    categoryId: number; // Add categoryId parameter
  };
};

// Main Component
const ResultScreen = () => {
  // Navigation and Route
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { score = 0, total = 10, categoryId } = route.params; // Include categoryId

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
        onPress={async () => {
          // Save completed quiz ID
          const completedQuizzes = await AsyncStorage.getItem('completedQuizzes');
          const updatedQuizzes = completedQuizzes
            ? new Set(JSON.parse(completedQuizzes))
            : new Set();
        
          updatedQuizzes.add(categoryId); // Add current category ID
          await AsyncStorage.setItem(
            'completedQuizzes',
            JSON.stringify([...updatedQuizzes]) // Save updated set
          );
        
          // Navigate to HomeScreen and pass categoryId
          navigation.navigate('HomeScreen', {
            username: 'Guest',
            categoryId: categoryId, // Pass categoryId to trigger updates
          });
        }}
        
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
