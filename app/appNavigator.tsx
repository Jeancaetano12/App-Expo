import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@contexts/AuthContext';

export default function AppNavigator() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
        if (!user || null) {
        router.replace('/login');
        } else {
        router.replace('/(app)/home');
        }
    }, 500); // Pequeno delay para garantir que a tela de loading seja mostrada

        return () => clearTimeout(timer);
    }, [user, isLoading, router]);
}