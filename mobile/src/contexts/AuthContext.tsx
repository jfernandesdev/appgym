import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";

import { api } from "@services/api";

import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken";
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";

import { UserDto } from "@dtos/UserDto";

export type AuthContextDataProps = {
  user: UserDto;
  updateUserProfile: (userUpdated: UserDto) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
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
      setIsLoadingUserStorageData(true);
      const { data } = await api.post('/sessions', { email, password });
  
      if(data.user && data.token && data.refresh_token) {
        await storageUserSave(data.user);
        await storageAuthTokenSave({token: data.token, refresh_token: data.refresh_token});

        updateUserAndToken(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);

      setUser({} as UserDto);
      await storageUserRemove();
      await storageAuthTokenRemove();
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const updateUserProfile = async (userUpdated: UserDto) => {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true);
      
      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();
  
      if (userLogged && token) {
        updateUserAndToken(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const updateUserAndToken = (userData: UserDto, token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    }
  }, [signOut]);

  return (
    <AuthContext.Provider value={{ 
        user, 
        updateUserProfile, 
        signIn,
        signOut,
        isLoadingUserStorageData 
      }}>
      { children }
    </AuthContext.Provider>
  )
}