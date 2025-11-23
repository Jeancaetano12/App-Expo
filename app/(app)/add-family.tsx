import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
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
        cep, setCep,
        logradouro, setLogradouro,
        numero, setNumero,
        complemento, setComplemento,
        unidade, setUnidade,
        bairro, setBairro,
        localidade, setLocalidade,
        uf, setUf,
        contatoTelefone, setContatoTelefone,
        pacientes, addPatientToList, removePatientFromList,
        saveFamily, isLoading, isLoadingCep, fetchAddressByCep,
        fetchCurrentLocation, isLoadingLocation 
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

            <ScrollView className="flex-1 px-4">
                {/* secão 1: Dados da familia */}
                <Text className='text-lg font-bold text-primary mb-4'>1. Dados da Família</Text>
                <Text className="text-secondary mb-1">Sobrenome da Família *</Text>
                <InputDefault 
                    value={sobrenome} 
                    onChangeText={setSobrenome} 
                    placeholder='Ex: Souza'
                    className="mb-4"
                />

                <View className="flex-row items-center justify-between mb-1">
                    <Text className='text-secondary'>CEP *</Text>
                    {/* Indicadores de carregamento */}
                    {(isLoadingCep || isLoadingLocation) && (
                        <View className="flex-row items-center">
                            <ActivityIndicator size="small" color="#6366f1" />
                            <Text className="text-xs text-primary ml-2">
                                {isLoadingLocation ? 'Localizando...' : 'Buscando endereço...'}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Input de CEP com Botão de GPS acoplado */}
                <View className="flex-row items-center gap-2 mb-4">
                    <View className="flex-1">
                        <InputDefault 
                            value={cep} 
                            onChangeText={(text) => {
                                setCep(text);
                                if(text.length >= 8) fetchAddressByCep(text);
                            }}
                            onBlur={() => fetchAddressByCep(cep)}
                            placeholder='00000-000'
                            keyboardType='numeric'
                            maxLength={9}
                            className="mb-0" 
                        />
                    </View>
                    
                    <TouchableOpacity 
                        onPress={fetchCurrentLocation}
                        disabled={isLoadingLocation}
                        className="bg-purple-100 p-3 rounded-lg border border-purple-200 justify-center items-center h-14 w-14"
                    >
                        {isLoadingLocation ? (
                            <ActivityIndicator color="#6b21a8" />
                        ) : (
                            <Feather name="map-pin" size={24} className="text-purple-800" color="#6b21a8" />
                        )}
                    </TouchableOpacity>
                </View>

                <View className="flex-row gap-2 mb-4">
                    <View className="flex-1">
                        <Text className="text-secondary mb-1">Rua / Logradouro *</Text>
                        <InputDefault
                            value={logradouro}
                            onChangeText={setLogradouro}
                            placeholder='Rua das Flores'
                        />
                    </View>
                    <View className="w-1/4">
                        <Text className="text-secondary mb-1">Número *</Text>
                        <InputDefault
                            value={numero ?? ''}
                            onChangeText={setNumero}
                            placeholder='Ex: 123'
                            keyboardType='numeric'
                        />
                    </View>
                </View>
                
                <Text className='text-secondary mb-1'>Bairro</Text>
                <InputDefault value={bairro} onChangeText={setBairro} placeholder='Ex: Centro' className="mb-4" />

                <View className="flex-row gap-2 mb-4">
                    <View className="flex-1">
                        <Text className="text-secondary mb-1">Cidade *</Text>
                        <InputDefault value={localidade} onChangeText={setLocalidade} placeholder='Ex: Fortaleza' />
                    </View>
                    <View className="w-1/5">
                        <Text className="text-secondary mb-1">UF *</Text>
                        <InputDefault value={uf} onChangeText={setUf} placeholder='Ex: CE' maxLength={2} />
                    </View>
                </View>

                <Text className='text-secondary mb-1'>Complemento</Text>
                <InputDefault value={complemento ?? ''} onChangeText={setComplemento} placeholder='Ex: Apto 101' className="mb-4" />
                
                <Text className="text-secondary mb-1">Telefone principal de contato</Text>
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
                
                {/* Lista visual de pacientes */}
                {pacientes.length === 0 ? (
                    <View className="bg-input-bg p-6 rounded-lg items-center mb-8 border-dashed border-2 border-gray-300 dark:border-gray-700">
                        <Text className='text-secondary'>Nenhum paciente adicionado ainda</Text>
                    </View>
                ): (
                    <View className='mb-8'>
                        {pacientes.map((p, index) => (
                            <View key={index} className="bg-input-bg p-4 rounded-lg mb-2 flex-row justify-between items-center shadow-sm">
                                <View>
                                    <Text className="font-bold text-text text-lg">{p.nomeCompleto}</Text>
                                    <Text className="text-secondary text-sm">CPF: {p.cpf}</Text>
                                </View>
                                <TouchableOpacity onPress={() => removePatientFromList(p.cpf)} className="p-2">
                                    <Feather name="trash-2" size={20} className="text-red-500" color="#ef4444" />
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
                
                {/* Espaço extra no final para scroll */}
                <View className="h-10" /> 
            </ScrollView>

            <AddPatientModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={addPatientToList}
            />
        </View>
    )
}