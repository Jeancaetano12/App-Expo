// src/types/navigation.ts
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type AppDrawerParamList = {
  home: undefined;
  profile: undefined;
  settings: undefined;
};

export type AppNavigationProp = DrawerNavigationProp<AppDrawerParamList>;