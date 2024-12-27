import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';

// Navigation Types
type NavigationProp = StackNavigationProp<RootStackParamList, 'ResultScreen'>;
type QuizDetailRouteProp = RouteProp<RootStackParamList, 'QuizDetailScreen'>;

// Question Type
type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  options: string[];
};

// HTML Decoder Function
const decodeHTML = (html: string): string => {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&eacute;/g, 'é')
    .replace(/&nbsp;/g, ' ')
    .replace(/&uuml;/g, 'ü')
    .replace(/&iacute;/g, 'í')
    .replace(/&aacute;/g, 'á')
    .replace(/&oacute;/g, 'ó')
    .replace(/&eacute;/g, 'é');
};

// Main Component
const QuizDetailScreen = () => {
  // Navigation and Route Hooks
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<QuizDetailRouteProp>();

  // Extract Parameters
  const { categoryId, categoryName } = route.params;

  // State Variables
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  // Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      console.log('Fetching questions for Category ID:', categoryId);

      if (!categoryId) {
        Alert.alert('Error', 'Invalid category selected!');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
        );

        console.log('Raw API Response:', response.data);

        if (!response.data.results || response.data.results.length === 0) {
          throw new Error('No questions available.');
        }

        // Format Questions
        const formattedQuestions = response.data.results.map((q: any) => ({
          ...q,
          question: decodeHTML(q.question),
          correct_answer: decodeHTML(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((ans: string) =>
            decodeHTML(ans)
          ),
          options: shuffleOptions([
            decodeHTML(q.correct_answer),
            ...q.incorrect_answers.map((ans: string) => decodeHTML(ans)),
          ]),
        }));

        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        Alert.alert('Error', 'Failed to load questions. Try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  // Shuffle Options
  const shuffleOptions = (options: string[]) =>
    options.sort(() => Math.random() - 0.5);

  // Handle Answer Selection
  const handleAnswerSelect = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswer(answer);

    if (answer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to next question or ResultScreen
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
      } else {
        // Navigate to ResultScreen
        navigation.navigate('ResultScreen', {
          score: score + (answer === currentQuestion.correct_answer ? 1 : 0),
          total: questions.length,
          categoryId, // Include categoryId here
        });

      }
    }, 1000);
  };

  // Progress Percentage
  const progress =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;

  // Handle Loading State
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f04d1c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      {/* Question Number */}
      <Text style={styles.progressText}>
        {currentQuestionIndex + 1}/{questions.length}
      </Text>

      {/* Question */}
      <Text style={styles.questionText}>
        {questions[currentQuestionIndex]?.question || ''}
      </Text>

      {/* Options */}
      {questions[currentQuestionIndex]?.options.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const isCorrect =
          option === questions[currentQuestionIndex].correct_answer;
        const optionStyle = isSelected
          ? isCorrect
            ? styles.correctAnswer
            : styles.wrongAnswer
          : styles.option;

        return (
          <TouchableOpacity
            key={index}
            style={optionStyle}
            onPress={() => handleAnswerSelect(option)}
            disabled={!!selectedAnswer}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E2F',
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#444',
    borderRadius: 5,
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#f04d1c',
    borderRadius: 5,
  },
  progressText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
  },
  option: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  correctAnswer: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  wrongAnswer: {
    backgroundColor: '#F44336',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default QuizDetailScreen;
