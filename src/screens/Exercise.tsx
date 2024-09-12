import { HStack, VStack, Box, Image, Heading, Text, Icon } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ArrowLeft } from "lucide-react-native";
import SeriesIcon from "@assets/series.svg";
import RepetitionsIcon from "@assets/repetitions.svg";
import BodyIcon from "@assets/body.svg";

import PuxadaFrontalImage from "@assets/thumbnail/puxada-frontal.png";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack justifyContent="space-between" alignItems="center" mt="$4" mb="$8">
          <Heading color="$gray100" fontFamily="$heading" fontSize="$lg" flexShrink={1}>
            Puxada Lateral
          </Heading>

          <HStack alignItems="center">
            <BodyIcon />
            <Text color="$gray200" ml="$1" textTransform="capitalize" fontFamily="$body" fontSize="$md">
              Ombro
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32}}>
        <VStack p="$8">
          <Image 
            source={PuxadaFrontalImage} 
            alt="Puxada Lateral" 
            mb="$3"
            resizeMode="cover"
            h="$80"
            w="$full"
            rounded="$lg"
          />

          <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
            <HStack justifyContent="space-around" alignItems="center" mb="$6" mt="$5">
              <HStack>
                <SeriesIcon />
                <Text color="$gray200" ml="$2">3 séries</Text>
              </HStack>

              <HStack>
                <RepetitionsIcon />
                <Text color="$gray200" ml="$2">12 repetições</Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado"></Button>
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}