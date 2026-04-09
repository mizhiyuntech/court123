import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import InitScreen from './src/screens/InitScreen';
import Colors from './src/constants/Colors';

// 自定义主题
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
  },
};

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  const handleInitComplete = () => {
    setIsInitialized(true);
  };

  if (!isInitialized) {
    return <InitScreen onInitComplete={handleInitComplete} />;
  }

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
