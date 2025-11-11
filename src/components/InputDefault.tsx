import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

// Este componente aceita todas as propriedades de um TextInput padrão.
// A mágica do "...rest" passa todas as outras props (placeholder, onChangeText, etc.)
// diretamente para o TextInput.
export function InputDefault({ className, ...rest }: TextInputProps) {
  return (
    <TextInput
      className={`w-full h-14 bg-gray-200 rounded-lg p-4 text-gray-800 text-base focus:border-2 focus:border-purple-800 ${className}`}
      placeholderTextColor="#6b7280"
      {...rest}
    />
  );
}