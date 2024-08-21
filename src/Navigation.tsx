import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainContext } from './contexts/mainProvider'
import {
  Splash,
  Login,
  Home,
  Locations,
  MultiTag,
  SingleTag,
  Update
} from "./screens";

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Locations" component={Locations} />
      <Stack.Screen name="MultiTag" component={MultiTag} />
      <Stack.Screen name="SingleTag" component={SingleTag} />
      <Stack.Screen name="Update" component={Update} />
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
