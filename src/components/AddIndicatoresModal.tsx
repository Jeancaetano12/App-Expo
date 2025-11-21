import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AddIndicatorModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    isLoading: boolean;
}

export function AddIndicatorModal({ visible, onClose, onSubmit, isLoading }: AddIndicatorModalProps) {
    const [peso, setPeso] = useState('');
    const [pressao, setPressao] = useState(''); // Ex: 120/80
    const [glicemia, setGlicemia] = useState('');
    const [altura, setAltura] = useState('');

    const handleSubmit = () => {
        // Validação básica
        if (!peso || !pressao || !altura) {
            alert("Por favor, preencha Peso, Pressão e Altura.");
            return;
        }

        // Formatar dados para o padrão da API
        const payload = {
            pesoKg: parseFloat(peso.replace(',', '.')),
            pressaoArterial: pressao,
            glicemiaMgDl: glicemia ? parseInt(glicemia) : null,
            alturaM: parseFloat(altura.replace(',', '.')),
        };

        onSubmit(payload);
        
        // Limpar form
        setPeso('');
        setPressao('');
        setGlicemia('');
        setAltura('');
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-end sm:justify-center bg-black/50"
            >
                <View className="bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-2xl p-6 w-full sm:w-[90%] sm:self-center shadow-xl">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-xl font-bold text-purple-800 dark:text-purple-400">
                            Novos Indicadores
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Peso */}
                        <View className="mb-4">
                            <Text className="text-gray-600 dark:text-gray-300 mb-1 font-medium">Peso (Kg) *</Text>
                            <TextInput
                                className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-lg border border-gray-200 dark:border-zinc-700 text-lg"
                                placeholder="Ex: 80.5"
                                keyboardType="numeric"
                                value={peso}
                                onChangeText={setPeso}
                            />
                        </View>

                        {/* Altura */}
                        <View className="mb-4">
                            <Text className="text-gray-600 dark:text-gray-300 mb-1 font-medium">Altura (Metros) *</Text>
                            <TextInput
                                className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-lg border border-gray-200 dark:border-zinc-700 text-lg"
                                placeholder="Ex: 1.70"
                                keyboardType="numeric"
                                value={altura}
                                onChangeText={setAltura}
                            />
                        </View>

                        {/* Pressão Arterial */}
                        <View className="mb-4">
                            <Text className="text-gray-600 dark:text-gray-300 mb-1 font-medium">Pressão Arterial *</Text>
                            <TextInput
                                className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-lg border border-gray-200 dark:border-zinc-700 text-lg"
                                placeholder="Ex: 120/80"
                                value={pressao}
                                onChangeText={setPressao}
                            />
                        </View>

                        {/* Glicemia */}
                        <View className="mb-6">
                            <Text className="text-gray-600 dark:text-gray-300 mb-1 font-medium">Glicemia (mg/dL) (Opcional)</Text>
                            <TextInput
                                className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-lg border border-gray-200 dark:border-zinc-700 text-lg"
                                placeholder="Ex: 90"
                                keyboardType="numeric"
                                value={glicemia}
                                onChangeText={setGlicemia}
                            />
                        </View>

                        <TouchableOpacity 
                            onPress={handleSubmit}
                            disabled={isLoading}
                            className={`p-4 rounded-lg items-center ${isLoading ? 'bg-purple-400' : 'bg-purple-800'}`}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white font-bold text-lg">Salvar Indicadores</Text>
                            )}
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}