import React, { useState } from "react";
import { MainWapper } from "../../components";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {
  HStack,
  Text,
  Select,
  Box,
  Button,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  ChevronDownIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@gluestack-ui/themed";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";

const INITIAL_VALUE = {
  custodian: null,
  location: null,
  count: { total: 0, extra: 0, found: 0, notFound: 0 },
  status: false
};

const custodians = ['Jake', 'Mark', 'Jone']
const locationsList: any = {
  Jake: ['warehouse1', 'warehouse2', 'warehouse3'],
  Mark: ['warehouse4', 'warehouse5', 'warehouse6'],
  Jone: ['warehouse7', 'warehouse8', 'warehouse9'],
}
const countList: any = {
  warehouse1: { total: 452, found: 445, extra: 3, notFound: 7 },
  warehouse2: { total: 300, found: 200, extra: 5, notFound: 100 },
  warehouse3: { total: 100, found: 80, extra: 1, notFound: 120 },
  warehouse4: { total: 200, found: 180, extra: 1, notFound: 220 },
  warehouse5: { total: 300, found: 280, extra: 1, notFound: 320 },
  warehouse6: { total: 400, found: 380, extra: 1, notFound: 420 },
  warehouse7: { total: 500, found: 480, extra: 1, notFound: 520 },
  warehouse8: { total: 600, found: 580, extra: 1, notFound: 620 },
  warehouse9: { total: 700, found: 680, extra: 1, notFound: 720 },
}

export const Home = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<any>([]);
  const [values, setValues] = useState<any>(INITIAL_VALUE);

  const handleChange = (name: any, value: any) => {
    if (name === 'custodian') {
      setValues({
        ...values,
        [name]: value,
        location: null,
        count: { total: 0, extra: 0, found: 0, notFound: 0 }
      });
      setLocations(locationsList[value])
    } else if (name === 'location') {
      setValues({
        ...values,
        [name]: value,
        count: { ...countList[value], extra: 0, found: 0, notFound: 0 }
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const onPressHandle = async () => {
    if (!values.custodian) return Toast.show({ type: "error", text1: "Custodian is required!" });
    if (!values.location) return Toast.show({ type: "error", text1: "Location is required!" });
    setIsLoading(true)
    setValues({
      ...values,
      count: { ...countList[values.location] },
      status: true
    });
    setIsLoading(false)
  };

  const onPressDetal = async (type: string, count: number) => {
    if (values?.status) {
      setIsLoading(false)
      navigation.navigate('Locations', { type, count })
      setValues(INITIAL_VALUE);
    }
  };

  const onPressUpdate = async () => {
    setValues(INITIAL_VALUE);
  };

  return (
    <MainWapper style={{ paddingTop: 70 }}>

      <Select
        selectedValue={values.custodian}
        onValueChange={(val: any) => handleChange('custodian', val)}>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select custodian" />
          <SelectIcon as={ChevronDownIcon} style={{ marginRight: 10 }} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {custodians.map((custodian, index) => <SelectItem key={index} label={custodian} value={custodian} />)}
          </SelectContent>
        </SelectPortal>
      </Select>

      <Select
        style={{ marginTop: 10 }}
        selectedValue={values.location}
        onValueChange={(val: any) => handleChange('location', val)}>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select location" />
          <SelectIcon as={ChevronDownIcon} style={{ marginRight: 10 }} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {locations.map((location: any, index: any) => <SelectItem key={index} label={location} value={location} />)}
          </SelectContent>
        </SelectPortal>
      </Select>

      <HStack justifyContent="space-around" py={"$5"} space="lg">
        <Box bg="$indigo200" p="$3" flex={1} borderRadius={8}>
          <TouchableOpacity >
            <Text textAlign="center" color="$black" size="lg">Total</Text>
            <Text bg="$white" textAlign="center" color="$black" size="3xl">{values.count.total}</Text>
          </TouchableOpacity>
        </Box>
        <Box bg="$orange" p="$3" flex={1} borderRadius={8}>
          <TouchableOpacity >
            <Text textAlign="center" color="$black" size="lg">Extra</Text>
            <Text bg="$white" textAlign="center" color="$black" size="3xl">{values.count.extra}</Text>
          </TouchableOpacity>
        </Box>
      </HStack>

      <HStack justifyContent="space-around" space="lg">
        <Box bg="$green" p="$3" flex={1} borderRadius={8}>
          <TouchableOpacity onPress={() => onPressDetal('Found', values.count.found)}>
            <Text textAlign="center" color="$black" size="lg">Found</Text>
            <Text bg="$white" textAlign="center" color="$black" size="3xl">{values.count.found}</Text>
          </TouchableOpacity>
        </Box>
        <Box bg="$red" p="$3" flex={1} borderRadius={8}>
          <TouchableOpacity onPress={() => onPressDetal('Not Found', values.count.notFound)}>
            <Text textAlign="center" color="$black" size="lg">Not Found</Text>
            <Text bg="$white" textAlign="center" color="$black" size="3xl">{values.count.notFound}</Text>
          </TouchableOpacity>
        </Box>
      </HStack>

      <Button style={{ marginTop: 50 }} variant="link"
        onPress={onPressHandle}>
        <AntDesign
          name={values?.location ? "play" : "exclamationcircle"}
          size={40}
          color={values?.status ? "#cccccc" : "#ff0000"}
        />
      </Button>

      {values?.status && (<Button mt="$5" onPress={onPressUpdate}>
        <Text color='#fff'>Submit</Text>
      </Button>)}

    </MainWapper>
  );
};
