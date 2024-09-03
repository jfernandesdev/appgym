import { StatusBar, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { GluestackUIProvider, Center, Text } from "@gluestack-ui/themed";

import { config } from './config/gluestack-ui.config';

import { Loading } from '@components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <GluestackUIProvider config={config}>
        <StatusBar 
          backgroundColor='transparent'
          barStyle='light-content'
          translucent
        />

        {fontsLoaded ? (
          <Center flex={1} bg="$gray700">
            <Text color="white" fontSize={34}>Home</Text>
          </Center> 
        ) : (
          <Loading/>
        ) }
    </GluestackUIProvider>
  );
}