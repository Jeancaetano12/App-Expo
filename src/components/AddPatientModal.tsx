import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { InputDefault } from '@components/InputDefault'; 
import { ButtonDefault } from '@components/ButtonDefault';
import { NewPatient } from '@hooks/useAddFamily';

interface AddPatientModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (patient: NewPatient) => boolean;
}

export function AddPatientModal({ visible, onClose, onSave }: AddPatientModalProps) {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [pacienteTelefone, setPacienteTelefone] = useState('');

    const handleSave = () => {
        const success = onSave({ nomeCompleto, cpf, dataNascimento, pacienteTelefone});
        if (success) {
            setNomeCompleto('');
            setCpf('');
            setDataNascimento('');
            setPacienteTelefone('');
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View className="flex-1 justify-end bg-black/50">
                <View className="bg-white rounded-t-3xl p-6 max-h-[80%]">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-lg font-bold text-text">Adicionar Paciente</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} className="text-secondary" color="#000" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text className="text-secondary mb-1">Nome Completo *</Text>
                        <InputDefault value={nomeCompleto} onChangeText={setNomeCompleto} 
                        className="mb-4" placeholder='Ex: Maria Sousa' />

                        <Text className="text-secondary mb-1">CPF *</Text>
                        <InputDefault value={cpf} onChangeText={setCpf} 
                        className="mb-4" placeholder='Ex: 123.456.789-00' keyboardType='numeric' />

                        <Text className="text-secondary mb-1">Data de Nascimento (YYYY-MM-DD) *</Text>
                        <InputDefault value={dataNascimento} onChangeText={setDataNascimento} 
                        className="mb-4" placeholder='Ex: 1990-05-20' keyboardType='numbers-and-punctuation' />

                        <Text className="text-secondary mb-1">Telefone</Text>
                        <InputDefault value={pacienteTelefone} onChangeText={setPacienteTelefone} 
                        className="mb-6" placeholder='Ex: (11) 91234-5678' keyboardType='phone-pad' />

                        <ButtonDefault title="Salvar Paciente" onPress={handleSave} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}