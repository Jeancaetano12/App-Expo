// src/types/navigation.ts
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';

export type AppDrawerParamList = {
  home: undefined;
  profile: undefined;
  settings: undefined;
};

export type AppNavigationProp = DrawerNavigationProp<AppDrawerParamList>;