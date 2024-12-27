import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from './context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons'; // Use icons from Expo
import CategoryCard from '../components/ui/CategoryCard';


// Define Category type
type Category = {
  id: number;
  name: string;
};

// Image mapping based on category name
const categoryImages: { [key: string]: any } = {
  'General Knowledge': require('../assets/images/generalKnowledge.png'),
  'Entertainment: Books': require('../assets/images/books.jpeg'),
  'Entertainment: Film': require('../assets/images/film.jpg'),
  'Entertainment: Music': require('../assets/images/music.jpg'),
  'Science & Nature': require('../assets/images/animals.jpg'), // Replacing with animals.jpg
  'Entertainment: Video Games': require('../assets/images/computer.jpg'), // Replacing with computer.jpg
  'Mathematics': require('../assets/images/maths.jpg'), // Adding a new category for Mathematics
  default: require('../assets/images/homeDefault.png'),
};


// Navigation type
type NavigationProp = StackNavigationProp<RootStackParamList, 'QuizDetailScreen'>;

// Fetch the logged-in user from AuthContext

const HomeScreen = ({ route }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const { user, logout } = useAuth(); // Access user and logout function


  const navigation = useNavigation<NavigationProp>();
  const username = route?.params?.username || 'Guest';

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        setCategories(response.data.trivia_categories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Filter options
  const filters = ['All', 'Entertainment', 'General', 'Science'];

  // Apply filter
  const filteredCategories =
    selectedFilter === 'All'
      ? categories
      : categories.filter((item: Category) =>
        item.name.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  // Render each category
  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryCard
      id={item.id}
      name={item.name}
      description="Challenge yourself with quizzes!"
      imageSource={categoryImages[item.name] || categoryImages['default']}
      statusTag={item.id % 2 === 0 ? 'Popular' : 'New'} // Example status
      onPress={() =>
        navigation.navigate('QuizDetailScreen', {
          categoryId: item.id,
          categoryName: item.name,
        })
      }
    />
  );
  

  return (
    <View style={styles.container}>
      {/* Header with Buttons */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Learn through quizzes</Text>
        <View style={styles.buttonContainer}>
          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>

          {/* Logout Icon Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              logout(); // Clear user session
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }], // Reset to LoginScreen
              });
            }}
          >
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>

      </View>

      {/* Dynamic Welcome Message */}
      <Text style={styles.welcome}>Welcome, {user || 'Guest'}!</Text> {/* Replace Guest with user */}

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter(filter)}>
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category List */}
      {loading ? (
        <ActivityIndicator size="large" color="#f04d1c" />
      ) : (
        <FlatList
          data={filteredCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  welcome: {
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F0F0F0',
  },
  activeFilter: {
    backgroundColor: '#333333',
  },
  filterText: {
    fontSize: 14,
    color: '#333333',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  card: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  cardText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', // Ensure buttons are in a row
    alignItems: 'center', // Align vertically
    gap: 8, // Add spacing between buttons
  },

  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF', // Blue color
    borderRadius: 8,
  },

  registerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },

  logoutButton: {
    marginLeft: 8, // Add space from buttons
    padding: 8,
    borderRadius: 50, // Circular button
    backgroundColor: '#F0F0F0', // Light gray background
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },


});

export default HomeScreen;
