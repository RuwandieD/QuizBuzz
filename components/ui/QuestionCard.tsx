import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
};

// Question Card Component
const QuestionCard: React.FC<Props> = ({
  question,
  options,
  correctAnswer,
  selectedAnswer,
  onSelect,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => {
        // Determine styling based on selection
        const isSelected = selectedAnswer === option;
        const isCorrect = option === correctAnswer;
        const optionStyle = isSelected
          ? isCorrect
            ? styles.correctAnswer
            : styles.wrongAnswer
          : styles.option;

        return (
          <TouchableOpacity
            key={index}
            style={optionStyle}
            onPress={() => onSelect(option)}
            disabled={!!selectedAnswer} // Disable selection after one choice
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  option: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  correctAnswer: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: '#4CAF50', // Green for correct
  },
  wrongAnswer: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F44336', // Red for wrong
  },
});

export default QuestionCard;
