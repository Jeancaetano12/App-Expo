import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '@services/api';
import Toast from 'react-native-toast-message';

interface User {
  id: string;
  primeiroNome: string;
  sobrenome: string;
  email: string;
  nomeCompleto: string;
  role: string;
}

interface AuthContextData {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  signIn(email: string, senha: string): Promise<void>;
  signUp(primeiroNome: string, sobrenome: string, email: string, senha: string): Promise<void>;
  signOut(): void;
  logOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função de logout centralizada
  const logOut = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
    } catch (error) {
      console.error('Erro ao limpar storage:', error);
    }
    
    api.defaults.headers.common['Authorization'] = undefined;
    setToken(null);
    setUser(null);

    Toast.show({
      type: 'info',
      text1: 'Sessão expirada',
      text2: 'Por favor, faça login novamente'
    })
  }, []);

  // Configuração do Interceptor para capturar erros 401 globalmente
  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          console.log('[AuthContext] Token expirado ou inválido (401). Realizando logout forçado.');
          
          // Evita loop se já estiver deslogado
          if (token) {
             await logOut();
             Toast.show({
                type: 'info',
                text1: 'Sessão expirada',
                text2: 'Por favor, faça login novamente.'
             });
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [logOut, token]); // Recria o interceptor se o logOut ou token mudarem

  // Carregar dados iniciais
  useEffect(() => {
    async function loadStorageData() {
      const storedToken = await SecureStore.getItemAsync('token');
      const storedUser = await SecureStore.getItemAsync('user');

      if (storedToken && storedUser) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          // Opcional: Validar token com o back-end aqui se quiser
          // const profileResponse = await api.get('/auth/profile');
          
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (e) {
          console.log('Erro ao validar sessão armazenada, limpando...', e);
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
      
      // Configura token para requisições futuras
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      // Busca perfil atualizado
      const profileResponse = await api.get('/auth/profile');
      const userData: User = profileResponse.data;

      await SecureStore.setItemAsync('token', access_token);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
      
      setUser(userData);
      setToken(access_token);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Email ou senha incorretos'
      });
      console.error(error);
      throw error;
    }
  }

  async function signUp(primeiroNome: string, sobrenome: string, email: string, senha: string) {
    await api.post('/auth/register', { primeiroNome, sobrenome, email, senha });
    await signIn(email, senha);
  }

  // Wrapper para o botão de sair (com mensagem amigável)
  async function signOut() {
    await logOut();
    Toast.show({
      type: 'success',
      text1: 'Desconectado',
      text2: 'Até a próxima 👋'
    });
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