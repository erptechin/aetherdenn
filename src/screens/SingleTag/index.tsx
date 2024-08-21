import React, { useState } from 'react';
import { MainWapper } from '../../components';
import { Heading, VStack, Box, Text, HStack, Button } from '@gluestack-ui/themed';
import AntDesign from "react-native-vector-icons/AntDesign";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get("window").width;

const INITIAL_VALUE = {
  select: {}
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const data = [
  {
    name: "",
    population: 75,
    color: "green",
    legendFontColor: 'transparent',
  },
  {
    name: "",
    population: 25,
    color: "red",
    legendFontColor: 'transparent',
  },
];

export const SingleTag = ({ navigation }: any) => {
  const [values, setValues] = useState<any>(INITIAL_VALUE);

  return (
    <MainWapper style={{ paddingTop: 50, padding: 20 }}>

      <HStack justifyContent="space-between" space="lg">
        <Heading>Locate Tag</Heading>
        <Button variant="link" onPress={() => navigation.navigate('Locations')}>
          <AntDesign
            name="back"
            size={30}
            color={"#000"}
          />
        </Button>
      </HStack>

      <PieChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[50, 20]}
        absolute
        hasLegend={false}
      />

      <VStack justifyContent="space-around" space="sm" pt="$2">
        <Text color="$black" size="lg">12345678901</Text>
        <Text color="$black" size="sm">HP Laptop</Text>
      </VStack>

      <Button style={{ marginTop: 100 }} variant="link"
        onPress={() => navigation.navigate('Locations')}>
        <AntDesign
          name={"pausecircle"}
          size={40}
          color={"#cccccc"}
        />
      </Button>

    </MainWapper>

  );
};
