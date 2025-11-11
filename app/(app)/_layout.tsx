import { Drawer } from 'expo-router/drawer';
import { useAuth } from '@contexts/AuthContext';
import DrawerContent from '@components/DrawerContent';
import { Button, View } from 'react-native'; 

export default function AppLayout() {
  const { signOut } = useAuth();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="home" options={{ drawerLabel: 'Início', title: 'Início' }} />
      <Drawer.Screen name="profile" options={{ drawerLabel: 'Meu Perfil', title: 'Meu Perfil' }} />
      <Drawer.Screen name="settings" options={{ drawerLabel: 'Configurações', title: 'Configurações' }} />
    </Drawer>
  );
}