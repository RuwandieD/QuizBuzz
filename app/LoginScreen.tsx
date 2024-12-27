import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';

// Define Navigation Type
type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Mock Validation
  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and Password are required!');
      return;
    }

    if (username === 'admin' && password === '1234') {
      // Navigate to HomeScreen with username
      navigation.navigate('HomeScreen', { username: 'admin' });

    } else {
      Alert.alert('Error', 'Invalid credentials!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

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

      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.linkText} onPress={() => navigation.navigate('RegisterScreen')}>
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
  linkText: {
    color: '#007BFF',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
