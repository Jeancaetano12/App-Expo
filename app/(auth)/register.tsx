import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@contexts/AuthContext';
import { InputDefault } from '@components/InputDefault';
import { ButtonDefault } from '@components/ButtonDefault';
import Toast from 'react-native-toast-message';

export default function RegisterScreen() {
  const router = useRouter();
  const [nomeCompleto, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  async function handleSignUp() {
    if (!nomeCompleto || !email || !senha) {
      return Toast.show({
        type: 'info',
        text1: 'Atenção',
        text2: 'Preencha todos os campos.',
        topOffset: 60,
      });
    }
    setIsLoading(true);
    try {
      console.log('Botão cadastrar pressionado')
      await signUp(nomeCompleto, email, senha);

      Toast.show({
        type: 'success',
        text1: 'Cadastro realizado',
        text2: 'Bem vindo, {}!'.replace('{}', nomeCompleto),
        topOffset: 80,
      });

    } catch (error) {
      console.error(error)
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar',
        text2: 'Ocorreu um erro ao criar sua conta. Tente novamente.',
        topOffset: 60,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-8">
      <Image
        source={require('@assets/OharaDiscordLogo.png')}
        className="w-32 h-32 mb-4 rounded-3xl"
      />
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        Criar Conta
      </Text>
      <Text className="text-base text-gray-600 mb-10">
        Cadastre-se para começar a usar o aplicativo
      </Text>
      <InputDefault
        placeholder="Nome completo"
        onChangeText={setName}
        className="mb-4"
      />
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
        title="Cadastrar"
        onPress={handleSignUp}
        icon={<Ionicons className="ml-2" name="enter" size={26} color="white"/>}
      />

      {/* Botão para voltar para a tela de Login */}
      <TouchableOpacity
        className="mt-8"
        onPress={() => router.push('/login')}
      >
        <Text className="text-gray-600 font-semibold underline">
          Já tenho uma conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}