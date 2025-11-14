import React, { useState } from 'react'; // Removi useRef (não estava sendo usado)
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  useWindowDimensions,
  FlatList, 
  NativeSyntheticEvent, 
  NativeScrollEvent
} from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { Header } from '@components/Header';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

// --- DADOS DO CARROSSEL (com imagens locais) ---
const images = [
  // O caminho deve ser relativo a este arquivo (HomeScreen.tsx)
  require('../../assets/saúdecomunitaria1.jpg'), 
  require('../../assets/saúdecomunitaria2.jpg'), 
  require('../../assets/saúdecomunitaria3.jpg'), 
  require('../../assets/saúdecomunitaria4.jpg')
];
// --------------------------------------------------

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const componentWidth = width - 32; 

  const [activeIndex, setActiveIndex] = useState(0);
  
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = componentWidth; 
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / slideSize);
    setActiveIndex(index);
  };

  const goToFamilyList = () => {
    if (user?.role === 'ADMIN') {
      router.push('/(app)/families');
    } else {
      Toast.show ({
        type: 'error',
        text1: 'Acesso negado ❌',
        text2: 'Somente administradores'
      })
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Header />
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-text mb-6">
          Olá, {user?.nomeCompleto}!
        </Text>
        <Text className="text-base text-secundary mb-4">
          O que você gostaria de fazer hoje?
        </Text>

        {/* --- Container da Grade de Botões --- */}
        <Text className="text-lg font-bold text-text mb-4">
          Seus atalhos
        </Text>
        <View className="flex-row flex-wrap justify-between">
          
          {/* ... Seus botões ... */}
          <TouchableOpacity
            onPress={() => router.push('/(app)/add-family')}
            className="bg-input-bg p-4 mb-4 rounded-lg flex-row items-center gap-3 w-[48%]"
            activeOpacity={0.5}
          >
            <FontAwesome6 name="people-roof" size={24} className="text-primary" />
            <View className="flex-shrink">
              <Text className="text-base font-bold text-text" numberOfLines={2}>
                Adicionar Família
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goToFamilyList}
            className="bg-input-bg p-4 mb-4 rounded-lg flex-row items-center gap-3 w-[48%]"
            activeOpacity={0.5}
          >
            <Feather name="users" size={24} className="text-primary" />
            <View className="flex-shrink">
              <Text className="text-base font-bold text-text" numberOfLines={2}>
                Ver Famílias
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(app)/add-family')}
            className="bg-input-bg p-4 mb-4 rounded-lg flex-row items-center gap-3 w-[48%]"
            activeOpacity={0.5}
          >
            <FontAwesome6 name="chart-bar" size={24} className="text-primary" />
            <View className="flex-shrink">
              <Text className="text-base font-bold text-text" numberOfLines={2}>
                Relatórios
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            className="bg-input-bg p-4 mb-4 rounded-lg flex-row items-center gap-3 w-[48%]"
            activeOpacity={0.5}
          >
            <Feather name="more-horizontal" size={24} className="text-primary" />
            <View className="flex-shrink">
              <Text className="text-base font-bold text-text" numberOfLines={2}>
                Ver Todos
              </Text>
            </View>
          </TouchableOpacity>

        </View>

         {/* --- INÍCIO DO CARROSSEL NATIVO --- */}
        <View className="h-48 mb-6">
          <FlatList
            data={images}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll} 
            scrollEventThrottle={16} 
            renderItem={({ item }) => (
              <Image
                // --- MUDANÇA PRINCIPAL AQUI ---
                source={item} // De: {{ uri: item }} Para: {item}
                // -----------------------------
                style={{ width: componentWidth, height: '100%' }}
                resizeMode="cover"
                className="rounded-lg" 
              />
            )}
            style={{ width: componentWidth, height: 192 }} 
            className="rounded-lg"
          />
          
          {/* Pontinhos de Paginação */}
          <View className="flex-row justify-center absolute bottom-3 left-0 right-0">
            {images.map((_, index) => (
              <View
                key={index}
                className={`
                  h-2 w-2 rounded-full mx-1
                  ${index === activeIndex ? 'bg-primary' : 'bg-gray-300 opacity-80'}
                `}
              />
            ))}
          </View>
        </View>
        {/* --- FIM DO CARROSSEL NATIVO --- */}
      </View>
    </View>
  );
}