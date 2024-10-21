"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "@/components/Admin/Sidebar";
import Panel from "@/components/Panel";

export default function RecipeAdmin() {
  return (
    <>
      <Box
        bgImg={"url(./images/recipe-brahma.jpg)"}
        bgRepeat={"repeat"}
        height="auto"
      >
        <Box
          w="full"
          className={"frost-effect"}
          borderRadius={"none"}
          border="0"
          textAlign={"center"}
          color="white"
        >
          <Text fontSize="5xl" fontWeight={"bold"}>
            Welcome to Admin Panel of Recipe Route....{" "}
          </Text>
        </Box>
        <Flex mt="4" gap={4} justifyContent={"space-between"}>
          <Sidebar />
          <Panel />
        </Flex>
      </Box>
    </>
  );
}
