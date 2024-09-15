import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Icon, Image, Text, VStack } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";

import { ExerciseDto } from "@dtos/ExerciseDto";

import { api } from "@services/api";

type Props = TouchableOpacityProps & {
  data: ExerciseDto;
};

export function ExerciseCard({ data, ...rest }: Props ) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="$gray500" rounded="$md" p="$2" mb="$3" alignItems="center">
        <Image 
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }} 
          alt="thumbnail do exercício"
          rounded="$md" 
          w="$16" 
          h="$16" 
          resizeMode="cover"
          bg="$gray400"
        />

        <VStack flex={1} ml="$4">
          <Heading 
            color="$white" 
            fontSize="$md" 
            fontFamily="$heading"
            numberOfLines={1}
          >
            {data.name}
          </Heading>
          <Text 
            color="$gray200" 
            fontSize="$sm" 
            fontFamily="$body"
            mt="$1" 
            numberOfLines={2}
          >
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>
        <Icon as={ChevronRight} color="$gray300" size="xl" />
      </HStack>
    </TouchableOpacity>
  )
}