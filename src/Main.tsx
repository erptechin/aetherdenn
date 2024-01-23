"use strict";
import React, { useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import Navigation from "./Navigation";
import Notification from "./Notification";
import ToastConfig from "./utility/toast";

import { config as defaultConfig, createConfig } from '@gluestack-ui/themed';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { View, StatusBar } from "react-native";
import { MainContext } from './contexts/mainProvider'
import LottieView from "lottie-react-native";
import { useFetchSingleDocType } from './contexts';

const resource = "Hospital Settings"

const Main = () => {
  const { settings, setSettings } = useContext(MainContext)
  const { data } = useFetchSingleDocType({ resource, whitelist: true });

  useEffect(() => {
    setSettings(data);
  }, [data]);

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
    <View style={{flex:1}}>
      {data ?
        <GluestackUIProvider config={config}>
          <StatusBar
            animated={true}
            backgroundColor={settings?.header_color}
            barStyle={"light-content"}
            translucent
            hidden={false}
          />
          <Navigation />
        </GluestackUIProvider> : <View style={{ flex: 1, alignItems: "center" }}><LottieView
          source={require("./images/loader.json")}
          style={{ width: "80%", height: "80%", marginTop: "20%" }}
          autoPlay
          loop
        /></View>}
      <Notification />
      <Toast config={ToastConfig} />
    </View>
  );
}

export default Main