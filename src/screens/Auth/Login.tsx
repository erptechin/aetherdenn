import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Heading, View, VStack, Box, Text, HStack, Button } from '@gluestack-ui/themed';
import { FormWapper, InputBox, Buttons } from "../../components";

export const Login = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const onPressHandle = async (values: any) => {
        navigation.navigate('Home')
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => onPressHandle(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
                    <FormWapper>
                        <Heading py="$4" fontSize="$lg" textTransform={"uppercase"}>
                            Login
                        </Heading>
                        <Text color="#000" my={"$4"}>
                            Welcome to Our Site
                        </Text>

                        <InputBox
                            error={errors.email}
                            placeholder="Email"
                            name="email"
                            onChangeText={handleChange("email")}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />

                        <InputBox
                            error={errors.password}
                            placeholder="Password"
                            name="password"
                            onChangeText={handleChange("password")}
                            type="password"
                            returnKeyType="done"
                        />

                    </FormWapper>
                    <Buttons name="Login" isNotFixed={true} isLoading={isLoading} onPress={handleSubmit} />
                </>
            )}
        </Formik>
    );
};
