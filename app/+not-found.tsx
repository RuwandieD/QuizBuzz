import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const NotFoundScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oops! This screen doesn't exist.</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('HomeScreen', { username: 'Guest' })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1E1E2F',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
});

export default NotFoundScreen;
