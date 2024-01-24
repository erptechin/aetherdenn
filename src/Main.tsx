"use strict";
import React, { useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import Navigation from "./Navigation";
import ToastConfig from "./utility/toast";

import { config as defaultConfig, createConfig } from '@gluestack-ui/themed';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { View, StatusBar } from "react-native";
import { MainContext } from './contexts/mainProvider'

const Main = () => {
  const { settings } = useContext(MainContext)

  const config = createConfig({
    ...defaultConfig.theme,
    components: {
      Button: {
        theme: {
          variants: {
            variant: {
              solid: {
                bg: settings?.primary_color,
                borderRadius: 8,
              },
              link: {
                _text: {
                  color: settings?.primary_color,
                },
              },
            },
          },
        },
      },
      Input: {
        theme: {
          variants: {
            variant: {
              rounded: {
                borderRadius: 8,
              },
            },
          },
        },
      },
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <StatusBar
          animated={true}
          backgroundColor={settings?.header_color}
          barStyle={"light-content"}
          translucent
          hidden={false}
        />
        <Navigation />
      </GluestackUIProvider>
      <Toast config={ToastConfig} />
    </View>
  );
}

export default Main