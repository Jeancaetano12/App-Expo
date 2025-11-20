import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useFamilyDetails } from '@hooks/useFamilyDetails';
import { PacienteCard } from '@components/PacienteCard';

export default function FamilyDetailScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // 2. Pega o [id] da URL
  const { id } = useLocalSearchParams();
  
  // 3. Usa o hook para buscar os dados
  const { family, isLoading, error } = useFamilyDetails(id as string);

  // 4. Lida com o estado de Carregando
  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="text-primary" />
      </View>
    );
  }

  // 5. Lida com o estado de Erro
  if (error || !family) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-4">
        <Text className="text-lg text-red-500 text-center">
          Não foi possível carregar os dados da família.
        </Text>
        <TouchableOpacity onPress={() => router.push('/families')} className="mt-4">
          <Text className="text-primary text-lg">Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 6. Mostra os dados!
  return (
    <View className="flex-1 bg-background">
      {/* Header simples da tela */}
      <View className="flex-row bg-purple-800 items-center p-4 pb-5 mb-4">
        <TouchableOpacity onPress={() => router.push('/families')} className="p-2">
          <Feather name="arrow-left" size={28} className="text-text" color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-4">
          Família: {family.sobrenome}
        </Text>
      </View>

      {/* Usamos FlatList para a lista de pacientes */}
      <FlatList
        data={family.pacientes}
        keyExtractor={(item) => item.cpf}
        renderItem={({ item }) => (
          <PacienteCard
            paciente={item}
          />
        )}
        contentContainerClassName="p-4 pt-0"

        // O Header da lista mostra os dados da família
        ListHeaderComponent={
          <View className="bg-input-bg p-4 rounded-lg mb-6">
            <Text className="text-2xl font-bold text-text mb-4">
              Informações da Família
            </Text>
            <Text className="text-lg text-secondary mb-2">
              <Text className="font-bold text-text">Endereço:</Text> {family.logradouro}, {family.numero}
            </Text>
            <Text className="text-lg text-secondary">
              <Text className="font-bold text-text">Telefone:</Text> {family.contatoTelefone}
            </Text>
          </View>
        }
        
        // Título para a lista de pacientes
        ListFooterComponent={
          family.pacientes.length > 0 ? (
            <Text className="text-2xl font-bold text-text mt-4 mb-4">
              Integrantes ({family.pacientes.length})
            </Text>
          ) : null
        }
        
        // Mensagem se não houver pacientes
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-10">
            <Text className="text-lg text-secondary">
              Nenhum paciente cadastrado nesta família.
            </Text>
          </View>
        }
      />
    </View>
  );
}