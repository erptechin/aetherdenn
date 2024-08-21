import React, { useState, useContext } from 'react';
import { MainWapper } from '../../components';
import { Heading, VStack, Box, Text, HStack, Button, Input, InputField, ScrollView } from '@gluestack-ui/themed';
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from 'react-native';

const INITIAL_VALUE = {
  select: {}
};

const products: any = [
  { id: "12345678901", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 5 },
  { id: "12345678902", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 10 },
  { id: "12345678903", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 20 },
  { id: "12345678904", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 30 },
  { id: "12345678905", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 40 },
  { id: "12345678906", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 50 },
  { id: "12345678907", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 60 },
  { id: "12345678908", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 70 },
  { id: "12345678909", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 80 },
  { id: "12345678910", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 90 },
  { id: "12345678911", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 56 },
  { id: "12345678912", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 78 },
  { id: "12345678913", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 87 },
  { id: "12345678914", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 43 },
  { id: "12345678915", name: "HP Laptop", sn: "ABC7845121", desc: "Description 1", persent: 67 },
]

export const Locations = ({ navigation, route }: any) => {
  const [values, setValues] = useState<any>(INITIAL_VALUE);

  const onPressSelect = async (product: any) => {
    if (product.id in values.select) {
      delete values.select[product.id]
      setValues({
        select: { ...values.select }
      });
    } else {
      setValues({
        select: { ...values.select, [product.id]: true }
      });
    }
  };

  const onPressUpdate = async () => {
    const selectProducts = products.filter((item: any) => item.id in values.select)
    navigation.navigate('Update', { type: route.params.type, items: selectProducts ? selectProducts[0] : null })
  };

  const onPressHandle = async () => {
    const selectProducts = products.filter((item: any) => item.id in values.select)
    navigation.navigate('MultiTag', { items: selectProducts })
  };

  return (
    <MainWapper style={{ paddingTop: 50, padding: 20 }}>

      <HStack justifyContent="space-between" space="lg">
        <Heading>Locate Tag</Heading>
        <Button variant="link" onPress={() => navigation.goBack()}>
          <AntDesign
            name="back"
            size={30}
            color={"#000"}
          />
        </Button>
      </HStack>

      <Input variant="rounded" size="md" mb="$2" borderColor={'$light300'}>
        <InputField
          placeholder="Asset ID / Description / Sr. Number"
        // value=""
        />
      </Input>

      <Text color="$red" size="md" fontWeight={'$bold'}>{route.params.type}: {route.params.count}</Text>
      <Text color="$red" size="md" fontWeight={'$bold'}>Selected: {Object.keys(values.select).length ?? 0}</Text>

      <ScrollView height={520}>
        <VStack justifyContent="space-around" space="sm" pt="$2">
          {products.map((product: any, index: any) => <Box key={index} bg={values.select[product.id] ? "$green" : "$red"} p="$2" borderRadius={8}>
            <TouchableOpacity onPress={() => onPressSelect(product)}>
              <Text color="$black" size="sm">{product.id}</Text>
              <Text color="$black" size="sm">{product.name}</Text>
            </TouchableOpacity>
          </Box>)}
        </VStack>
      </ScrollView>

      {Object.keys(values.select).length === 1 && (<Button mt="$5" onPress={onPressUpdate}>
        <Text color='#fff'>Update selected item</Text>
      </Button>)}

      <Button mt="$5" variant="link"
        onPress={Object.keys(values.select).length ? onPressHandle : null}>
        <AntDesign
          name={"play"}
          size={40}
          color={Object.keys(values.select).length ? "#ff0000" : "#cccccc"}
        />
      </Button>

    </MainWapper>
  );
};
