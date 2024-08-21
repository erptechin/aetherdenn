import React, { useEffect, useContext } from "react";
import { View } from "react-native";
import styles from "./styles";
import { MainContext } from '../../contexts/mainProvider'
import LottieView from "lottie-react-native";

export const Splash = ({ navigation }: any) => {
  const { settings } = useContext(MainContext)

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login')
    }, 2000);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: settings.mainBg }]}>
      <LottieView
        source={require("../../images/loader.json")}
        style={{ width: "100%", height: "100%" }}
        autoPlay
        loop
      />
    </View>
  );
};
