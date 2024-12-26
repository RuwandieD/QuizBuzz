import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import CategoryCard from '../../components/ui/CategoryCard';

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

const HomeScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Render each category
  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryCard
      id={item.id}
      name={item.name}
      imageSource={categoryImages[item.name] || categoryImages.default}
      onPress={() => console.log(`Selected: ${item.name}`)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Learn through quizzes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f04d1c" />
      ) : (
        <FlatList
          data={categories}
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
});

export default HomeScreen;
