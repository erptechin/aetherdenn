import React, { useEffect, useRef, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import { MainContext } from '../../contexts/mainProvider'
import { darkenColor } from "../../utility/storage";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const TAB_BAR_WIDTH = width / 2;
const ANIMATED_PART_HEIGHT = 5;

const TabBar = ({ state, descriptors, navigation }: any) => {
  const { settings } = useContext(MainContext)
  const animationHorizontalValue = useRef(new Animated.Value(0)).current;

  const animate = (index: any) => {
    Animated.spring(animationHorizontalValue, {
      toValue: index * TAB_BAR_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate(state.index);
  }, [state.index]);

  return (
    <View style={[styles.container, {
      backgroundColor: settings.footer_color,
      borderTopColor: darkenColor(settings.footer_color, 20),
    }]}>
      <Animated.View style={styles.animatedWrapper}>
        <Animated.View
          style={[
            styles.animatedView,
            {
              backgroundColor: settings.primary_color,
              transform: [{ translateX: animationHorizontalValue }],
            },
          ]}
        />
      </Animated.View>
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableWithoutFeedback
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              key={`${index}--${route.key}`}>
              <View style={styles.innerView}>
                {/* <AntDesign name={iconsList[label]} size={25} color={isFocused ? settings.primary_color : settings.white} /> */}
                <Text style={{ fontSize: 12, color: (isFocused ? settings.primary_color : settings.white) }}>{label}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderTopWidth: 0,
  },
  tabButton: {
    flex: 1,
  },
  innerView: {
    paddingVertical: 15,
    width: TAB_BAR_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconText: {
    width: TAB_BAR_WIDTH,
    textAlign: 'center',
  },
  animatedView: {
    width: TAB_BAR_WIDTH,
    height: ANIMATED_PART_HEIGHT,
  },
  animatedWrapper: {
    width: TAB_BAR_WIDTH,
    alignItems: 'center',
    marginTop: -1,
    justifyContent: 'center',
  },
});

export default TabBar;
