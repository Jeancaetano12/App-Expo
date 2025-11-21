import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { Header } from '@components/Header';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

// ⚠️ Se o seu objeto 'user' for tipado (TS), você deve garantir que estes campos existam na sua interface de usuário.
// Exemplo: type User = { nomeCompleto: string; role: string; coren: string; ... }

// Componente reútil para exibir uma linha de informação
interface InfoCardProps {
  iconName: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ iconName, label, value }) => (
  <View className="bg-white p-4 rounded-lg mb-3 flex-row items-center shadow-sm">
    <Feather name={iconName} size={20} className="text-primary mr-4" />
    <View className="flex-1">
      <Text className="text-sm text-secundary">{label}</Text>
      <Text className="text-base font-bold text-text">{value}</Text>
    </View>
  </View>
);

export default function ProfileScreen() {
  // Puxa o objeto user (já autenticado) diretamente do contexto
  const { user, signOut } = useAuth(); 
  const router = useRouter();

  // Função fictícia para simular a edição
  const handleEdit = () => {
    Toast.show({ type: 'info', text1: 'Funcionalidade em desenvolvimento.', text2: 'Redirecionando para a tela de edição...' });
  };
  
  // Se o usuário não estiver logado, não renderiza o conteúdo
  if (!user) {
      return (
        <View className="flex-1 justify-center items-center bg-background">
          <Text className="text-lg text-text">Carregando perfil...</Text>
        </View>
      );
  }

  return (
    <View className="flex-1 bg-background">
      <Header title="Meu Perfil" />
      <ScrollView contentContainerClassName="p-4" showsVerticalScrollIndicator={false}>
        
        {/* --- 2. Seção de Avatar e Nome (USANDO USER) --- */}
        <View className="items-center mb-8 bg-white p-6 rounded-xl shadow-md border border-purple-700">
          <Image
            // Use user?.avatarUrl ou user?.fotoPerfil. Se não tiver, use um fallback
            source={{ uri: user.avatar || 'https://via.placeholder.com/150' }}
            className="w-24 h-24 rounded-full border-4 border-purple-700 mb-3"
            resizeMode="cover"
          />
          <Text className="text-2xl font-bold text-text">{user.nomeCompleto || 'Nome Não Encontrado'}</Text>
          <Text className="text-sm text-purple-800">{user.role || 'Função Não Definida'}</Text>
        </View>

        {/* --- 3. Dados Profissionais (USANDO USER) --- */}
        <Text className="text-lg font-bold text-text mb-3">Informações Profissionais</Text>
        
        <InfoCard 
          iconName="bookmark" 
          label="Registro Profissional (COREN)" 
          // ⚠️ Assumindo que o campo é user.coren
          value={user.coren || 'N/A'} 
        />
        <InfoCard 
          iconName="users" 
          label="Micro Área de Atuação" 
          // ⚠️ Assumindo que o campo é user.microArea
          value={user.microArea || 'N/A'} 
        />
        <InfoCard 
          iconName="mail" 
          label="E-mail" 
          // ⚠️ Assumindo que o campo é user.email
          value={user.email || 'N/A'} 
        />
        
        {/* --- 4. Botões de Ação --- */}
        <Text className="text-lg font-bold text-text mt-6 mb-3 text-center">Ações</Text>
        
        <TouchableOpacity 
          onPress={() => signOut()}
          className="bg-red-500 p-4  rounded-lg flex-row items-center justify-center"
          activeOpacity={0.7}
        >
          <Feather name="log-out" size={20} className="text-white mr-3" />
          <Text className="text-white font-bold text-base">Sair da Conta</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}