import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Icons for visibility toggle

type CustomInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  isPassword?: boolean; // New prop to handle password visibility toggle
};

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  isPassword = false,
}) => {
  const [isVisible, setIsVisible] = useState(!secureTextEntry); // Toggle visibility

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !isVisible} // Control visibility
      />

      {/* Toggle Icon for Password Fields */}
      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={styles.iconContainer}
        >
          <MaterialIcons
            name={isVisible ? 'visibility' : 'visibility-off'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1, // Take up available space
    height: 50,
    fontSize: 16,
  },
  iconContainer: {
    padding: 10,
  },
});

export default CustomInput;
