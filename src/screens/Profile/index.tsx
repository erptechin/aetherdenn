import React, { useContext, useState } from "react";
import { MainWapper } from "../../components";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {
  HStack,
  Text,
  Input,
  InputField,
  Box,
} from "@gluestack-ui/themed";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MainContext } from '../../contexts'

export const Profile = () => {
  const { settings, setSettings } = useContext(MainContext);
  let data = settings.data ?? [];
  const [color, setColor] = useState(undefined)
  const [code, setCode] = useState('')
  const [weight, setWeight] = useState(0)

  const onPressHandle = async () => {
    if (!color) return Toast.show({ type: 'error', text1: 'Choose + or -' });
    let weight = 0
    for (let item of data) {
      if (item.code == code) {

        if (color == '$green') {
          item['tWeight'] = Number(item.tWeight ? item.tWeight : 0) + Number(item.weight)
        }

        if (color == '$red') {
          item['tWeight'] = Number(item.tWeight ? item.tWeight : 0) - Number(item.weight)
        }

        if (item.tWeight < 0) {
          item['tWeight'] = 0
        }
      }
      weight = weight + Number(item.tWeight ? item.tWeight : 0)
    }
    setWeight(weight)
    setSettings({ ...settings, data });
  };

  return (
    <MainWapper>

      <Input variant="rounded" size="md" my={10} borderColor={'$light300'}>
        <InputField
          placeholder={'Alex'}
          value={code}
          onChangeText={val => {
            setCode(val)
            setColor(undefined)
          }}
        />
      </Input >

      <Input variant="rounded" size="md" borderColor={'$light300'}>
        <InputField
          placeholder={'Studio 4'}
          value={code}
          onChangeText={val => {
            setCode(val)
            setColor(undefined)
          }}
        />
      </Input >

      <HStack justifyContent="space-around" py={"$5"} space="lg">
        <Box bg="$indigo200" p="$3" flex={1} borderRadius={8}>
          <Text textAlign="center" color="$black" size="lg">Total</Text>
          <Text bg="$white" textAlign="center" color="$black" size="3xl">452</Text>
        </Box>
        <Box bg="$orange" p="$3" flex={1} borderRadius={8}>
          <Text textAlign="center" color="$black" size="lg">Extra</Text>
          <Text bg="$white" textAlign="center" color="$black" size="3xl">0</Text>
        </Box>
      </HStack>

      <HStack justifyContent="space-around" space="lg">
        <Box bg="$green" p="$3" flex={1} borderRadius={8}>
          <Text textAlign="center" color="$black" size="lg">Found</Text>
          <Text bg="$white" textAlign="center" color="$black" size="3xl">0</Text>
        </Box>
        <Box bg="$red" p="$3" flex={1} borderRadius={8}>
          <Text textAlign="center" color="$black" size="lg">Not Found</Text>
          <Text bg="$white" textAlign="center" color="$black" size="3xl">0</Text>
        </Box>
      </HStack>

      <AntDesign
        name="clouduploado"
        style={{ color: "#ff0000", fontSize: 50 }}
      />


    </MainWapper>
  );
};
