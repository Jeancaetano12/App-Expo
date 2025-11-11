import { View, Text, TouchableOpacity, Image } from 'react-native';
// Lembre-se de copiar seus componentes para 'src/components/'
import { InputDefault } from '@components/InputDefault'; 
import { ButtonDefault } from '@components/ButtonDefault';
import { useAuth } from '@contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    if (!email || !senha) {
      return Toast.show({
        type: 'info',
        text1: 'Atenção',
        text2: 'Preencha todos os campos.',
        topOffset: 80,
      });
    }
    setIsLoading(true);
    try {
      await signIn(email, senha);
      Toast.show({
        type: 'success',
        text1: 'Login realizado',
        text2: 'Bem-vindo de volta!',
        topOffset: 80,
      });

    } catch (error) {
      console.error(error)
      Toast.show({
        type: 'error',
        text1: 'Erro ao entrar',
        text2: 'Verifique suas credenciais e tente novamente.',
        topOffset: 80,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-8">
      {/* O resto do código permanece o mesmo... */}
      <Image
        source={require('@assets/OharaDiscordLogo.png')}
        className="w-32 h-32 mb-4 rounded-3xl"
      />
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        Bem-vindo(a)!
      </Text>
      <Text className="text-base text-gray-600 mb-10">
        Aplicativo de Saúde Comunitária
      </Text>
      <InputDefault
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        className="mb-4"
      />
      <InputDefault
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
        className="mb-8"
      />
      <ButtonDefault
        title={isLoading ? 'Entrando...' : 'Entrar'}
        onPress={handleSignIn}
        icon={<Entypo className="ml-2" name="login" size={24} color="#FFFFFF" />}
      />
      <TouchableOpacity
        className="mt-8"
        onPress={() => router.push('/register')} // Agora o TypeScript sabe que 'SignUp' é uma rota válida!
      >
        <Text className="text-gray-600 font-semibold ">
          Não tem uma conta?{" "}
          <Text className="underline ">
            Clique aqui
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
