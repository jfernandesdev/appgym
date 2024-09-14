import { useState } from "react";
import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "@gluestack-ui/themed";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { AppError } from "@utils/AppError";

import BackgroundSignIn from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { ToastMessage } from "@components/ToastMessage";

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required("Informe seu e-mail").email("E-mail inválido"),
  password: yup.string().required("Informe sua senha").min(6, "A senha deve ter no mínimo 6 dígitos")
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  const navigationAuth = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuth();
  const toast = useToast();

  const handleNewAccount = () => {
    navigationAuth.navigate("signUp");
  }

  const handleSignIn = async ({ email, password }: FormDataProps) => {
    try {
      setIsLoading(true);
      await signIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente.";

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

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image 
          source={BackgroundSignIn} 
          defaultSource={BackgroundSignIn}
          alt="Pessoas treinando" 
          w="$full"
          h={550}
          position="absolute"
        />

        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />
            <Text color="$gray200" fontSize="$sm" mt="$1">
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center gap="$2" mt="$4">
            <Heading color="$gray100" mb="$4">Acesse sua conta</Heading>

            <Controller 
              control={control}
              name="email"
              render={({field : { onChange, value }}) => (
                <Input 
                  placeholder="E-mail" 
                  keyboardType="email-address" 
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
              />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value }}) => (
                <Input 
                  placeholder="Senha" 
                  secureTextEntry 
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button 
              title="Acessar" 
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text 
              color="$gray100" 
              fontSize="$sm"
              mb="$3"
              fontFamily="$body"
            >Ainda não tem acesso?</Text>
            <Button 
              title="Criar conta" 
              variant="outline" 
              onPress={handleNewAccount} 
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}