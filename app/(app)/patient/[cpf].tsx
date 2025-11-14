import React, { use } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { usePatient } from '@hooks/usePatient';

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
                <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4">
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
                <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4">
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
        </View>
    )
}