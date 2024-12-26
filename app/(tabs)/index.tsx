import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

// Define Category type
type Category = {
  id: number;
  name: string;
};

const HomeScreen = () => {
  // State for categories, loading status, and filters
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Fetch Categories from API
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

  // Filter categories
  const filters = ['All', 'Animals', 'Astronomy', 'Science'];

  const filteredCategories =
    selectedFilter === 'All'
      ? categories
      : categories.filter((item: Category) =>
          item.name.toLowerCase().includes(selectedFilter.toLowerCase())
        );
  // Image mapping for each category
  const categoryImages: { [key: string]: any } = {
    'General Knowledge': require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/generalKnowledge.png'),
    'Entertainment: Books': require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/books.jpeg'),
    'Entertainment: Film': require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/film.jpg'),
    'Entertainment: Music': require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/music.jpg'),
    'Science': require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/computer.jpg'),
    'Animals': require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/animals.jpg'),
    'Mathematics': require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/maths.jpg'),
  };

  // Render each category
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.card}>
      <Image
      source={categoryImages[item.name] || require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/homeDefault.png')} // Use default if not found
      style={styles.image}
    />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Learn through quizzes</Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;