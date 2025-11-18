import { useState, useEffect } from 'react';
import api from '@services/api';
import { useAuth } from '@contexts/AuthContext';
import { Family } from '../types/families'

export function useFamilyDetails(id: string) {
  const [family, setFamily] = useState<Family | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const { token, logOut } = useAuth();

  useEffect(() => {
    // Só busca se tivermos um token E um ID
    if (!token || !id) {
      setIsLoading(false);
      logOut();
      return;
    }

    const fetchFamily = async () => {
      try {
        console.log(`[useFamilyDetails] Buscando família com ID: ${id}`);
        
        // 1. Usamos a nova rota com o ID
        const response = await api.get<Family>(`/family/${id}`);
        
        // 2. O seu JSON não é paginado, então pegamos 'response.data' diretamente
        setFamily(response.data); 
        
        console.log('[useFamilyDetails] Família carregada.');
      } catch (err) {
        console.error(`[useFamilyDetails] Erro ao buscar família ${id}:`, err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFamily();
    
    // O hook roda de novo se o token ou o ID mudar
  }, [token, id]);

  return { family, isLoading, error };
}