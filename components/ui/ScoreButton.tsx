import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

type Props = {
  score: number;
  totalQuestions: number;
};

// Floating Score Button Component
const ScoreButton: React.FC<Props> = ({ score, totalQuestions }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => Alert.alert('Score', `Your Score: ${score}/${totalQuestions}`)}
    >
      <Text style={styles.buttonText}>
        {score}/{totalQuestions}
      </Text>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#f04d1c',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ScoreButton;
