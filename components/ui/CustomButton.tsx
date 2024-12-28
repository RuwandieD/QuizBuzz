import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';

// Define Props for the CustomButton
type CustomButtonProps = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  color?: string; // Optional custom color
};

// Custom Button Component
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  color = '#D900EE', // Default to pink color
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]} // Apply dynamic color
      onPress={onPress}
      disabled={isLoading} // Disable button when loading
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
