
import 'react-native-gesture-handler';

import React from 'react';

import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium

} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
  
} from '@expo-google-fonts/archivo';

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  //const { userStorageLoading } = useAuth();
   
  if (!fontsLoaded) {
    return
    // return <AppLoading />
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}
