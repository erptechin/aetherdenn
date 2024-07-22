import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { FormWapper, InputBox, Buttons, FileUploads } from '../../components';
import { Heading, VStack, Box, Text } from '@gluestack-ui/themed';
import { MainContext } from '../../contexts/mainProvider';


const INITIAL_VALUE = {
  name: '',
  code: '',
  weight: '',
  price: '',
  image: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Product Name is required'),
  code: Yup.string().required('Product Code is required'),
  weight: Yup.string().required('Weight is required'),
  price: Yup.string().required('Price is required'),
});

export const AddProduct = ({ navigation }: any) => {
  const { settings, setSettings } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const [values] = useState<any>(INITIAL_VALUE);

  const onPressHandle = async (values: any) => {
    if (isLoading) return false;
    setIsLoading(true);
    let newData = settings.data ?? [];
    setSettings({ ...settings, data: [...newData, values] });
    setIsLoading(false);
    Toast.show({ type: 'success', text1: 'Profile Updated successfully' });
    navigation.navigate('Bucket');
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchema}
      // eslint-disable-next-line @typescript-eslint/no-shadow
      onSubmit={async (values, { resetForm }) => {
        await onPressHandle(values);
        resetForm();
      }}>
      {({ handleChange, handleSubmit }) => (
        <>
          <FormWapper>
            <Heading>Locate Tag</Heading>
            <Text color="$red" size="md" fontWeight={'$bold'}>Not Found: 7</Text>
            <Text color="$red" size="md" fontWeight={'$bold'}>Selected: 2</Text>

            <VStack justifyContent="space-around" space="sm" pt="$2">
              <Box bg="$green" px="$3" borderRadius={8}>
                <Text color="$black" size="sm">234567897654</Text>
                <Text color="$black" size="sm">HP Laptop</Text>
              </Box>
              <Box bg="$red" px="$3" borderRadius={8}>
                <Text color="$black" size="sm">122345566777</Text>
                <Text color="$black" size="sm">HP Laptop</Text>

              </Box>
            </VStack>


            {/* <InputBox
              placeholder="Product name"
              name="name"
              onChangeText={handleChange('name')}
              autoCapitalize="none"
            />
            <InputBox
              placeholder="Product Code"
              name="code"
              onChangeText={handleChange('code')}
              autoCapitalize="none"
            />
            <InputBox
              placeholder="Weight"
              name="weight"
              onChangeText={handleChange('weight')}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
            <InputBox
              placeholder="Price"
              name="price"
              onChangeText={handleChange('price')}
              keyboardType="number-pad"
              autoCapitalize="none"
            /> */}
            {/* <FileUploads name="image" onChangeText={handleChange('image')} /> */}
          </FormWapper>
          <Buttons
            name={'Add New'}
            isNotFixed={true}
            mx="$5"
            isLoading={isLoading}
            onPress={handleSubmit}
          />
        </>
      )}
    </Formik>
  );
};
