import { ComponentProps } from "react";
import { 
  Input as GluestackInput, 
  InputField, 
  FormControl, 
  FormControlError, 
  FormControlErrorText 
} from "@gluestack-ui/themed";

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean;
  errorMessage?: string | null;
  isInvalid?: boolean;
};

export function Input({ isReadOnly = false, isInvalid = false, errorMessage = null, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} w="$full" mb="$1">
      <GluestackInput
        isInvalid={isInvalid}
        h="$14" 
        borderWidth="$0" 
        borderRadius="$md"
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$red500" : "$green500"
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: "$red500"
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField
          bg="$gray700" 
          px="$4"  
          color="$white"
          fontFamily="$body"
          placeholderTextColor="$gray300"
          {...rest}
        />
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color="$red400" fontSize="$xs" fontFamily="$body" marginLeft="auto">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}