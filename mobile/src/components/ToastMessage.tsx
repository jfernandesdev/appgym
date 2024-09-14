import { ToastDescription, ToastTitle, Toast, Pressable, VStack, Icon } from "@gluestack-ui/themed";
import { X } from "lucide-react-native";

type Props = {
  id: string;
  title: string;
  description?: string;
  action?: "error" | "success";
  onClose?: () => void;
  align?: 'center' | 'right' | 'left'; 
}

export function ToastMessage({id, title, description, action = "success", onClose, align = 'left'}: Props) {
  return (
    <Toast 
      nativeID={`toast-${id}`}
      action={action}
      bgColor={action === "success" ? "$green500" : "$red500"}
      mt="$16"
    >
      <VStack space="xs" w="$full">
        {onClose && (
          <Pressable alignSelf="flex-end" onPress={onClose}>
            <Icon as={X} color="$coolGray50" size="md"/>
          </Pressable>
        )}

        <ToastTitle color="$white" fontFamily="$heading" textAlign={align}>
          {title}
        </ToastTitle>

        { description && 
          <ToastDescription color="$white" fontFamily="$body">
            {description}
          </ToastDescription>
        }
      </VStack>
    </Toast>
  )
}