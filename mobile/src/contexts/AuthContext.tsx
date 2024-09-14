import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";

import { api } from "@services/api";
import { storageUserSave, storageUserGet } from "@storage/storageUser";

import { UserDto } from "@dtos/UserDto";

export type AuthContextDataProps = {
  user: UserDto;
  setUser: (user: UserDto) => void;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDto>({} as UserDto);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password });
  
      if(data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  const loadUserData = async () => {
    try {
      const userLogged = await storageUserGet();
  
      if(userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ 
        user, 
        setUser, 
        signIn,
        isLoadingUserStorageData 
      }}>
      { children }
    </AuthContext.Provider>
  )
}