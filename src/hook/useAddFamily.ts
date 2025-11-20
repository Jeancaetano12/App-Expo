import { useState } from 'react';
import { useRouter } from 'expo-router';
import api from '@services/api';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export interface NewPatient {
    cpf: string;
    nomeCompleto: string;
    dataNascimento: string; // formato 'YYYY-MM-DD'
    pacienteTelefone: string;
}

export interface NewFamilyData {
    sobrenome: string;
    cep: string;
    logradouro: string;
    numero: string | null;
    complemento: string | null;
    unidade: string | null;
    bairro: string;
    localidade: string;
    uf: string;
    contatoTelefone: string;
    pacientes: NewPatient[];
}

export function useAddFamily() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCep, setIsLoadingCep] = useState(false);

    const [sobrenome, setSobrenome] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState<string | null>(null);
    const [complemento, setComplemento] = useState<string | null>(null);
    const [unidade, setUnidade] = useState<string | null>(null);
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');
    const [contatoTelefone, setContatoTelefone] = useState('');
    const [pacientes, setPacientes] = useState<NewPatient[]>([]);

    const fetchAddressByCep = async (cepInput: string) => {
        const cleanCep = cepInput.replace(/\D/g, '');

        if (cleanCep.length !== 8 ) {
            return;
        }

        setIsLoadingCep(true);
        try {
            console.log('Buscando CEP:', `${cleanCep}`);
            const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

            if (response.data.erro) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'CEP não encontrado.',
                })
                return;
            }

            const { logradouro, bairro, localidade, uf } = response.data;
            
            console.log('Endereço encontrado:', response.data);

            setLogradouro(logradouro);
            setBairro(bairro);
            setLocalidade(localidade);
            setUf(uf);
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Não foi possível buscar o CEP. Tente novamente.',
            });
        } finally {
            setIsLoadingCep(false);
        }
    }

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
        if (!sobrenome || !cep || !logradouro || !contatoTelefone || !numero || pacientes.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Preencha os dados obrigatórios (Sobrenome, CEP, Pacientes).',
            });
            return;
        }

        setIsLoading(true);
        try {
            const payload: NewFamilyData = {
                sobrenome,
                cep,
                logradouro,
                numero,
                complemento,
                unidade,
                bairro,
                localidade,
                uf,
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
        cep, setCep,
        logradouro, setLogradouro,
        numero, setNumero,
        complemento, setComplemento,
        unidade, setUnidade,
        bairro, setBairro,
        localidade, setLocalidade,
        uf, setUf,
        contatoTelefone, setContatoTelefone,
        pacientes, isLoading, setIsLoading, isLoadingCep,
        // Ações
        addPatientToList,
        removePatientFromList,
        saveFamily,
        fetchAddressByCep
    };
}