import React, { useState } from 'react'; 
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  useWindowDimensions,
  FlatList, 
  NativeSyntheticEvent, 
  NativeScrollEvent,
  ScrollView // 1. IMPORTAR O SCROLLVIEW
} from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { Header } from '@components/Header';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

// --- DADOS DO CARROSSEL ---
const images = [
  require('../../assets/saúdecomunitaria1.jpg'), 
  require('../../assets/saúdecomunitaria2.jpg'), // 2. CORRIGI UM ERRO DE DIGITAÇÃO AQUI (faltava um "/")
  require('../../assets/saúdecomunitaria3.jpg'), 
  require('../../assets/saúdecomunitaria4.jpg')
];

// 3. DADOS FICTÍCIOS PARA AS NOTÍCIAS
// (No futuro, isso virá de uma API)
const mockNews = [
  { 
    id: '1', 
    title: 'Nova campanha de vacinação contra a gripe começa nos postos de bairro', 
    source: 'Ministério da Saúde', 
    date: '14/11/2025' 
  },
  { 
    id: '2', 
    title: 'Agentes comunitários recebem novo treinamento para visitas domiciliares', 
    source: 'Jornal Local', 
    date: '13/11/2025' 
  },
  { 
    id: '3', 
    title: 'Dicas de como prevenir a dengue e chikungunya na sua comunidade', 
    source: 'Portal Saúde', 
    date: '12/11/2025' 
  },
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

  // 4. FUNÇÃO PARA SIMULAR CLIQUE NA NOTÍCIA
  const handleNewsPress = (newsItem: (typeof mockNews)[0]) => {
    // No futuro, isso navegaria para a tela da notícia
    Toast.show({
      type: 'info',
      text1: 'Abrindo notícia...',
      text2: newsItem.title,
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Header />
      {/* 5. MUDANÇA DE <View> PARA <ScrollView> */}
      <ScrollView 
        className="flex-1" // Removemos o p-4 daqui
        contentContainerClassName="p-4" // Adicionamos o padding aqui
        showsVerticalScrollIndicator={false} // Esconde a barra de rolagem
      >
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
          {/* ... Seus botões (sem alteração) ... */}
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
            <Feather name="bar-chart" size={24} className="text-primary" />
            <View className="flex-shrink">
              <Text className="text-base font-bold text-text" numberOfLines={2}>
                Indicadores
              </Text>
            </View>
          </TouchableOpacity>
        </View>

         {/* --- INÍCIO DO CARROSSEL NATIVO --- */}
        <View className="h-48 mb-6">
          <FlatList
            // ... (código sem alterações) ...
            data={images}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll} 
            scrollEventThrottle={16} 
            renderItem={({ item }) => (
              <Image
                source={item}
                style={{ width: componentWidth, height: '100%' }}
                resizeMode="cover"
                className="rounded-lg" 
              />
            )}
            style={{ width: componentWidth, height: 192 }} 
            className="rounded-lg"
          />
          {/* Pontinhos */}
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

        {/* --- Banner "Saúde bate à porta" --- */}
        <View className='bg-purple-700 p-4 rounded-xl flex-row items-center justify-center shadow-md mb-6'>
          <Text className="text-center text-xl text-white font-bold">
            Saúde bate à porta
          </Text>
        </View>


        {/* 6. NOVA SEÇÃO DE NOTÍCIAS */}
        <View>
          <Text className="text-lg font-bold text-text mb-4">
            Últimas Notícias
          </Text>

          {/* Mapeia o array de notícias e cria um card para cada */}
          {mockNews.map((item) => (
            <TouchableOpacity 
              key={item.id}
              className="bg-input-bg p-4 rounded-lg mb-3 flex-row items-center"
              activeOpacity={0.7}
              onPress={() => handleNewsPress(item)}
            >
              {/* Ícone */}
              <View className="mr-4">
                <Feather name="globe" size={28} className="text-primary" />
              </View>

              {/* Texto */}
              <View className="flex-1">
                <Text className="text-base font-bold text-text" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-sm text-secundary mt-1">
                  Fonte: {item.source} - {item.date}
                </Text>
              </View>

              {/* Ícone de "ir" */}
              <View className="ml-2">
                 <Feather name="chevron-right" size={20} className="text-secundary" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
      {/* 5. FIM DO <ScrollView> */}
      </ScrollView>
    </View>
  );
}