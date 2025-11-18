import React, { use } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { usePatient } from '@hooks/usePatient';
import { PacienteIndicatorsCard } from '@components/PacienteIndicatorsCard';

export default function PatientScreen() {
    const navigation = useNavigation();
    const router = useRouter();

    const { cpf } = useLocalSearchParams();

    const { patient, isLoading, error } = usePatient(cpf as string);
    if (isLoading) {
        return (
            <View className="flex-1 bg-background items-center justify-center">
                <ActivityIndicator size="large" color="text-primary" />
            </View>
        );
    }

    if (error || !patient) {
        return (
            <View className="flex-1 bg-background items-center justify-center p-4">
                <Text className="text-lg text-red-500 text-center">
                    Não foi possível carregar os dados do paciente.
                </Text>
                <TouchableOpacity onPress={() => router.push('/families')} className="mt-4">
                    <Text className="text-primary text-lg">Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (Array.isArray(patient) && patient.length === 0) {
        return (
            <View className="flex-1 bg-background items-center justify-center p-4">
                <Text className="text-lg text-red-500 text-center">
                    Paciente não possui indicadores cadastrados.
                </Text>
                <TouchableOpacity onPress={() => router.push('/families')} className="mt-4">
                    <Text className="text-primary text-lg">Voltar</Text>
                </TouchableOpacity>
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
                {patient.map((indicator: any) => (
                    <PacienteIndicatorsCard
                        key={indicator.id}
                        pacienteInfo={indicator}
                        paciente={patient}
                    />
                ))} 
            </ScrollView>

            <TouchableOpacity
                onPress={() => router.push('/(app)/add-family')}
                className="absolute bottom-8 right-8 bg-primary p-4 rounded-full shadow-lg"
                style={{ elevation: 5 }}
            >
                <Feather name="plus" size={28} color="white" />
            </TouchableOpacity>

        </View>
    )
}