import { SectionList } from "react-native";
import { Heading, Text, VStack } from "@gluestack-ui/themed";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard, IHistoryItem } from "@components/HistoryCard";

import { groupHistory } from "@services/groupHistory";

import { history } from "@storage/mock-history";

export function History() {
  const sections =  groupHistory(history);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
    
      <SectionList 
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <HistoryCard {...item} />
        )}
        renderSectionHeader={({ section: { title}}) => (
          <Heading color="$gray200" fontSize="$md" mb="$3" mt="$10" fontFamily="$heading">
            {title}
          </Heading>
        )}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          sections.length === 0 && { flex: 1, justifyContent: 'center'}
        }
        ListEmptyComponent={() => (
          <Text color="$gray300" textAlign="center" fontFamily="$body" fontSize="$md">
            Não há exercícios registrados ainda. {"\n"} Vamos fazer exercícios hoje?
          </Text>
        )}
      />  
    </VStack>
  )
}