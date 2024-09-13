import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Center, Heading, VStack, Text, useToast } from "@gluestack-ui/themed";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToastMessage";

export function Profile() {
  const [userPhoto, setUserPhoto] = useState("https://github.com/jfernandesdev.png");

  const toast = useToast();

  const handleUserPhotoSelect = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4,4],
        allowsEditing: true
      });
  
      if(photoSelected.canceled) {
        return;
      }
  
      const photoURI = photoSelected.assets[0].uri;
  
      if (photoURI) {
        const photoInfo = await FileSystem.getInfoAsync(photoURI) as { size: number};
  
        // Restrição de fotos maiores que 5MB
        if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage 
                id={id} 
                action="error"
                title="Image muito grande!" 
                description="Por favor selecione outra de até 5MB"  
                onClose={() => toast.close(id)} 
              />
            )
          });
        }
  
        setUserPhoto(photoURI);
      }
    } catch (error) {
      console.error("Erro ao selecionar nova foto", error); 
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto de perfil"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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