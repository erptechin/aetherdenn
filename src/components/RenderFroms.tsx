import React, { useRef, useState, useContext } from "react";
import Color from "../common/Color";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  Heading,
  View,
  Text,
  Input,
  InputField,
  InputIcon,
  Textarea,
  Select,
  CheckIcon,
  Checkbox,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
  CircleIcon,
  HStack,
  Radio,
  Slider,
  Popover,
  Button,
  ButtonText,
  ButtonSpinner
} from "@gluestack-ui/themed";
import { Field, FieldArray } from "formik";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MainContext } from '../contexts/mainProvider'
import { darkenColor } from "../utility/storage";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export function Buttons(props: any) {
  const { labels, settings } = useContext(MainContext)
  if (props.isNotFixed) {
    return (
      <Button
        variant="solid"
        size="lg"
        my={"$3"}
        {...props}
      >
        {props.isLoading && (<ButtonSpinner mr="$1" />)}
        <ButtonText>{props.isLoading ? 'Updating' : props.name}</ButtonText>
      </Button>
    );
  }
  return (
    <View
      backgroundColor={settings.footer_color}
      p="$2"
      borderTopColor={settings.footer_color}
    >
      <Button
        variant="solid"
        my={"$3"}
        {...props}
      >
        {props.isLoading && (<ButtonSpinner mr="$1" />)}
        <ButtonText>{props.name}</ButtonText>
      </Button>
    </View>
  );
}

export function InputBox(props: any) {
  return (
    <View style={{ marginTop: 10 }}>
      <Field name={props.name}>
        {({ field, form, meta }: any) => {
          return <>
            {props.lable && <View flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Text size="md" m="$1">
                {props.lable} <Text color="$red">{form?.errors && "*"}</Text>
              </Text>
            </View>}
            <Input variant="rounded" size="md" borderColor={
              form?.errors[props.name] && form?.touched[props.name]
                ? '$red300'
                : '$light300'
            }>
              <InputField
                placeholder={props.placeholder}
                value={field.value}
                {...props}
              />
            </Input>
            {form?.errors[props.name] && form?.touched[props.name] && (
              <Text color="$red" size="sm" mt="$1">{form.errors[props.name]}</Text>
            )}
          </>
        }}
      </Field>
    </View>
  );
}

export function PasswordBox(props: any) {
  const { settings } = useContext(MainContext)
  const [show, setShow] = useState(false);
  return (
    <View style={{ marginTop: 10 }}>
      <Field name={props.name}>
        {({ field, form, meta }: any) => {
          return <>
            <View flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Text size="md" m="$1">
                {props.placeholder} <Text color="$red">{form?.errors && "*"}</Text>
              </Text>
              <Text size="sm" color="$light400">
                8 CHARACTERS MIN.
              </Text>
            </View>
            <Input variant="rounded" size="md" borderColor={
              form?.errors[props.name] && form?.touched[props.name]
                ? '$red300'
                : '$light300'
            }>
              <InputField
                secureTextEntry={show ? false : true}
                placeholder={props.placeholder}
                value={field.value}
                {...props}
              />
              <Button
                onPress={() => setShow(!show)}
              >
                {show ? (
                  <Ionicons name="eye-off-outline" size={20} color={settings.white} />
                ) : (
                  <Ionicons name="eye-outline" size={20} color={settings.white} />
                )}
              </Button>
            </Input>
            {form?.errors[props.name] && form?.touched[props.name] && (
              <Text color="$red" size="sm" mt="$1">{form.errors[props.name]}</Text>
            )}
          </>
        }}
      </Field>
    </View>
  );
}

export function TextAreaBox(props: any) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text m="$1">{props.placeholder}</Text>
      <Field name={props.name}>
        {({ field, form }: any) => {
          return (
            <>
              <Textarea {...props} value={field.value} />
              {form?.errors[props.name] && form?.touched[props.name] && (
                <Text m="$1" style={{ color: Color.red }}>
                  {form.errors[props.name]}
                </Text>
              )}
            </>
          );
        }}
      </Field>
    </View>
  );
}

export function CheckboxBox(props: any) {
  return (
    <View style={{ marginTop: 10 }}>
      {props.placeholder && <Text m="$1">{props.placeholder}</Text>}
      <Field name={props.name}>
        {({ field, form }: any) => {
          return (
            <>
              <Checkbox
                size="lg"
                value={field.value}
                isChecked={field.value}
                style={{ borderColor: field.value ? Color.primary_color : Color.deepgray }}
                isInvalid={
                  form?.errors[props.name] && form?.touched[props.name]
                }
                onChange={(value) => {
                  form.setFieldValue(props.name, value);
                }}
                {...props}
              >
                {props.lable}
              </Checkbox>
              {form?.errors[props.name] && form?.touched[props.name] && (
                <Text m="$1" style={{ color: Color.red }}>
                  {form.errors[props.name]}
                </Text>
              )}
            </>
          );
        }}
      </Field>
    </View>
  );
}

