import { useState } from "react";
import { FlatList } from "react-native";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

import { HomeHeader } from "@components/HomeHeader";
import { MuscleGroup } from "@components/MuscleGroup";
import { ExerciseCard } from "@components/ExerciseCard";

import { data } from "../storage/mock-data";

export function Home() {
  const [groups, setGroups] = useState(["Costas", "Peitoral", "Bíceps", "Tríceps", "Pernas", "Ombro"]);
  const [groupSelected, setGroupSelected] = useState("Costas");

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <MuscleGroup
            label={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
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
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">{data ? data.length : 0}</Text>
        </HStack>
      </VStack>

      <VStack px="$8" flex={1}>
        <FlatList 
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciseCard 
              thumbnail={item.thumbnail} 
              title={item.title} 
              description={item.description} 
            />   
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}