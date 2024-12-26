import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/types';

// Define route type
type QuizDetailRouteProp = RouteProp<RootStackParamList, 'QuizDetailScreen'>;

const QuizDetailScreen = () => {
  const route = useRoute<QuizDetailRouteProp>();
  const { categoryId, categoryName } = route.params || { categoryId: 0, categoryName: 'Unknown' };

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Route Params:', route.params); // Debugging log
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
        );
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [categoryId]);

  const renderQuestion = ({ item }: any) => (
    <TouchableOpacity style={styles.questionCard}>
      <Text style={styles.questionText}>{item.question}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{categoryName} Quiz</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f04d1c" />
      ) : (
        <FlatList
          data={questions}
          renderItem={renderQuestion}
          keyExtractor={(item, index) => index.toString()}
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
  questionCard: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default QuizDetailScreen;
