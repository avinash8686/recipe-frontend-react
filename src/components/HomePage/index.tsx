"use client";

import { Button, Text, Flex } from "@chakra-ui/react";
import Link from "next/link";
import SearchRecipe from "../RecipeSearchHome";
import { IoSearch } from "react-icons/io5";
import React, { useState } from "react";

export default function Homepage() {
  const [resetSearch, setResetSearch] = useState<boolean>(false);

  return (
    <Flex
      h="auto"
      minH="100vh"
      bgColor="brand"
      w="full"
      alignItems={"center"}
      direction={"column"}
    >
      <Flex
        width="1240px"
        justify={"space-between"}
        alignItems={"center"}
        my="6"
      >
        <Text fontSize="4xl" fontWeight={"bold"} color="white">
          Recipe Route...
        </Text>
        <Flex justifyContent={"center"} gap="4">
          {resetSearch && (
            <Button
              borderRadius={"full"}
              _hover={{
                backgroundColor: "black",
                color: "white",
              }}
              leftIcon={<IoSearch />}
              onClick={() => setResetSearch(false)}
            >
              Search
            </Button>
          )}
          <Button
            borderRadius={"full"}
            _hover={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Link href="/signup">Signup</Link>
          </Button>
          <Button
            borderRadius={"full"}
            _hover={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Link href="/login">Login</Link>
          </Button>
        </Flex>
      </Flex>

      <SearchRecipe resetSearch={resetSearch} setResetSearch={setResetSearch} />
    </Flex>
  );
}
