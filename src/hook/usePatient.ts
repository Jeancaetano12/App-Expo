import { useState, useEffect, useCallback } from "react";
import api from "@services/api";
import { useAuth } from "@contexts/AuthContext";
import { Paciente } from "../types/families";

export function usePatient(cpf: string) {
    // Mudado para any[] temporariamente pois seus indicadores parecem ter estrutura própria
    // O ideal seria criar uma interface Indicator também
    const [patient, setPatient] = useState<any[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const { token, logOut } = useAuth();

    const fetchPatient = useCallback(async () => {
        if (!token || !cpf) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            console.log(`[usePatient] Buscando dados do CPF: ${cpf}`);
            const response = await api.get(`/patients/${cpf}`);
            setPatient(response.data);
        } catch (error) {
            console.error(`[usePatient] Erro ao buscar:`, error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [token, cpf]);

    useEffect(() => {
        fetchPatient();
    }, [fetchPatient]);

    return { patient, isLoading, error, refetch: fetchPatient };
}