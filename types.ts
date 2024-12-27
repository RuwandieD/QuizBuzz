export type RootStackParamList = {
  HomeScreen: { username: string };
  LoginScreen: undefined;
  RegisterScreen: undefined;
  QuizDetailScreen: {
    categoryId: number;
    categoryName: string;
  };
  ResultScreen: {
    score: number;
    total: number;
  };
};
