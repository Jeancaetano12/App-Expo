import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { Header } from '@components/Header';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';


export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const goToFamilyList = () => {
    if (user?.role === 'ADMIN') {
      router.push('/(app)/families');
    } else {
      Toast.show ({
        type: 'error',
        text1: 'Acesso negado ❌',
        text2: 'Somente administradores'
      })
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Header />
      <View className="flex-1 p-6">
        <Text className="text-2xl font-bold text-text mb-6">
          Olá, {user?.nomeCompleto}!
        </Text>
        <Text className='text-base text-secundary mb-4'>
          O que você gostaria de fazer hoje?
        </Text>
        {/* --- Card de Atalho 1: Adicionar Nova Família --- */}
        <TouchableOpacity
          onPress={() => router.push('/(app)/add-family')}
          className="bg-input-bg p-6 mb-4 rounded-lg flex-row items-center justify-between"
          activeOpacity={0.5}
        >
          <View>
            <Text className="text-lg font-bold text-text">Adicionar Família</Text>
            <Text className="text-base text-secondary">Iniciar um novo cadastro</Text>
          </View>
          <FontAwesome6 name="people-roof" size={28} className="text-primary" />
        </TouchableOpacity>
        
        {/* --- Card de atalho 2: ver familias */}
        <TouchableOpacity
          onPress={goToFamilyList}
          className='bg-input-bg p-6 rounded-lg flex-row items-center justify-between mb-4'
          activeOpacity={0.5}
        >
          <View>
            <Text className='text-lg font-bold text-text'>Ver familias</Text>
            <Text className='text-base text-secondary'>Listar e gerenciar famílias</Text>
          </View>
          <Feather name="users" size={28} className="text-primary" />
        </TouchableOpacity>

      </View>
    </View>
  );
}