import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  LoginScreen: undefined; 
  RegisterScreen: undefined; 
  QuizDetailScreen: {
    categoryId: number;
    categoryName: string;
  };
  HomeScreen: {
    username: string; 
  };
};

export type RootStackNavigation = NavigatorScreenParams<RootStackParamList>;
