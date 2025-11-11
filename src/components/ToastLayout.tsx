import React from 'react';
import { View, Text } from 'react-native';

interface CustomToastProps {
    text1?: string;
    text2?: string;
    message?: string;
    borderColorClass: string;
    shadowColorClass: string;
}

export function CustomToastLayout({
    text1,
    text2,
    message,
    borderColorClass,
    shadowColorClass
}: CustomToastProps ) {
    return (
        <View
            className={`w-[90%] max-w-sm bg-white rounded-full p-4
                border-2 ${borderColorClass}
                shadow-lg ${shadowColorClass}`}
            style={{ elevation: 10 }}
        >
            {/* Titulo 1 */}
            {text1 && (
                <Text className="text-lg text-center font-semibold text-gray-900">
                    {text1}
                </Text>
            )}
            {/* Titulo 2 */}
            {text2 && (
                <Text className="text-base text-center text-gray-700">
                    {text2}
                </Text>
            )}
            {/* Mensagem */}
            {message && (
                <Text className="text-base text-center text-gray-600">
                    {message}
                </Text>
            )}
        </View>
    );
}