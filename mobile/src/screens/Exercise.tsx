import { useState, useEffect } from "react";
import { HStack, VStack, Box, Image, Heading, Text, Icon, useToast } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";

import { api } from "@services/api";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ExerciseDto } from "@dtos/ExerciseDto";

import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { ToastMessage } from "@components/ToastMessage";

import { AppError } from "@utils/AppError";

import SeriesIcon from "@assets/series.svg";
import RepetitionsIcon from "@assets/repetitions.svg";
import BodyIcon from "@assets/body.svg";

type RouteParamsProps =  {
  exerciseId: number;
}

export function Exercise() {
  const [exerciseSelected, setExerciseSelected] = useState<ExerciseDto>({} as ExerciseDto);
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();
  const routes = useRoute();

  const { exerciseId } = routes.params as RouteParamsProps;

  const handleGoBack = () => {
    navigation.goBack();
  }

  const fetchExercisesDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`exercises/${exerciseId}`);
      if(response.data) {
        setExerciseSelected(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível buscar detalhes do exercício.";

      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        )
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleExerciseHistoryRegister = async () => {
    try {
      setSendingRegister(true);
      await api.post('/history', { exercise_id: exerciseId });
    
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Parabéns! Exercício marcado como feito!"
            align="center"
          />
        )
      });

      navigation.navigate('history');

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível registrar o exercício.";

      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            align="center"
          />
        )
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExercisesDetails();
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack justifyContent="space-between" alignItems="center" mt="$4" mb="$8">
          <Heading color="$gray100" fontFamily="$heading" fontSize="$lg" flexShrink={1}>
            {exerciseSelected.name}
          </Heading>

          <HStack alignItems="center">
            <BodyIcon />
            <Text color="$gray200" ml="$1" textTransform="capitalize" fontFamily="$body" fontSize="$md">
              {exerciseSelected.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? <Loading /> : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32}}>
          <VStack p="$8">
            <Box rounded="$lg" mb="$3" overflow="hidden">
              <Image 
                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exerciseSelected.demo}` }} 
                alt="Puxada Lateral" 
                resizeMode="cover"
                h="$80"
                w="$full"
                rounded="$lg"
              />
            </Box>

            <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
              <HStack justifyContent="space-around" alignItems="center" mb="$6" mt="$5">
                <HStack>
                  <SeriesIcon />
                  <Text color="$gray200" ml="$2">{exerciseSelected.series} séries</Text>
                </HStack>

                <HStack>
                  <RepetitionsIcon />
                  <Text color="$gray200" ml="$2">{exerciseSelected.repetitions} repetições</Text>
                </HStack>
              </HStack>

              <Button 
                title="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              ></Button>
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}