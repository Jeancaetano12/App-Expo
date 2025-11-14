import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Family } from '../types/families';

interface FamilyCardProps {
    family: Family;
    onPress: () => void;
}

export function FamilyCard({ family, onPress }: FamilyCardProps) {
  const patientCount = family.pacientes.length;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-input-bg rounded-lg p-4 mb-4 shadow-sm"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-text">{family.sobrenome}</Text>
        <View className="flex-row items-center bg-primary/20 px-2 py-1 rounded-full">
          <Feather name="users" size={14} className="text-primary" />
          <Text className="text-sm font-semibold text-primary ml-1">
            {patientCount} {patientCount === 1 ? 'Integrante' : 'Pessoas'}
          </Text>
        </View>
      </View>
      
      <Text className="text-base text-secondary">Endereço: {family.endereco}</Text>
    </TouchableOpacity>
  );
}