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
import CategoryCard from '../../components/ui/CategoryCard';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';

// Define Category type
type Category = {
  id: number;
  name: string;
};

// Image mapping based on category name
const categoryImages: { [key: string]: any } = {
  'General Knowledge': require('@/assets/images/generalKnowledge.png'),
  'Entertainment: Books': require('@/assets/images/books.jpeg'),
  'Entertainment: Film': require('@/assets/images/film.jpg'),
  'Entertainment: Music': require('@/assets/images/music.jpg'),
  default: require('@/assets/images/homeDefault.png'),
};

// Navigation type
type NavigationProp = StackNavigationProp<RootStackParamList, 'QuizDetailScreen'>;

const HomeScreen = ({ route }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');

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
  const filters = ['All', 'Entertainment', 'General', 'Music'];

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
      imageSource={categoryImages[item.name] || categoryImages.default}
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
        <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} />
<Button title="Register" onPress={() => navigation.navigate('RegisterScreen')} />
        </View>
      </View>

      
<Text style={styles.welcome}>Welcome, {username}!</Text>

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
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
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
});

export default HomeScreen;
