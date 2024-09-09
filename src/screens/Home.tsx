import { useState } from "react";
import { HStack, VStack } from "@gluestack-ui/themed";

import { HomeHeader } from "@components/HomeHeader";
import { MuscleGroup } from "@components/MuscleGroup";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("costa");

  return (
    <VStack flex={1}>
      <HomeHeader />

      <HStack gap="$3">
        <MuscleGroup 
          label="Costa" 
          isActive={groupSelected === "costa"}
          onPress={() => setGroupSelected("costa")}
        />

        <MuscleGroup
          label="Ombro"
          isActive={groupSelected === "ombro"}
          onPress={() => setGroupSelected("ombro")}
        />
      </HStack>
    </VStack>
  )
}