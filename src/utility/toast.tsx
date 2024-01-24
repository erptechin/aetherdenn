import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View } from 'react-native';
import Color from "../common/Color";

const ToastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: Color.primary_color, borderLeftColor: Color.primaryBgColor }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: Color.black,
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: Color.error }}
      contentContainerStyle={{
        backgroundColor: Color.errorBg,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
      }}
      text1Style={{
        fontSize: 12,
        color: Color.background,
      }}
      text1NumberOfLines={3}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  // for custom toast message
  tomatoToast: () => (
    <View style={{ height: 60, width: '100%', backgroundColor: Color.primaryBgColor }}>
    </View>
  ),
};

export default ToastConfig;
