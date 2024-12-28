import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import CustomInput from '../components/ui/CustomInput';
import CustomButton from '../components/ui/CustomButton';
import { useAuth } from './context/AuthContext';

// Define Navigation Type
type NavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { register } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    setLoading(true);
    const success = await register(username, password);
    setLoading(false);

    if (success) {
      Alert.alert('Success', 'Account created! Proceed to login.');
      navigation.navigate('LoginScreen');
    } else {
      Alert.alert('Error', 'Username already exists.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an Account</Text>
      <Text style={styles.subHeader}>Join us and start your journey today!</Text>

      <CustomInput placeholder="Username" value={username} onChangeText={setUsername} />
      <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry isPassword />
      <CustomInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry isPassword />

      {/* Purple Button */}
      <CustomButton
        title="Register"
        onPress={handleRegister}
        isLoading={loading}
        color="#6200EE" // Purple
      />

      <Text style={styles.linkText} onPress={() => navigation.navigate('LoginScreen')}>
        Already have an account? <Text style={styles.linkHighlight}>Login</Text>
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
    color: '#D900EE',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
