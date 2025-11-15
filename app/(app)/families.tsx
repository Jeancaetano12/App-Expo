import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { FamilyCard } from '@components/FamilyCard';
import { useFamilies } from '@hooks/useFamilies';

export default function FamilyScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const { families, isLoading, error } = useFamilies();
    if (isLoading) {
        return (
        <View className="flex-1 justify-center items-center bg-background">
            <ActivityIndicator size="large" color="#6200ee" />
        </View>
        );
    }

    if (error) {
        return (
        <View className="flex-1 justify-center items-center bg-background p-4">
            <Text className="text-red-600 text-lg">Erro ao carregar famílias. Tente novamente mais tarde.</Text>
        </View>
        );
    }

return (
    <View className="flex-1 bg-background ">
      {/* Header simples da tela */}
        <View className="flex-row bg-purple-800 items-center p-4 pb-5 mb-4">
            <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <Feather name="arrow-left" size={28} className="text-text" color="white"/>
            </TouchableOpacity>
            <Text className="text-xl text-white font-bold ml-4">Famílias Cadastradas</Text>
        </View>

        <FlatList
            data={families}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <FamilyCard
                family={item}
                onPress={() => router.push(`/(app)/family/${item.id}`)}
            />
            )}
            contentContainerClassName="p-4 pt-0"
        
            ListEmptyComponent={
                <View className="flex-1 items-center justify-center mt-20">
                    <Text className="text-gray-500 text-lg">Nenhuma família cadastrada.</Text>
                </View>
            }
        />

        {/* Botão Flutuante (FAB) para Adicionar Nova Família */}
        <TouchableOpacity
            onPress={() => router.push('/(app)/add-family')}
            className="absolute bottom-8 right-8 bg-primary p-4 rounded-full shadow-lg"
            style={{ elevation: 5 }}
        >
            <Feather name="plus" size={28} color="white" />
        </TouchableOpacity>
    </View>
  );
}
