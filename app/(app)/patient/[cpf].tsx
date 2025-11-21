import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { usePatient } from '@hooks/usePatient';
import { useAddIndicator } from '@hooks/useAddIndicator'; // Importar novo hook
import { PacienteIndicatorsCard } from '@components/PacienteIndicatorsCard';
import { AddIndicatorModal } from '@components/AddIndicatoresModal'; // Importar modal

export default function PatientScreen() {
    const router = useRouter();
    const { cpf } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);

    // Hook atualizado com refetch
    const { patient, isLoading, error, refetch } = usePatient(cpf as string);
    
    // Hook de cadastro
    const { createIndicator, isSubmitting } = useAddIndicator();

    const handleAddIndicator = async (data: any) => {
        await createIndicator(cpf as string, data, () => {
            setModalVisible(false);
            refetch(); // Atualiza a lista após salvar
        });
    };

    if (isLoading) {
        return (
            <View className="flex-1 bg-background items-center justify-center">
                <ActivityIndicator size="large" className="text-primary" />
            </View>
        );
    }

    // Lógica para exibir botão caso não existam indicadores OU erro
    const showEmptyState = error || !patient || (Array.isArray(patient) && patient.length === 0);

    if (showEmptyState) {
        return (
            <View className="flex-1 bg-background items-center justify-center p-6">
                <View className="bg-purple-100 p-6 rounded-full mb-6">
                    <Feather name="activity" size={48} className="text-purple-800" color="#6b21a8" />
                </View>
                
                <Text className="text-xl font-bold text-text mb-2 text-center">
                    Nenhum indicador encontrado
                </Text>
                
                <Text className="text-base text-gray-500 text-center mb-8">
                    Este paciente ainda não possui histórico de saúde registrado.
                </Text>

                {/* Botão para abrir o Modal */}
                <TouchableOpacity 
                    onPress={() => setModalVisible(true)} 
                    className="bg-purple-800 w-full p-4 rounded-lg flex-row justify-center items-center mb-4"
                >
                    <Feather name="plus-circle" size={20} color="white" style={{marginRight: 8}} />
                    <Text className="text-white text-lg font-bold">Adicionar 1º Registro</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/families')}>
                    <Text className="text-purple-800 text-lg font-medium">Voltar para lista</Text>
                </TouchableOpacity>

                {/* Modal Component */}
                <AddIndicatorModal 
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleAddIndicator}
                    isLoading={isSubmitting}
                />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background">
            {/* Header*/}
            <View className="flex-row bg-purple-800 items-center p-4 pb-5 mb-4">
                <TouchableOpacity onPress={() => router.push('/families')} className="p-2">
                    <Feather name="arrow-left" size={28} className="text-text" color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold ml-4">
                    Indicadores de Saúde
                </Text>
            </View>
    
            <ScrollView className="flex-1 px-4">
                {patient && patient.map((indicator: any) => (
                    <PacienteIndicatorsCard
                        key={indicator.id}
                        pacienteInfo={indicator}
                        paciente={patient}
                    />
                ))} 
            </ScrollView>

            {/* Botão Flutuante para adicionar mais registros */}
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="absolute bottom-8 right-8 bg-purple-800 p-4 rounded-full shadow-lg items-center justify-center"
                style={{ elevation: 5, width: 60, height: 60 }}
            >
                <Feather name="plus" size={28} color="white" />
            </TouchableOpacity>

            {/* Modal Component (reutilizado aqui também) */}
            <AddIndicatorModal 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleAddIndicator}
                isLoading={isSubmitting}
            />
        </View>
    );
}