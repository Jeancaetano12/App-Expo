import React from "react";
import { StatusBar } from 'react-native';
import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@contexts/AuthContext';
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';

export function Header() {
    useEffect(() => {
        StatusBar.setBarStyle('light-content'); // Texto branco
    }, []);
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    if (!user) {
        return null
    }

    return (
        <View className="bg-purple-800
        w-full flex-row items-center justify-between
        px-6 pt-4 pb-5"
        >
            {/*Icone de perfil*/ }
            <TouchableOpacity
                className="p-2" activeOpacity={0.7}
                onPress={() => navigation.navigate('profile')}
            >
                <Feather name="user" size={28} color="white" />
            </TouchableOpacity>
            {/*Nome do usuario*/}
            <Text className="text-lg text-white semibold ml-3 ">
                Olá {user?.primeiroNome}!
            </Text>
            {/*Icone de configurações*/ }
            <TouchableOpacity
                className="p-2 ml-20" activeOpacity={0.7}
                onPress={() => navigation.openDrawer()}
            >
                <Feather name="menu" size={28} color="white" />
            </TouchableOpacity>
        </View>
    );
}