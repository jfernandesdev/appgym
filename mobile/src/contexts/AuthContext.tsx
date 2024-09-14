import { createContext, ReactNode } from "react";

import { UserDto } from "@dtos/UserDto";

export type AuthContextDataProps = {
  user: UserDto;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Jeferson Fernandes',
        email: 'jfernandes.dev@gmail.com',
        avatar: 'https://github.com/jfernandesdev.png'
      }
    }}>
      { children }
    </AuthContext.Provider>
  )
}