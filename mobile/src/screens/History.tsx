import { useState, useCallback } from "react";
import { SectionList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, Text, VStack, useToast } from "@gluestack-ui/themed";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ToastMessage } from "@components/ToastMessage";

import { api } from "@services/api";

import { HistoryByDayDto } from "@dtos/HistoryByDayDto";

import { AppError } from "@utils/AppError";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDto[]>([]);
 
  const toast = useToast();

  const fetchHistory = async () => {
    try {
      setIsLoading(true);

      const response = await api.get('history');
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar o histórico de exercícios.";

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
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory();
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? <Loading /> : (
        <SectionList
          sections={exercises}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <HistoryCard data={item} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Heading color="$gray200" fontSize="$md" mb="$3" mt="$10" fontFamily="$heading">
              {title}
            </Heading>
          )}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 32 }}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Text color="$gray300" textAlign="center" fontFamily="$body" fontSize="$md">
              Não há exercícios registrados ainda. {"\n"} Vamos fazer exercícios hoje?
            </Text>
          )}
        />
      )}
    </VStack>
  )
}