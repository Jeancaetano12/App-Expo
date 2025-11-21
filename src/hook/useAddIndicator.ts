import { useState } from "react";
import api from "@services/api";
import Toast from 'react-native-toast-message';

interface IndicatorData {
    pesoKg: number;
    pressaoArterial: string;
    glicemiaMgDl: number | null;
    alturaM: number;
}

export function useAddIndicator() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createIndicator = async (cpf: string, data: IndicatorData, onSuccess: () => void) => {
        setIsSubmitting(true);
        try {
            await api.post(`/patients/${cpf}/indicators`, data);
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Indicadores de saúde adicionados'
            })
            onSuccess();
        } catch (error) {
            console.error("Erro ao criar indicador:", error);
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro ao adicionar os indicadores'
            })
        } finally {
            setIsSubmitting(false);
        }
    };

    return { createIndicator, isSubmitting };
}