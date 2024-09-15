import { ScrollView, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Center, Heading, VStack, Text, useToast } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "@hooks/useAuth";

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ToastMessage } from "@components/ToastMessage";
import { ScreenHeader } from "@components/ScreenHeader";

import userPhotoDefault from "@assets/userPhotoDefault.png";

type ProfileProps = {
  avatar?: string;
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
}

const profileSchema = yup.object({
  userPhoto: yup.string(),
  name: yup.string().required("Informe seu nome"),
  email: yup.string().required("Informe seu e-mail").email("E-mail inválido"),
  oldPassword: yup.string().min(6, "A senha deve ter no mínimo 6 dígitos"),
  newPassword: yup.string().min(6, "A senha deve ter no mínimo 6 dígitos")
})

export function Profile() {
  const toast = useToast();
  const { user } = useAuth();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<ProfileProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      avatar: user?.avatar,
      name: user.name,
      email: user.email,
    }
  });

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
  
        setValue('avatar', photoURI);
      }
    } catch (error) {
      console.error("Erro ao selecionar nova foto", error); 
    }
  }

  const handleUpdateProfile = (data: ProfileProps) => {
    //TODO
    console.log(data);
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <Controller 
            control={control}
            name="avatar"
            render={({ field: { value }}) => (
              <UserPhoto
                source={value ? { uri: value } : userPhotoDefault}
                alt="Foto de perfil"
                size="xl"
              />
            )}
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
            <Controller 
              control={control}
              name="name"
              render={({ field: {onChange, value}}) => (
                <Input
                  placeholder="Seu nome"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name="email"
              render={({ field: {value}}) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  bg="$gray600"
                  isReadOnly
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
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
            <Controller
              control={control}
              name="oldPassword"
              render={({ field: { onChange, value }}) => (
                <Input 
                  placeholder="Senha antiga" 
                  secureTextEntry 
                  bg="$gray600" 
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.oldPassword?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name="newPassword"
              render={({ field: {onChange, value }}) => (
                <Input 
                  placeholder="Nova senha" 
                  secureTextEntry 
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value} 
                  errorMessage={errors.newPassword?.message}
                />
              )}
            />
          </Center>

          <Button 
            title="Atualizar" 
            onPress={handleSubmit(handleUpdateProfile)} 
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}