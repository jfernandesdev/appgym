import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import BackgroundSignIn from "@assets/background.png";
import Logo from "@assets/logo.svg";


export function SignUp() {
  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="$gray700">
        <Image 
          source={BackgroundSignIn} 
          defaultSource={BackgroundSignIn}
          alt="Pessoas treinando" 
          w="$full"
          h={550}
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
            <Heading color="$gray100" mb="$4">Crie sua conta</Heading>
            <Input placeholder="Nome" />
            <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none"  />
            <Input placeholder="Senha" secureTextEntry />
            <Input placeholder="Confirme a senha" secureTextEntry />
            <Button title="Criar e acessar" />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Button title="Voltar para o login" variant="outline" />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}