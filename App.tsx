import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { GluestackUIProvider } from "@gluestack-ui/themed";

import { config } from './config/gluestack-ui.config';

import { Loading } from '@components/Loading';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <GluestackUIProvider config={config}>
        <StatusBar 
          backgroundColor='transparent'
          barStyle='light-content'
          translucent
        />

        { fontsLoaded ?  <SignIn />:  <Loading/> }
    </GluestackUIProvider>
  );
}