import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'nativewind';

interface ThemeContextData {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();

  function toggleTheme() {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme: colorScheme as 'light' | 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}