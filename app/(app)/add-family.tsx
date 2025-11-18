import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { InputDefault } from '@components/InputDefault';
import { ButtonDefault } from '@components/ButtonDefault';
import { AddPatientModal } from '@components/AddPatientModal';
import { useAddFamily } from '@hooks/useAddFamily';

export default function AddFamilyScreen() {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {
        sobrenome, setSobrenome,
        endereco, setEndereco,
        contatoTelefone, setContatoTelefone,
        pacientes, addPatientToList, removePatientFromList,
        saveFamily, isLoading
    } = useAddFamily();

    return (
        <View className='flex-1 bg-background'>
            <View className="flex-row bg-purple-800 items-center p-4 pb-5 mb-4">
                <TouchableOpacity onPress={() => router.push('/home')} className="p-2">
                    <Feather name="arrow-left" size={28} className="text-text" color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold ml-4">
                  Adicionar Família
                </Text>
            </View>

            <ScrollView className="flex-1 p4">
                {/* secão 1: Dados da familia */}
                <Text className='text-lg font-bold text-primary mb-4'>1. Dados da Família</Text>
                <Text className="text-secondary mb-1">Sobrenome da Família *</Text>
                <InputDefault 
                    value={sobrenome} 
                    onChangeText={setSobrenome} 
                    placeholder='Ex: Souza'
                    className="mb-4"
                />

                <Text className="text-secondary mb-1">Endereço *</Text>
                <InputDefault 
                    value={endereco} 
                    onChangeText={setEndereco} 
                    placeholder='Ex: Rua das Flores, 123'
                    className="mb-4"
                />
                <Text className="text-secondary mb-1">Telefone para Contato</Text>
                <InputDefault
                    value={contatoTelefone}
                    onChangeText={setContatoTelefone}
                    placeholder='Ex: (11) 91234-5678'
                    className="mb-6"
                    keyboardType='phone-pad'
                />

                {/* seção 2: Lista de pacientes */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold text-primary">2. Pacientes ({pacientes.length})</Text>
                    <TouchableOpacity
                        onPress={() => setIsModalVisible(true)}
                        className='flex-row items-center bg-primary/10 px-3 py-2 rounded-full'
                    >
                        <Feather name="plus" size={16} className="text-primary mr-1" />
                        <Text className="text-primary font-semibold">Adicionar Paciente</Text>
                    </TouchableOpacity>
                </View>
                {/* Lista visual de pacientes adicionados temporaraiamente */}
                {pacientes.length === 0 ? (
                    <View className="bg-input-bg p-6 rounded-lg items-center mb-8 border-dashed border-2 border-gray-300 dark:border-gray-700">
                        <Text className='text-sencondary'>Nenhum paciente adicionado ainda</Text>
                    </View>
                ): (
                    <View className='mb-8'>
                        {pacientes.map((p, index) => (
                            <View key={index} className="bg-input-bg p4 rounded-lg mb-2 flex-row justify-between items-center">
                                <View>
                                    <Text className="font-bold text-text">{p.nomeCompleto}</Text>
                                    <Text className="text-secondary text-sm">CPF: {p.cpf}</Text>
                                </View>
                                <TouchableOpacity onPress={() => removePatientFromList(p.cpf)}>
                                    <Feather name="trash-2" size={20} className="text-red-500" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                {/* Botao final */}
                <ButtonDefault
                    title={isLoading ? 'Salvando...' : 'Salvar Família'}
                    onPress={saveFamily}
                    disabled={isLoading}
                />
            </ScrollView>

            <AddPatientModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={addPatientToList}
            />
        </View>
    )
}