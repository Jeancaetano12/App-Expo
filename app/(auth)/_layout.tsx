import { Stack } from 'expo-router';

// Layout para as telas de autenticação
// Um Stack simples sem header
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}