import { ScrollView, TouchableOpacity } from "react-native";
import { Center, Heading, VStack, Text } from "@gluestack-ui/themed";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: "https://github.com/jfernandesdev.png" }}
            alt="Foto de perfil"
            size="xl"
          />

          <TouchableOpacity>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            > Alterar Foto</Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Input
              placeholder="Seu nome"
              bg="$gray600"
            />

            <Input
              placeholder="E-mail"
              value="jfernandes.dev@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              bg="$gray600"
              isReadOnly
            />
          </Center>

          <Heading 
            alignSelf="flex-start" 
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md" 
            mt="$8"
            mb="$2"
          >
            Alterar senha
          </Heading>

          <Center w="$full" gap="$4" mb="$8">
            <Input 
              placeholder="Senha antiga" 
              secureTextEntry 
              bg="$gray600" 
            />
            <Input 
              placeholder="Nova senha" 
              secureTextEntry 
              bg="$gray600" 
            />
          </Center>

          <Button title="Atualizar" />
        </Center>
      </ScrollView>
    </VStack>
  )
}