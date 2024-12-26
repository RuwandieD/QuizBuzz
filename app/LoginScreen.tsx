import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Import necessary navigation types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';

// Define the navigation type for HomeScreen
type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const LoginScreen = () => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Use the typed navigation prop
  const navigation = useNavigation<NavigationProp>();

  // Handle login button press
  const handleLogin = () => {
    // Simple validation for empty fields
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Navigate to HomeScreen and pass the username as a parameter
    navigation.navigate('HomeScreen', { username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <Button title="Login" onPress={handleLogin} />

      {/* Link to Registration Screen */}
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  registerLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#007BFF',
  },
});

export default LoginScreen;
