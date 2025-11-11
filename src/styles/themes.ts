import { vars } from 'nativewind';

// Definindo as cores para o tema claro
export const lightTheme = vars({
  '--color-background': '#f3f4f6', // gray-100
  '--color-text': '#1f2937',       // gray-800
  '--color-primary': '#4f46e5',    // indigo-600
  '--color-secondary': '#6b7280',  // gray-500
  '--color-input-bg': '#e5e7eb',   // gray-200
});

// Definindo as cores para o tema escuro
export const darkTheme = vars({
  '--color-background': '#0f172a', // slate-900
  '--color-text': '#f1f5f9',       // slate-100
  '--color-primary': '#6366f1',    // indigo-500
  '--color-secondary': '#94a3b8',  // slate-400
  '--color-input-bg': '#1e293b',   // slate-800
});