export function RadioBox(props: any) {
  return (
    <View style={{ marginTop: 10 }}>
      <Field name={props.name}>
        {({ field, form }: any) => {
          return (
            <>
              <View flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Text size="md" m="$1">
                  {props.placeholder} <Text color="$red">{form?.errors && "*"}</Text>
                </Text>
              </View>
              <RadioGroup value={field.value}
                onChange={(value) => {
                  field.onChange(props.name)(value);
                }}>
                <HStack mt="$1" space="2xl">
                  {props.data.map((item: any, key: any) => (
                    <Radio value={item}>
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>{item}</RadioLabel>
                    </Radio>
                  ))}
                </HStack>
              </RadioGroup>
              {form?.errors[props.name] && form?.touched[props.name] && (
                <Text color="$red" size="sm" mt="$1">{form.errors[props.name]}</Text>
              )}
            </>
          );
        }}
      </Field>
    </View>
  );
}


export function FileUploads(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ marginTop: 10 }}>
      {props.placeholder && <Text m="1">{props.placeholder}</Text>}
      <Field name={props.name}>
        {({ field, form }: any) => {
          const options: any = {
            mediaType: "photo",
            quality: 1,
          };

          const handleSelectFromCamera = async () => {
            try {
              setLoading(true);
              setIsOpen(false);
              const res: any = await launchCamera(options);
              // const response: any = await SiteApis.uploadImgApi(
              //   { ...res.assets[0], name: res.assets[0].fileName },
              //   ""
              // );
              // if (response) field.onChange(props.name)(response);
              setLoading(false);
            } catch (err) {
              setLoading(false);
              if (DocumentPicker.isCancel(err)) {
                Toast.show({
                  type: "error",
                  text1: "User cancelled.",
                });
              } else {
                Toast.show({ type: "error", text1: JSON.stringify(err) });
              }
            }
          };

          const handleSelectFromLibrary = async () => {
            try {
              setLoading(true);
              setIsOpen(false);
              const res: any = await launchImageLibrary(options);
              // const response: any = await SiteApis.uploadImgApi(
              //   { ...res.assets[0], name: res.assets[0].fileName },
              //   ""
              // );
              // if (response) field.onChange(props.name)(response);
              setLoading(false);
            } catch (err) {
              setLoading(false);
              if (DocumentPicker.isCancel(err)) {
                Toast.show({
                  type: "error",
                  text1: "User cancelled.",
                });
              } else {
                Toast.show({ type: "error", text1: JSON.stringify(err) });
              }
            }
          };

          const pickDocument = async () => {
            try {
              setLoading(true);
              setIsOpen(false);
              const res: any = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
              });
              // const response: any = await SiteApis.uploadImgApi(res[0], "");
              // if (response) field.onChange(props.name)(response);
              setLoading(false);
            } catch (err) {
              setLoading(false);
              if (DocumentPicker.isCancel(err)) {
                Toast.show({
                  type: "error",
                  text1: "User cancelled the document picker.",
                });
              } else {
                Toast.show({ type: "error", text1: JSON.stringify(err) });
              }
            }
          };

          return (
            <>
              <View style={styles.uploadWrap}>
                {loading ? (
                  <View style={styles.uploadCont}>
                    {/* <ActivityIndicator animating={true} /> */}
                  </View>
                ) : (
                  <>
                    <Popover
                      placement={"top"}
                      trigger={(triggerProps) => {
                        return (
                          <Button
                            variant="unstyled"
                            {...triggerProps}
                            onPress={() => setIsOpen(true)}
                          >
                            <View style={styles.uploadCont}>
                              {field.value ? (
                                <Image
                                  alt=""
                                  style={styles.uploadContImg}
                                  source={{ uri: `ad/${field.value}` }}
                                />
                              ) : (
                                <AntDesign
                                  name="clouduploado"
                                  style={{ color: Color.white, fontSize: 50 }}
                                />
                              )}
                            </View>
                          </Button>
                        );
                      }}
                      isOpen={isOpen}
                      onClose={() => setIsOpen(!isOpen)}
                    >
                      <Popover.Content w="56" style={{ backgroundColor: Color.primaryBgColor, borderColor: Color.primaryBgColor, padding: 5 }}>
                        <Button.Group space={2}>
                          {/* <Button variant="outline" onPress={pickDocument}>
                              DOC
                            </Button> */}
                          <Button
                            variant="outline"
                            onPress={handleSelectFromCamera}
                          >
                            CAMERA
                          </Button>
                          <Button
                            variant="outline"
                            onPress={handleSelectFromLibrary}
                          >
                            GALLERY
                          </Button>
                        </Button.Group>
                      </Popover.Content>
                    </Popover>
                  </>
                )}
              </View>
              {form?.errors[props.name] && form?.touched[props.name] && (
                <Text m="1" style={{ color: Color.red }}>
                  {form.errors[props.name]}
                </Text>
              )}
            </>
          );
        }}
      </Field>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBg: {
    backgroundColor: Color.switchbg,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonTxt: {
    fontSize: 20,
    color: Color.white,
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  select: {
    padding: 10,
  },
  phoneCont: {
    borderWidth: 1,
    borderColor: Color.deepgray,
    backgroundColor: Color.deepgray,
    overflow: "hidden",
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 0,
    alignItems: "center",
  },
  datePicker: {
    borderWidth: 1,
    borderColor: Color.primary_color,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  uploadWrap: {
    flexDirection: "column",
    alignItems: "center",
  },
  uploadCont: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Color.uplords,
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  uploadContImg: {
    width: 50,
    height: 50,
  },
  uploadImgs: {
    width: 50,
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderColor: Color.uplords,
  },
  uploadTxt: {
    fontSize: 12,
    color: Color.primary_color,
  },
});
