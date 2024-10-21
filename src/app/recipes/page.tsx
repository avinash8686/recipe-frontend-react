"use client";
import { Text, Flex } from "@chakra-ui/react";
import React from "react";
import AllCuisines from "@/components/AllCuisines";

export default function Blog() {
  return (
    <>
      <Flex
        bgColor="brand"
        h="100vh"
        justify={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Text color="white" fontSize={"4xl"} fontWeight={"semibold"}>
          Add all the cuisines that interest's you!
        </Text>
        <AllCuisines />
      </Flex>
    </>
  );
}
