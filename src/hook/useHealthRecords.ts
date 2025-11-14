import { useState, useEffect } from 'react';
import api from '@services/api';
import { useAuth } from '@contexts/AuthContext';
import { PacienteInfo } from "../types/families"; // Importando o novo tipo

export function useHealthRecords(cpf: string) {
  const [records, setRecords] = useState<PacienteInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const { token } = useAuth();

  useEffect(() => {
    if (!token || !cpf) {
      setIsLoading(false);
      return;
    }

    const fetchRecords = async () => {
      try {
        console.log(`[useHealthRecords] Buscando registros para o CPF: ${cpf}`);
        
        // ---- AJUSTE A ROTA AQUI SE NECESSÁRIO ----
        // Estou assumindo que a rota para os registros é esta:
        const response = await api.get<PacienteInfo[]>(`/patients/${cpf}/indicators`);
        
        setRecords(response.data); 
        console.log('[useHealthRecords] Registros carregados.');
      } catch (err) {
        console.error(`[useHealthRecords] Erro ao buscar registros ${cpf}:`, err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
    
  }, [token, cpf]);

  return { records, isLoading, error };
}