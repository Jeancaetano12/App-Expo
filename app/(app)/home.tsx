import React from 'react';
import { View, Text } from 'react-native';
import { ButtonDefault } from '@components/ButtonDefault';
import { useAuth } from '@contexts/AuthContext';

// 1. Importe o seu novo componente de Header
import { Header } from '@components/Header';

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    // 2. Mude o View principal. Removemos 'items-center' e 'justify-center'
    //    para que o conteúdo flua do topo para baixo.
    <View className="flex-1 bg-gray-100">
      
      {/* 3. Adicione o Header aqui no topo */}
      <Header />

      {/* 4. O resto do seu conteúdo agora pode ficar em um container */}
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Tela Principal
        </Text>
        <Text className="text-lg text-gray-600 mb-10">
          Bem-vindo(a), {user?.nomeCompleto}!
        </Text>
        <ButtonDefault
          title="Sair (SignOut)"
          onPress={signOut}
          className="bg-red-500"
        />
      </View>
    </View>
  );
}