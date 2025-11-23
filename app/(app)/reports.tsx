import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDownloadReport } from '@hooks/useDownloadReport';

export default function ReportScreen() {
    const router = useRouter();
    const { downloadGeneralReport, isDownloading } = useDownloadReport();

    return (
        <View className="flex-1 bg-background">
            {/* Header */}
            <View className='flex-row bg-purple-800 items-center p-4 pb-5 pt-12 mb-6 shadow-md'>
                <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
                    <Feather name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">
                    Central de Relatórios
                </Text>
            </View>

            <View className='px-6'>
                <Text className='text-2xl font-bold text-text mb-2'>
                    Disponíveis
                </Text>
                <Text className='text-gray-500 mb-6'>
                    Selecione um relatório abaixo para gerar o PDF.
                </Text>

                {/* Card do Relatório Geral */}
                <TouchableOpacity 
                    onPress={downloadGeneralReport}
                    disabled={isDownloading}
                    className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 flex-row items-center justify-between active:bg-gray-50"
                >
                    <View className="flex-row items-center flex-1">
                        <View className="h-12 w-12 bg-red-100 rounded-full items-center justify-center mr-4">
                            <FontAwesome6 name="file-pdf" size={24} color="#dc2626" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                Relatório Geral
                            </Text>
                            <Text className="text-sm text-gray-500">
                                Visão resumida dos registros coletados
                            </Text>
                        </View>
                    </View>

                    <View className="ml-2">
                        {isDownloading ? (
                            <ActivityIndicator color="#6b21a8" />
                        ) : (
                            <Feather name="download-cloud" size={24} color="#6b21a8" />
                        )}
                    </View>
                </TouchableOpacity>

                {/* Exemplo visual de um futuro relatório (bloqueado) para dar volume à tela */}
                <View className="mt-4 bg-gray-50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-dashed border-gray-300 dark:border-zinc-800 flex-row items-center opacity-60">
                    <View className="h-12 w-12 bg-gray-200 rounded-full items-center justify-center mr-4">
                        <Feather name="bar-chart-2" size={24} color="#666" />
                    </View>
                    <View>
                        <Text className="text-lg font-bold text-gray-500">
                            Estatísticas (Em breve)
                        </Text>
                        <Text className="text-sm text-gray-400">
                            Análise detalhada por período
                        </Text>
                    </View>
                </View>

            </View>
        </View>
    );
}