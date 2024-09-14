
import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundSignIn from "@assets/background.png";
import Logo from "@assets/logo.svg";

export function SignUp() {
  const { control, handleSubmit } = useForm();

  const navigationAuth = useNavigation<AuthNavigatorRoutesProps>();

  const handleBackToSignIn = () => {
    navigationAuth.navigate("signIn");
  }

  const handleSignUp = (data: any) => {
    console.log(data);
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

          <Center gap="$2">
            <Heading color="$gray100" mb="$4">Crie sua conta</Heading>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value }}) => (
                <Input 
                  placeholder="Nome" 
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

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
                />
              )}
            />

            <Controller 
              control={control}
              name="password"
              render={({field: { onChange, value }}) => (
                <Input 
                  placeholder="Senha" 
                  secureTextEntry 
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller 
              control={control}
              name="passwordConfirm"
              render={({field: { onChange, value }}) => (
                <Input 
                  placeholder="Confirme a senha" 
                  secureTextEntry 
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                />
              )}
            />

            <Button 
              title="Criar e acessar" 
              onPress={handleSubmit(handleSignUp)} 
            />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Button 
              title="Voltar para o login" 
              variant="outline" 
              onPress={handleBackToSignIn}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}