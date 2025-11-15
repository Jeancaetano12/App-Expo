import React, { use } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PacienteInfo } from '../types/families';
import { useNavigation, useRouter } from 'expo-router';

interface PacienteIndicatorsCardProps {
  pacienteInfo: PacienteInfo;
  paciente?: any;
}

export function PacienteIndicatorsCard({ pacienteInfo, paciente }: PacienteIndicatorsCardProps) {
  const navigation = useNavigation();
  const router = useRouter();

  const formatBirthDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  return (
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.7}
        className="bg-white dark:bg-input-bg rounded-lg p-4 mb-4 shadow-sm"
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold text-text">Data de registro: {formatBirthDate(pacienteInfo.dataRegistro)}</Text>
          <Feather name="user" size={20} className="text-primary" />
        </View>
        
        <Text className="text-base text-secondary">PesoKg: {pacienteInfo.pesoKg}</Text>
        <Text className="text-base text-secondary">Pressão Arterial: {pacienteInfo.pressaoArterial}</Text>
        <Text className="text-base text-secondary mt-1">Glicemia: {pacienteInfo.glicemiaMgDl}</Text>
        <Text className="text-base text-secondary mt-1">Altura: {pacienteInfo.alturaM}</Text>
      </TouchableOpacity>
    );
}