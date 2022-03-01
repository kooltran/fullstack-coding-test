import React from "react";
import { FormControl, FormLabel, Text, Input, Button, Container } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { object, string } from "yup";

import { useAuth } from "../hooks/useAuth";

const Schema = object().shape({
  email: string()
    .email("Please enter valid email address")
    .max(64, "Maximum of 64 characters are allowed for Email address")
    .required()
    .label("Email"),
  password: string().min(6, "Please enter more than 6 characters").required().label("Password"),
});

const Login = () => {
  const { signIn, error, loading } = useAuth();

  const handleSubmit = async (values) => {
    signIn(values);
  };

  return (
    <Container marginTop="40px">
      <Text fontSize="3xl" align="center" marginBottom="20px" textTransform="uppercase">
        Login Page
      </Text>
      <Formik initialValues={{ email: "", password: "" }} validationSchema={Schema} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, errors, touched, isValid }) => {
          return (
            <Form>
              <FormControl id="email" marginBottom="20px">
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" onChange={handleChange} onBlur={handleBlur} />
                <Text color="tomato">{touched.email && errors.email}</Text>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" onChange={handleChange} onBlur={handleBlur} />
                <Text color="tomato">{touched.password && errors.password}</Text>
              </FormControl>
              <Button type="submit" disabled={!isValid || loading} marginTop={"20px"}>
                Submit
              </Button>

              <Text color="tomato">{error}</Text>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Login;
