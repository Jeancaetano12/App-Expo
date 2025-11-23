import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy'
import * as Sharing from 'expo-sharing';
import { useAuth } from '@contexts/AuthContext';
import { API_URL } from '@services/api';

export function useDownloadReport() {
    const [isDownloading, setIsDownloading] = useState(false);
    const { token, user } = useAuth();

    const downloadGeneralReport = async () => {
        if (user.role != 'ADMIN') {
            Alert.alert("Erro", "Somente administradores podem solicitar relatórios.")
            return;
        }

        if (!token) {
            Alert.alert("Erro", "Você precisa estar autenticado")
        }

        try {
            setIsDownloading(true);

            // Definir onde o arquivo será salvo temporariamente
            const filename = `relatorio_geral_${new Date().getTime()}.pdf`;
            const fileUri = FileSystem.documentDirectory + filename;

            const downloadResumable = FileSystem.createDownloadResumable(
                `${API_URL}/reports/general`,
                fileUri,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/pdf'
                    }
                }
            );

            const result = await downloadResumable.downloadAsync();

            if (result && result.uri) {
                if (!(await Sharing.isAvailableAsync())) {
                    Alert.alert("Erro", "O compartilhamento não está disponivel nesse dispositivo");
                    return;
                }

                await Sharing.shareAsync(result.uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Salvar Relatório Geral',
                    UTI: 'com.adobe.pdf'
                });
            }
        } catch (error) {
            console.error("Erro no download:", error);
            Alert.alert("Erro", "Não foi possivel gerar o relatório. Tente novamente");
        } finally {
            setIsDownloading(false);
        }
    };

    return { downloadGeneralReport, isDownloading };
}
