// src/components/CustomDrawerContent.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';

export default function DrawerContent(props: any) {
  const { signOut } = useAuth();

  return (
    <DrawerContentScrollView {...props} className="bg-white">
      <DrawerItem
        label="Início"
        onPress={() => props.navigation.navigate('home')}
      />
      <DrawerItem
        label="Meu Perfil"
        onPress={() => props.navigation.navigate('profile')}
      />
      <DrawerItem
        label="Configurações"
        onPress={() => props.navigation.navigate('settings')}
      />
      <View className="px-6 py-4 mt-6">
        <TouchableOpacity className="bg-red-500 py-3 px-4 rounded-lg" onPress={signOut}>
          <Text className="text-white text-center font-bold"> Sair (SignOut)</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
