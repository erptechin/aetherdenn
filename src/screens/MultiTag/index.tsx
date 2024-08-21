import React, { useState } from 'react';
import { MainWapper } from '../../components';
import { Heading, VStack, Box, Text, HStack, Button } from '@gluestack-ui/themed';
import AntDesign from "react-native-vector-icons/AntDesign";

const INITIAL_VALUE = {
  select: {}
};

export const MultiTag = ({ navigation, route }: any) => {
  const [values, setValues] = useState<any>(INITIAL_VALUE);

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

      <VStack justifyContent="space-around" space="sm" pt="$2">
        {route.params.items.map((product: any, index: any) => <Box key={index} p="$2" borderRadius={8}>
          <HStack justifyContent="space-between" space="lg">
            <Text color="$black" size="sm">{product.id}</Text>
            <Text color="$black" size="sm">{product.persent}%</Text>
          </HStack>
          <Box bg={"$green"}>
            <Box bg={"$red"} p="$2" w={`${product.persent}%`}></Box>
          </Box>
          <Text color="$black" size="sm">{product.name}</Text>
          <Text color="$black" size="sm">{product.desc}</Text>
          <Text color="$black" size="sm">S/N {product.sn}</Text>
        </Box>)}
      </VStack>

      <Button style={{ marginTop: 10 }} variant="link"
        onPress={() => navigation.goBack()}>
        <AntDesign
          name={"pausecircle"}
          size={40}
          color={"#cccccc"}
        />
      </Button>

    </MainWapper>

  );
};
