import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Icon, Image, Text, VStack } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";

import thumbnailPuxada from "@assets/thumbnail/puxada-frontal.png";

type Props = TouchableOpacityProps & {
  thumbnail: string;
  title: string;
  description: string;
};

export function ExerciseCard({ thumbnail, title, description, ...rest }: Props ) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="$gray500" rounded="$md" p="$2" mb="$3" alignItems="center">
        {thumbnail && 
          <Image 
            source={thumbnail} 
            alt="thumbnail do exercício"
            rounded="$md" 
            w="$16" 
            h="$16" 
            resizeMode="cover"
            bg="$gray400"
          />
        }

        <VStack flex={1} ml="$4">
          <Heading 
            color="$white" 
            fontSize="$md" 
            fontFamily="$heading"
          >
            {title}
          </Heading>
          <Text 
            color="$gray200" 
            fontSize="$sm" 
            fontFamily="$body"
            mt="$1" 
            numberOfLines={2}
          >
            {description}
          </Text>
        </VStack>
        <Icon as={ChevronRight} color="$gray300" size="xl" />
      </HStack>
    </TouchableOpacity>
  )
}