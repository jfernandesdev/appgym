import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

export interface IHistoryItem {
  id: string;
  category: string;
  description: string;
  date: string;
  hour: string;
};

export function HistoryCard(data: IHistoryItem) {
  const { category, description, hour } = data;
  
  return (
    <HStack
      w="$full"
      bg="$gray600"
      px="$5"
      py="$4"
      mb="$3"
      rounded="$md"
      justifyContent="space-between"
      alignItems="center"
    >
      <VStack>
        <Heading 
          color="$white" 
          fontSize="$md" 
          fontFamily="$heading" 
          textTransform="capitalize"
        >
          {category}
        </Heading>

        <Text color="$gray200" fontSize="$sm" fontFamily="$body" numberOfLines={1}>
          {description}
        </Text>
      </VStack>

      <Text color="$gray300" fontSize="$sm" fontFamily="$body">
        {hour}
      </Text>
    </HStack>
  )
}