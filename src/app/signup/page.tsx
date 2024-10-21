"use client";

import {
  Checkbox,
  Stack,
  Box,
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { signupForm } from "@/utils/forms/signupForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const notify = (msg: string) => {
  toast(msg);
};
export default function Homepage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    unregister,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signupForm),
    criteriaMode: "firstError",
    mode: "onChange",
    reValidateMode: "onChange",
  });

  type ISignupForm = yup.InferType<typeof signupForm>;

  const onSubmit = (data: ISignupForm) => {
    axios
      .post("http://localhost:5000/api/user/register", {
        data,
      })
      .then(function (response) {
        notify("Signup Success!!!");
        router.push("/login");
      })
      .catch(function (error) {
        notify(error.message);
        console.log(error);
      });
  };

  return (
    <Flex justify={"space-between"} bgColor="white">
      <Toaster />
      <Flex
        w="48%"
        h="100vh"
        pt="32"
        alignItems={"center"}
        direction={"column"}
      >
        <Text color="brand" fontSize={"4xl"} fontWeight={"semibold"} mb="6">
          Signup
        </Text>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel color="brand" fontWeight={"bold"}>
              Name
            </FormLabel>
            <Input
              type="text"
              {...register("name")}
              border="2px solid"
              borderColor={"brand"}
            />
            <Text>{errors?.name?.message}</Text>
          </FormControl>
          <FormControl mt="4">
            <FormLabel color="brand" fontWeight={"bold"}>
              Email address
            </FormLabel>
            <Input
              type="email"
              {...register("email")}
              border="2px solid"
              borderColor={"brand"}
            />
            <Text>{errors?.email?.message}</Text>
          </FormControl>
          <FormControl mt="4">
            <FormLabel color="brand" fontWeight={"bold"}>
              Password
            </FormLabel>
            <Input
              type="password"
              {...register("password")}
              border="2px solid"
              borderColor={"brand"}
            />
            <Text>{errors?.password?.message}</Text>
          </FormControl>

          <Stack spacing={5} direction="row">
            <Checkbox
              mt="2"
              color="brand"
              colorScheme="red"
              {...register("isAdmin")}
            >
              isAdmin?
            </Checkbox>
          </Stack>
          <Button
            mt="4"
            textAlign={"center"}
            color="white"
            bgColor="brand"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Flex>
      <Box w="50%">
        <Box
          w="100%"
          h="full"
          bgImage={`./images/home-food.jpg`}
          bgSize={"cover"}
          bgPos={"center"}
          bgRepeat={"no-repeat"}
        ></Box>
      </Box>
    </Flex>
  );
}
