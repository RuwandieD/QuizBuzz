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
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';


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
  'Science & Nature': require('../assets/images/animals.jpg'),
  'Entertainment: Musicals & Theatres': require('../assets/images/musical.jpg'),
  'Entertainment: Television': require('../assets/images/television.jpg'),
  'Science: Computers': require('../assets/images/computer.jpg'),

  'Mathematics': require('../assets/images/maths.jpg'),
  default: require('../assets/images/homeDefault.png'),
};

// Navigation type
type NavigationProp = StackNavigationProp<RootStackParamList, 'QuizDetailScreen'>;

const HomeScreen = () => { // ✅ No route prop here
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { user, logout } = useAuth(); // Access user and logout function
  const navigation = useNavigation<NavigationProp>();
  const [clickCount, setClickCount] = useState(0); // Tracks clicks
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<number>>(new Set()); // Track completed quizzes

  const route = useRoute<RouteProp<RootStackParamList, 'HomeScreen'>>();
  const { username = 'Guest', categoryId = null } = route.params || {}; // ✅ Safe access
  console.log('Route Params:', username, categoryId); // ✅ Debugging output


  // Fetch categories and completed quizzes from API and AsyncStorage
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        if (response.data && response.data.trivia_categories) {
          setCategories(response.data.trivia_categories);
        } else {
          console.warn('No categories found in API response.');
          setCategories([]); // Set empty if no data
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Failed to load categories. Please try again.');
      } finally {
        setLoading(false); // Stop loading in all cases
      }
    };

    const loadCompletedQuizzes = async () => {
      try {
        const savedQuizzes = await AsyncStorage.getItem('completedQuizzes');
        if (savedQuizzes) {
          setCompletedQuizzes(new Set(JSON.parse(savedQuizzes)));
        }
      } catch (error) {
        console.error('Error loading completed quizzes:', error);
        Alert.alert('Error', 'Failed to load completed quizzes.');
      }
    };

    // Fetch categories and load completed quizzes
    fetchCategories();
    loadCompletedQuizzes();

    // Focus listener to reload data when navigating back
    const unsubscribe = navigation.addListener('focus', loadCompletedQuizzes);

    return unsubscribe; // Cleanup listener
  }, [navigation]);

  // Filter options
  const filters = ['All', 'General', 'Science', 'Mathematics', 'Music', 'Books', 'Film', 'Entertainment', 'Video Games'];

  // Apply filter
  const filteredCategories =
    selectedFilter === 'All'
      ? categories || [] // Default to empty array if undefined
      : (categories || []).filter((item: Category) =>
        item.name.toLowerCase().includes(selectedFilter.toLowerCase())
      );


  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryCard
      id={item.id}
      name={item.name}
      imageSource={categoryImages[item.name] || categoryImages['default']}
      statusTag={item.id % 2 === 0 ? 'Popular' : 'New'}
      onPress={() => {
        navigation.navigate('QuizDetailScreen', {
          categoryId: item.id,
          categoryName: item.name,
        });
      }}
    />
  );



  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome, {user || 'Guest'}!</Text>

        {/* Right Buttons */}
        <View style={styles.authButtons}>
          {user ? (
            // Logout Icon
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                logout();
                navigation.navigate('LoginScreen');
              }}
            >
              <MaterialIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            // Login/Signup Button
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              <Text style={styles.authText}>Login/Signup</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

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
          key={`columns-2`} // Keeps rendering consistent
          data={filteredCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Fixed 2 columns for mobile
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        />


      )}
      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>
          {completedQuizzes.size}/{filteredCategories.length} Quizzes Completed
        </Text>
      </TouchableOpacity>



    </View>

  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8, // Uniform padding
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 150,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200EE', // Purple button
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#6200EE', // Purple button
  },
  authText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#F44336', // Red logout button
    borderRadius: 20,
    marginLeft: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Adds spacing between columns
  },

  cardContainer: {
    width: '48%', // Keeps 2 columns with equal width
    height: 180, // Fixed height for consistency
    margin: 8, // Adds equal spacing
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },



});

export default HomeScreen;
