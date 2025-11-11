import '../global.css';
import { Slot } from 'expo-router';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AuthProvider } from '@contexts/AuthContext';
import { ThemeProvider, useTheme } from '@contexts/ThemeContext';
import { toastConfig } from '@config/ToastConfig';
import { lightTheme, darkTheme } from '@styles/themes';
import AppNavigator from './appNavigator';

function ThemedLayout() {
  const { theme } = useTheme();

  return (
    <SafeAreaView edges={['top']} style={theme === 'light' ? lightTheme : darkTheme} className="flex-1 bg-purple-800">
      {/* O Slot renderiza a rota atual (index, login, home, etc.) */}
      <Slot />
      <AppNavigator/>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <ThemedLayout />
          <Toast config={toastConfig} />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}