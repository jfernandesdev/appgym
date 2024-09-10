import { Center, VStack } from "@gluestack-ui/themed";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <Center py="$8">
        <UserPhoto 
          source={{ uri: "https://github.com/jfernandesdev.png" }} alt="Foto de perfil"
          w="$40"
          h="$40" 
        />

      </Center>
    </VStack>
  )
}