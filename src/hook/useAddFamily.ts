import { useState } from 'react';
import { useRouter } from 'expo-router';
import api from '@services/api';
import Toast from 'react-native-toast-message';

export interface NewPatient {
    cpf: string;
    nomeCompleto: string;
    dataNascimento: string; // formato 'YYYY-MM-DD'
    pacienteTelefone: string;
}

export interface NewFamilyData {
    sobrenome: string;
    endereco: string;
    contatoTelefone: string;
    pacientes: NewPatient[];
}

export function useAddFamily() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [sobrenome, setSobrenome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [contatoTelefone, setContatoTelefone] = useState('');

    const [pacientes, setPacientes] = useState<NewPatient[]>([]);

    const addPatientToList = (patient: NewPatient) => {
        if (!patient.cpf || !patient.nomeCompleto || !patient.dataNascimento) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Preencha todos os campos do paciente antes de adicionar.',
            });
            return false;
        } 
        setPacientes((prev) => [...prev, patient]);
        return true;
    }

    const removePatientFromList = (cpfIndex: string) => {
        setPacientes((prev) => prev.filter((p) => p.cpf !== cpfIndex));
    };

    const saveFamily = async () => {
        if (!sobrenome || !endereco || pacientes.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'A família precisa de pelo menos UM integrante.',
            });
            return;
        }

        setIsLoading(true);
        try {
            const payload: NewFamilyData = {
                sobrenome,
                endereco,
                contatoTelefone,
                pacientes,
            };
            console.log('Enviando payload:', JSON.stringify(payload, null, 2));

            await api.post('/family', payload);
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Família registrada com sucesso!',
            });
            router.push('/families');
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Ocorreu um erro ao registrar a família. Tente novamente.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        // States
        sobrenome, setSobrenome,
        endereco, setEndereco,
        contatoTelefone, setContatoTelefone,
        pacientes, isLoading, setIsLoading,
        // Ações
        addPatientToList,
        removePatientFromList,
        saveFamily,
    };
}