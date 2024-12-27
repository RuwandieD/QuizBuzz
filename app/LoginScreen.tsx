import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from './context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';

// Define Navigation Type
type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle Login
  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and Password are required!');
      return;
    }

    const success = login(username, password);
    if (success) {
      navigation.navigate('HomeScreen', { username });
    } else {
      Alert.alert('Error', 'Invalid credentials!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back!</Text>
      <Text style={styles.subHeader}>Login to continue your journey.</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Don't have an account? <Text style={styles.linkHighlight}>Register</Text>
      </Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F9FD',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#D900EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#7A7A7A',
    marginTop: 20,
    textAlign: 'center',
  },
  linkHighlight: {
    color: '#D900EE',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
