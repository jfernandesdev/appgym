import { VStack, Image, Center, Text, Heading } from "@gluestack-ui/themed";

import BackgroundSignIn from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";

export function SignIn() {
  return (
    <VStack flex={1} bg="$gray700">
      <Image 
        source={BackgroundSignIn} 
        defaultSource={BackgroundSignIn}
        alt="Pessoas treinando" 
        w="$full"
        h={624}
        position="absolute"
      />

      <VStack flex={1} px="$10" pb="$16">
        <Center my="$24">
          <Logo />
          <Text color="$gray200" fontSize="$sm" mt="$1">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center gap="$2">
          <Heading color="$gray100">Acesse sua conta</Heading>
          <Input 
            placeholder="E-mail" 
            keyboardType="email-address"
            autoCapitalize="none" 
          />
          <Input placeholder="Senha" secureTextEntry />
        </Center>
      </VStack>
    </VStack>
  )
}