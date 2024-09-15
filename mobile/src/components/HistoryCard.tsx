import { HistoryDto } from "@dtos/HistoryDto";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

type HistoryCardProps = {
  data: HistoryDto;
}

export function HistoryCard({ data }: HistoryCardProps) {

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
      <VStack flex={1} mr="$5">
        <Heading 
          color="$white" 
          fontSize="$md" 
          fontFamily="$heading" 
          textTransform="capitalize"
          numberOfLines={1}
        >
          {data.name}
        </Heading>

        <Text color="$gray200" fontSize="$sm" fontFamily="$body" numberOfLines={1} textTransform="capitalize">
          {data.group}
        </Text>
      </VStack>

      <Text color="$gray300" fontSize="$sm" fontFamily="$body">
        {data.hour}
      </Text>
    </HStack>
  )
}