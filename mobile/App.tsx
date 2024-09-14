import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { AuthContextProvider } from "@contexts/AuthContext";

import { config } from './config/gluestack-ui.config';

import { Routes } from '@routes/index';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <GluestackUIProvider config={config}>
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
      
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> :  <Loading/> }
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}