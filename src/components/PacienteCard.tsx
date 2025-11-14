import React, { use } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Paciente } from '../types/families'; // Importando o tipo de Paciente
import { useNavigation, useRouter } from 'expo-router';

interface PacienteCardProps {
  paciente: Paciente;
}

export function PacienteCard({ paciente }: PacienteCardProps) {
  const navigation = useNavigation();
  const router = useRouter();

  const onPressHandler = () => {
    // Navegar para a tela de detalhes do paciente
    router.push(`/(app)/patient/${paciente.cpf}`);
  }
  // Função para formatar a data (opcional, mas recomendado)
  const formatBirthDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      activeOpacity={0.7}
      className="bg-white dark:bg-input-bg rounded-lg p-4 mb-4 shadow-sm"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-text">{paciente.nomeCompleto}</Text>
        <Feather name="user" size={20} className="text-primary" />
      </View>
      
      <Text className="text-base text-secondary">CPF: {paciente.cpf}</Text>
      <Text className="text-base text-secondary">Nascimento: {formatBirthDate(paciente.dataNascimento)}</Text>
      <Text className="text-base text-secondary mt-1">Telefone: {paciente.pacienteTelefone}</Text>
    </TouchableOpacity>
  );
}