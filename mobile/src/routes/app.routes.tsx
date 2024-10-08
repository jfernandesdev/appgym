import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

import { gluestackUIConfig } from "@gluestack-ui";

import { Home } from "@screens/Home";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";
import { Exercise } from "@screens/Exercise";

import HomeIcon from "@assets/home.svg";
import HistoryIcon from "@assets/history.svg";
import ProfileIcon from "@assets/profile.svg";

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: {
    exerciseId: number;
  };
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["6"];

  return(
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: tokens.colors.green500,
      tabBarInactiveTintColor: tokens.colors.gray200,
      tabBarStyle: {
        backgroundColor: tokens.colors.gray600,
        borderTopWidth: 0,
        height: Platform.OS === "android" ? "auto": 96,
        paddingBottom: tokens.space["10"],
        paddingTop: tokens.space["6"]
      },
      tabBarItemStyle: {
        paddingVertical: tokens.space["2"],
      },
    }}>
      <Screen 
        name="home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color }) => <HomeIcon fill={color} width={iconSize} height={iconSize} />
        }}
      />
      <Screen 
        name="history" 
        component={History} 
        options={{
          tabBarIcon: ({ color }) => <HistoryIcon fill={color} width={iconSize} height={iconSize} />
        }}
      />
      <Screen 
        name="profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon fill={color} width={iconSize} height={iconSize} />
        }}
      />
      <Screen 
        name="exercise" 
        component={Exercise} 
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  )
}