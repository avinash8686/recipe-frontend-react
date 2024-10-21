"use client";

import {
  Button,
  Text,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginForm } from "@/utils/forms/loginForm";
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
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginForm),
    criteriaMode: "firstError",
    mode: "onChange",
    reValidateMode: "onChange",
  });

  type ILoginForm = yup.InferType<typeof loginForm>;
  const onSubmit = (data: ILoginForm) => {
    axios
      .post("http://localhost:5000/api/user/login", {
        data,
      })
      .then(function (response: any) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        notify("Login Success!!!");
        if (response.data.user.isAdmin) {
          router.push("/admin");
        } else if (response.data.user.initialLogin) {
          router.push(`/recipes`);
        } else {
          router.push(`/reciperoute`);
        }
      })
      .catch(function (error) {
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
          Login
        </Text>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
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

          <Button
            mt="4"
            w="full"
            textAlign={"center"}
            color="white"
            bgColor="brand"
            type="submit"
          >
            Login
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
