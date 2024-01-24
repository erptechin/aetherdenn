import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainContext } from './contexts/mainProvider'
import { TabBar } from "./components";
import {
  Splash,
  AddProduct,
  Profile
} from "./screens";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: true }}
      tabBar={(props: any) => <TabBar {...props} />}
    >
      <Tab.Screen name="Product" component={AddProduct} />
      <Tab.Screen name="Bucket" component={Profile} />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={BottomTabs} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const { settings } = useContext(MainContext)
  return (
    <NavigationContainer theme={{
      colors: {
        background: settings.header_color,
      },
    }}>
      <MainStack />
    </NavigationContainer>
  );
}
