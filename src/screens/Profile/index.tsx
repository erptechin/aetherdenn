import React, { useContext, useState } from "react";
import { MainWapper } from "../../components";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Input,
  InputField
} from "@gluestack-ui/themed";
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
      <HStack mt="$5" justifyContent="space-around">

        <VStack p="$5" bg={color ?? "$yellow300"} width={250}>
          {data.map((item: any, key: any) => <HStack key={key} justifyContent="space-around" py={"$5"}>
            <Heading size="sm" color="$white">{item.name}</Heading>
            <Text size="sm" color="$white">{item.tWeight ?? 0}g</Text>
          </HStack>)}
        </VStack>

        <VStack>
          <Button
            bg="$green"
            size="lg"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => setColor("$green")}
          >
            <Text color="$white" fontSize={20} fontWeight="bold">+</Text>
          </Button>
          <Button
            mt="$3"
            bg="$red"
            size="lg"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => setColor("$red")}
          >
            <Text color="$white" fontSize={20} fontWeight="bold">-</Text>
          </Button>
        </VStack>

      </HStack>

      <HStack justifyContent="space-around" py={"$5"}>
        <Heading size="sm">Total Weight</Heading>
        <Text size="sm">{weight} g</Text>
      </HStack>

      <HStack justifyContent="space-around">
        <Input variant="rounded" w="$40" size="md" borderColor={'$light300'}>
          <InputField
            placeholder={'Product Code'}
            value={code}
            onChangeText={val => {
              setCode(val)
              setColor(undefined)
            }}
          />
        </Input >
        <Button
          bg="$indigo200"
          size="lg"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => onPressHandle()}
        >
          <Text color={settings.primary_color} fontWeight="bold">SCAN</Text>
        </Button>
      </HStack>

    </MainWapper>
  );
};
