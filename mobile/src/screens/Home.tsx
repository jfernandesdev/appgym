import { useState, useEffect, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Heading, HStack, Text, useToast, VStack } from "@gluestack-ui/themed";

import { HomeHeader } from "@components/HomeHeader";
import { MuscleGroup } from "@components/MuscleGroup";
import { ExerciseCard } from "@components/ExerciseCard";
import { ToastMessage } from "@components/ToastMessage";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import { data } from "../storage/mock-data";
import { ExerciseDto } from "@dtos/ExerciseDto";

export function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [groupSelected, setGroupSelected] = useState<string | null>(null);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  const handleOpenExerciseDetails = () => {
    navigation.navigate("exercise")
  }

  const fetchGroups = async () => {
    try {
      const response = await api.get('/groups');
      
      if(response.data) {
        setGroups(response.data);
        const firstGroup = response.data[0];
        setGroupSelected(firstGroup);
      }

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar os grupos musculares.";

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
    }
  }

  const fetchExercisesByGroup = async () => {
    try {
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      if (response.data) {
        setExercises(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar os exercícios.";

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
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup();
  }, [groupSelected]));

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <MuscleGroup
            label={item}
            isActive={groupSelected?.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      <VStack px="$8" mb="$4">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">Exercícios</Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">{exercises ? exercises.length : 0}</Text>
        </HStack>
      </VStack>

      <VStack px="$8" flex={1}>
        <FlatList 
          data={exercises}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ExerciseCard 
              data={item}
              onPress={handleOpenExerciseDetails}
            />   
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}