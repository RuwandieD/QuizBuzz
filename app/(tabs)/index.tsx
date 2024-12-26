import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

// Sample Categories
const categories = ['All', 'Animals', 'Astronomy', 'History'];

const quizzes = [
  {
    id: '1',
    title: 'Dive into sea creatures',
    points: 1250,
    image: require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/homeDefault.png'), // Replace later
  },
  {
    id: '2',
    title: 'Froggy Friends and Foes',
    points: 950,
    image: require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/homeDefault.png'), // Replace later
  },
  {
    id: '3',
    title: 'Bird Calls and Songs',
    points: 650,
    image: require('D:/Academic/L3S1/Mobile Application Development/QuizBuzz/assets/images/homeDefault.png'), // Replace later
  },
];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dummy handler for categories
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Learn through quizzes</Text>

      {/* Category Filters */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quiz Cards */}
      <FlatList
        data={quizzes}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPoints}>⚡ {item.points} points</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
  },
  selectedCategory: {
    backgroundColor: '#000',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: '#FFF',
  },
  card: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardPoints: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});

export default HomeScreen;
