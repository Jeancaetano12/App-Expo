import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '@services/api';
// A GRANDE MUDANÇA: Usamos o router para navegar
import { useRouter, useSegments } from 'expo-router';
import Toast from 'react-native-toast-message';

// (Interface User... igual a antes)
interface User {
  id: string;
  primeiroNome: string;
  sobrenome: string;
  email: string;
}

interface AuthContextData {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  signIn(email: string, senha: string): Promise<void>;
  signUp(primeiroNome: string, sobrenome: string, email: string, senha: string): Promise<void>;
  signOut(): void;
  logOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  // Efeito para carregar e validar o token (exatamente como antes)
  useEffect(() => {
    async function loadStorageData() {
      const storedToken = await SecureStore.getItemAsync('token');
      if (storedToken) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          const profileResponse = await api.get('/auth/profile');
          setUser(profileResponse.data);
          setToken(storedToken);
        } catch (e) {
          // Token inválido, limpa
          await logOut();
        }
      }
      setIsLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(email: string, senha: string) {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { access_token } = response.data;
      const profileResponse = await api.get('/auth/profile', {
        headers: { 'Authorization': `Bearer ${access_token}` }
      });
      const userData: User = profileResponse.data;
      console.log({userData})
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      await SecureStore.setItemAsync('token', access_token);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
      
      setUser(userData);
      setToken(access_token);
      // O hook useProtectedRoute vai ver a mudança de 'user' e redirecionar
    } catch (error) {
      Toast.show ({
        type: 'error',
        text1: 'Erro',
        text2: 'Email ou senha incorretos'
      })
      console.error(error);
      throw new Error('Falha no login');
    }
  }

  async function signUp(primeiroNome: string, sobrenome: string, email: string, senha: string) {
    await api.post('/auth/register', { primeiroNome, sobrenome, email, senha });
    await signIn(email, senha);
  }

  async function logOut() {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
    api.defaults.headers.common['Authorization'] = undefined;
    setToken(null);
    setUser(null);

    Toast.show ({
      type: 'info',
      text1: 'Sessão expirada.',
      text2: 'Por favor, faça login novamente'
    })
  }
  async function signOut() {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
    api.defaults.headers.common['Authorization'] = undefined;
    setToken(null);
    setUser(null);

    Toast.show ({
      type: 'info',
      text1: 'Desconectado',
      text2: 'Até a próxima 👋'
    })
  }

  return (
    <AuthContext.Provider value={{ token, user, isLoading, signIn, signUp, signOut, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}