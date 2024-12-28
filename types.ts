export type RootStackParamList = {
  HomeScreen: { username: string; categoryId?: number };
  LoginScreen: undefined;
  RegisterScreen: undefined;
  QuizDetailScreen: {
    categoryId: number;
    categoryName: string;
  };
  ResultScreen: { score: number; total: number; categoryId: number };
};
