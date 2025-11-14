import { useState, useEffect } from "react";
import api from "@services/api";
import { useAuth } from "@contexts/AuthContext";
import { Paciente } from "../types/families";

export function usePatient(cpf: string) {
    const [patient, setPatient] = useState<Paciente | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const { token } = useAuth();

    useEffect(() => {
        if (!token || !cpf) {
            setIsLoading(false);
            return;
        }

        const fetchPatient = async () => {
            try {
                console.log(`[usePatientDetails] Buscando paciente com CPF: ${cpf}`);

                const response = await api.get<Paciente>(`/patients/${cpf}`);
                setPatient(response.data);
                console.log("[usePatientDetails] Paciente carregado.", response.data);
            } catch (error) {
                console.error(`[usePatientDetails] Erro ao buscar paciente ${cpf}:`, error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPatient();
    }, [token, cpf]);
    return { patient, isLoading, error };
}