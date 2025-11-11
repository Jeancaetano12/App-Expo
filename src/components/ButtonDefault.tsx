import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, View} from 'react-native';

// Definimos os tipos de propriedades que nosso botão vai aceitar.
// Ele aceita todas as propriedades de um TouchableOpacity e mais um 'title'.
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: React.ReactNode;
}

export function ButtonDefault({ title, className, icon, ...rest }: ButtonProps) {
  return (
    // TouchableOpacity dá um efeito de feedback ao tocar.
    <TouchableOpacity
      className={`w-full bg-purple-800 h-14 items-center justify-center rounded-lg ${className}`}
      activeOpacity={0.7}
      {...rest}
    >
      <View className="flex-row items-center justify-center">
        <Text className="text-white font-bold text-lg">{title}</Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
}