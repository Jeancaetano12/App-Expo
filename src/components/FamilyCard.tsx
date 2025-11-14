import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Family {
    id: string;
    name: string;
    address: string;
    patients: number;
}

interface FamilyCardProps {
    family: Family;
    onPress: () => void;
}

export function FamilyCard({ family, onPress }: FamilyCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-input-bg rounded-lg p-4 mb-4 shadow-sm"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-text">{family.name}</Text>
        <View className="flex-row items-center bg-primary/20 px-2 py-1 rounded-full">
          <Feather name="users" size={14} className="text-primary" />
          <Text className="text-sm font-semibold text-primary ml-1">
            {family.patients} {family.patients === 1 ? 'Integrantes' : 'Integrantes'}
          </Text>
        </View>
      </View>
      
      <Text className="text-base text-secondary">Endereço: {family.address}</Text>
    </TouchableOpacity>
  );
}