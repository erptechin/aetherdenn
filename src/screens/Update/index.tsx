import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Heading, Text, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, ChevronDownIcon, SelectItem } from '@gluestack-ui/themed';
import { FormWapper, InputBox, Buttons } from "../../components";

const locations = ['warehouse1', 'warehouse2', 'warehouse3']
const notFounds = ['Missing', 'Damage, sent for repair', 'Out for show/event', 'Asset tag missing', 'Loan to Other Dept / Ext Party', 'Others']

export const Update = ({ navigation, route }: any) => {
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        // location: Yup.string().required("Location is required"),
        sn: Yup.string().required("Serial Number is required"),
        remark: Yup.string().required("Remark is required"),
    });

    const validationSchema1 = Yup.object().shape({
        // location: Yup.string().required("Location is required"),
    });

    const onPressHandle = async (values: any) => {
        console.log(values)
        navigation.goBack()
    };

    return (
        <Formik
            initialValues={{ location: "", sn: route?.params?.items?.sn ?? "", remark: "" }}
            validationSchema={route?.params?.type === "Found" ? validationSchema : validationSchema1}
            onSubmit={(values) => onPressHandle(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
                    <FormWapper>
                        <Heading py="$4" fontSize="$lg" textTransform={"uppercase"}>
                            Update Items
                        </Heading>
                        <Text color="#000" my={"$4"}>
                            Please update these fields
                        </Text>

                        {route?.params?.type === "Found" ? <>
                            <Select
                                selectedValue={values.location}
                                onValueChange={(val: any) => handleChange(val)}
                            >
                                <SelectTrigger variant="outline" size="md">
                                    <SelectInput placeholder="Update Location" />
                                    <SelectIcon as={ChevronDownIcon} style={{ marginRight: 10 }} />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>
                                        <SelectDragIndicatorWrapper>
                                            <SelectDragIndicator />
                                        </SelectDragIndicatorWrapper>
                                        {locations.map((location, index) => <SelectItem key={index} label={location} value={location} />)}
                                    </SelectContent>
                                </SelectPortal>
                            </Select>

                            <InputBox
                                error={errors.sn}
                                placeholder="Update Serial Number"
                                type="text"
                                name="sn"
                                onChangeText={handleChange("sn")}
                            />

                            <InputBox
                                error={errors.remark}
                                placeholder="Update Remark"
                                name="remark"
                                onChangeText={handleChange("remark")}
                                type="text"
                            />
                        </> : <>
                            <Select
                                selectedValue={values.location}
                                onValueChange={handleChange}
                            >
                                <SelectTrigger variant="outline" size="md">
                                    <SelectInput placeholder="Select a region" />
                                    <SelectIcon as={ChevronDownIcon} style={{ marginRight: 10 }} />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>
                                        <SelectDragIndicatorWrapper>
                                            <SelectDragIndicator />
                                        </SelectDragIndicatorWrapper>
                                        {notFounds.map((notFound, index) => <SelectItem key={index} label={notFound} value={notFound} />)}
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                        </>}

                    </FormWapper>
                    <Buttons name="Update" isNotFixed={true} isLoading={isLoading} onPress={handleSubmit} />
                </>
            )}
        </Formik>
    );
};
