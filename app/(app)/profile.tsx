import { View, Text } from 'react-native';
import { Header } from '@components/Header';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background">

      <Header />

      <Text className="text-2xl text-text">Tela de Perfil</Text>
    </View>
  );
}