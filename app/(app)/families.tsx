import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { FamilyCard } from '@components/FamilyCard';

const MOCK_DATA = [
  { id: '1', name: 'Família Silva', address: 'Rua das Flores, 123', patients: 3 },
  { id: '2', name: 'Família Oliveira', address: 'Av. Principal, 456', patients: 1 },
  { id: '3', name: 'Família Souza', address: 'Beco da Esperança, 78', patients: 5 },
  { id: '4', name: 'Família Sasuke', address: 'Beco da Esperança, 78', patients: 4 },
  { id: '5', name: 'Família Lira', address: 'Beco da Esperança, 78', patients: 8 },
  { id: '6', name: 'Família Caetano', address: 'Beco da Esperança, 78', patients: 1 },
  { id: '7', name: 'Família Rodrigues', address: 'Beco da Esperança, 78', patients: 2 },
  { id: '8', name: 'Família Tintin', address: 'Beco da Esperança, 78', patients: 3 },
  { id: '9', name: 'Família Alexandre', address: 'Beco da Esperança, 78', patients: 2 },
  { id: '10', name: 'Família Cassandra', address: 'Beco da Esperança, 78', patients: 3 },
  { id: '11', name: 'Família Lucas', address: 'Beco da Esperança, 78', patients: 7 },
];

export default function FamilyScreen() {
    const router = useRouter();
    const navigation = useNavigation();

    // Loading pro futuro
    const [loadingMore, setLoadingMore] = useState(false);

    // Função do infinity scroll
    const handleLoadMore = () => {
        setLoadingMore(true);

        setTimeout(() => {
            // 3. Adiciona os novos dados (simulação)
            // setData(prevData => [...prevData, ...novosDadosDaApi]);
      
            // 4. Para de carregar
            setLoadingMore(false);
        }, 1500);
    };

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
            data={MOCK_DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <FamilyCard
                family={item}
                onPress={() => router.push(`/(app)/family/${item.id}`)} // Rota de detalhes (futuro)
            />
            )}
            contentContainerClassName="p-4 pt-0"
        
            // --- A MÁGICA DO INFINITE SCROLL ---
        
            // 1. Quando o usuário chegar ao fim da lista...
            onEndReached={handleLoadMore}
        // 2. ...chame a função quando estiver a 20% do fim.
            onEndReachedThreshold={0.2}
        // 3. Mostra um spinner de loading no rodapé
            ListFooterComponent={
            loadingMore ? <ActivityIndicator size="large" className="my-8" /> : null
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
