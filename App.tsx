import { StatusBar, Text, View } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#202024'}}>
      <StatusBar 
        backgroundColor='transparent'
        barStyle='light-content'
        translucent
      />
      { fontsLoaded ? <Text style={{ fontSize: 40, fontFamily: 'Roboto_700Bold', color: '#FFF'}}>Home</Text> : <View/>}
    </View>
  );
}