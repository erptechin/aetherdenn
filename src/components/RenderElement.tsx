import React, { useState, useRef } from "react";
import Color from "../common/Color";
import {
  ScrollView,
  Platform,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { Box, Button, View, Text } from "@gluestack-ui/themed";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";
import { darkenColor } from "../utility/storage";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const HEIGHT = 40;
export const Mode = { normal: "normal", full: "full", overlay: "overlay" };
const SIZES = { SMALL: "small", LARGE: "large" };

export function Mainheader({ base, right }: any) {
  const { settings }: any = useTheme();
  if (base) {
    return (
      <View style={{
        paddingTop: Platform.OS == "ios" ? 38 : 0,
        height: Platform.OS == "ios" ? 80 : 60,
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: settings.header_color,
        borderBottomWidth: 0,
        borderBottomColor: darkenColor(settings.header_color, 20),
      }}>
        <View><Image
          source={{ uri: "Config.REACT_APP_BASE_URL" + settings?.site_logo }}
          style={{ height: 35, width: 35 }}
        /></View>
      </View>
    );
  }
  if (right) {
    return (
      <View style={{
        paddingTop: Platform.OS == "ios" ? 38 : 0,
        height: Platform.OS == "ios" ? 80 : 60,
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: settings.header_color,
        borderBottomWidth: 0,
        borderBottomColor: darkenColor(settings.header_color, 20),
      }}>
        <View style={{ paddingLeft: 10, paddingTop: 5 }}><Entypo name="chevron-left" size={30} color={Color.white} /></View>
        <View><Image
          source={{ uri: "Config.REACT_APP_BASE_URL" + settings?.site_logo }}
          style={{ height: 35, width: 35 }}
        /></View>
        <View style={{ paddingRight: 10, paddingTop: 5 }}><Text>dd</Text></View>
      </View>
    );
  }
  return (
    <View style={{
      paddingTop: Platform.OS == "ios" ? 38 : 0,
      height: Platform.OS == "ios" ? 80 : 60,
      flexDirection: 'row',
      justifyContent: "space-between",
      backgroundColor: settings.header_color,
      borderBottomWidth: 0,
      borderBottomColor: darkenColor(settings.header_color, 20),
    }}>
      <View style={{ paddingLeft: 10, paddingTop: 5 }}><Entypo name="chevron-left" size={30} color={Color.white} /></View>
      <View><Image
        source={{ uri: " Config.REACT_APP_BASE_URL" + settings?.site_logo }}
        style={{ height: 35, width: 35 }}
      /></View>
      <View style={{ paddingRight: 10, paddingTop: 5 }}><Text style={{ color: settings.header_color }}>...</Text></View>
    </View>
  );
}

export function GradientWapper({
  style = {},
  refreshing = false,
  onRefresh = null,
  children,
}: any) {
  const { settings }: any = useTheme();
  return (
    <LinearGradient
      colors={[settings.black, settings.gradientBottom]}
      locations={[0.3, 1]}
      style={[styles.mainWapper, style]}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {children}
      </ScrollView>
    </LinearGradient>
  );
}

export function MainWapper({
  style = {},
  refreshing = false,
  onRefresh = null,
  children,
}: any) {
  return (
    <Box
      bg="$white"
      style={[{ flex: 1 }, style]}
      borderTopLeftRadius={20}
      borderTopRightRadius={20}
      p={10}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {children}
      </ScrollView>
    </Box>
  );
}

export function FormWapper({ style = {}, dark = false, children }: any) {
  return (
    <Box
      bg="$white"
      style={[{ flex: 1 }, style]}
      borderTopLeftRadius={20}
      borderTopRightRadius={20}
      pt={20}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
        style={styles.formWapper}
      >
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );

}

export function CustomBox(props: any) {
  return (
    <Box
      borderColor="$borderLight200"
      borderRadius="$lg"
      borderWidth="$1"
      mx="$1"
      bg={props.bg ?? "$white"}
      {...props}
      style={{
        shadowColor: '#CBCBCB', // Shadow color
        shadowOffset: { width: 1, height: 1 }, // Shadow offset
        shadowOpacity: 0.5, // Shadow opacity
        shadowRadius: 20, // Shadow radius
        elevation: 5, // Elevation for Android (if needed)
      }}
    >
      <Box overflow="hidden" borderRadius="$lg">
        {props.children}
      </Box>
    </Box>
  );
}

export const ScreenOptions = ({ navigation }: any) => {
  const { settings }: any = useTheme();
  return ({
    headerStyle: {
      backgroundColor: settings.header_color,
      shadowColor: darkenColor(settings.header_color, 15),
      elevation: 3,
    },
    headerTitleAlign: "center",
    headerTitle: () => (
      <Image
        source={{ uri: "Config.REACT_APP_BASE_URL" + settings?.site_logo }}
        style={{ height: 35, width: 35, marginBottom: 7 }}
      />
    ),
    // headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
  })
};


export function Spinner({ size, mode }: any) {
  let containerStyle: any = styles.container;
  switch (mode) {
    case Mode.full:
      containerStyle = styles.container_full_stretch;
      break;
    case Mode.overlay:
      containerStyle = styles.container_overlay;
      break;
  }
  return (
    <View style={containerStyle}>
      <ActivityIndicator
        size={size}
        color={Color.primary_color}
        style={[
          styles.wrapper,
          { borderRadius: size == SIZES.SMALL ? 10 : 20 },
        ]}
      />
    </View>
  );
}

export function Slides({ data = [], randerElement = null }: any) {
  let scrollViewRef: any = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleDotPress = (index: any) => {
    setActiveIndex(index);
    scrollViewRef.current.scrollTo({ x: index * width, y: 0, animated: true });
  };

  return (
    <><ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      decelerationRate="fast"
      snapToInterval={width}
      showsHorizontalScrollIndicator={false}
      onScroll={event => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / width);
        setActiveIndex(index);
      }}
      scrollEventThrottle={16}>
      {data.map((item: any, key: any) => <View style={{ width }}>{randerElement(item, key)}</View>)}
    </ScrollView>
      <View style={styles.dotContainer}>
        {data.map((slide: any, index: any) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
            onPress={() => handleDotPress(index)}
          />
        ))}
      </View></>
  );
}

const styles = StyleSheet.create({
  mainWapper: {
    position: "relative",
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    boxShadow: "0px 0px 10px 1px rgba(203, 203, 203, 0.25)",
    backgroundColor: Color.white,
  },
  formWapper: {
    position: "relative",
    flex: 1,
    padding: 15,
    backgroundColor: Color.white,
  },
  container: {
    flex: 1,
    height: HEIGHT,
  },
  container_full_stretch: {
    flexGrow: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  container_overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0)",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    backgroundColor: "transparent",
    zIndex: 100,
  },
  header: { height: 40, backgroundColor: Color.renderone },
  headerText: { textAlign: "center", fontWeight: "bold" },
  rowText: { textAlign: "center" },
  border: { borderWidth: 1, borderColor: Color.rendertwo },
  dotContainer: {
    flexDirection: 'row',
    padding: 10
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: Color.grey,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Color.primary_color,
  },
});
