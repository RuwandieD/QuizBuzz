import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from './context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import CustomInput from '../components/ui/CustomInput';
import CustomButton from '../components/ui/CustomButton';

// Define Navigation Type
type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and Password are required!');
      return;
    }

    setLoading(true);
    const success = await login(username, password);
    setLoading(false);

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

      <CustomInput placeholder="Username" value={username} onChangeText={setUsername} />
      <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry isPassword />

      {/* Pink Button */}
      <CustomButton
        title="Login"
        onPress={handleLogin}
        isLoading={loading}
        color="#D900EE" // Pink
      />

      <Text style={styles.linkText} onPress={() => navigation.navigate('RegisterScreen')}>
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
  linkText: {
    color: '#7A7A7A',
    marginTop: 20,
    textAlign: 'center',
  },
  linkHighlight: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
