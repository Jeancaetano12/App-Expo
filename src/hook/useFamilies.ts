import { useState, useEffect } from 'react';
import api from '@services/api';
import { useAuth } from '@contexts/AuthContext';
import { Family, PaginatedFamiliesResponse } from '../types/families'; // Importando nosso novo tipo

export function useFamilies() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const { token } = useAuth(); 

  // useEffect vai rodar assim que o hook for usado em um componente
  useEffect(() => {
    // Só busca os dados se o usuário estiver logado (tiver um token)
    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchFamilies = async () => {
      setIsLoading(true)
      try {
        console.log('[useFamilies] Buscando famílias do back-end...');
        const response = await api.get<PaginatedFamiliesResponse>('/family');
        
        setFamilies(response.data.data);
        console.log('[useFamilies] Famílias carregadas.');
      } catch (err) {
        console.error("[useFamilies] Erro ao buscar famílias:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFamilies();
  }, [token]); // O hook vai rodar de novo se o token mudar (ex: usuário deslogar)

  return { families, isLoading, error };
}