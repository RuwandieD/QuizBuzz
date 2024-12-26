export type RootStackParamList = {
  tabs: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  QuizDetailScreen: {
    categoryId: number;
    categoryName: string;
  };
  HomeScreen: {
    username: string;
  };
  ResultScreen: { 
    score: number; 
    total: number; 
  }; 
};
