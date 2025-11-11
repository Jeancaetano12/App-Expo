import { View, Text } from 'react-native';
import { Header } from '@components/Header';

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-background">

      <Header />
      
      <Text className="text-2xl text-text items-center justify-center"> Tela de Configurações</Text>
    </View>
  );
}