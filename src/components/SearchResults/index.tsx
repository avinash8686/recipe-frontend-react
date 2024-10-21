"use client";
import { Image, Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import { IRecipe } from "@/interfaces/recipe";

interface Props {
  recipeResults: IRecipe[];
}
const SearchResults: React.FC<Props> = ({ recipeResults }) => {
  return (
    <>
      <Flex
        bgColor="white"
        px="12"
        mt="2"
        minH="100vh"
        h="auto"
        boxShadow={"0 15px 40px -20px rgba(40,44,63,.15)"}
        w="full"
        mx="auto"
        direction="column"
        gap="12"
      >
        <Flex
          direction="column"
          alignItems="center"
          justify="space-between"
          w="1240px"
          mx="auto"
          mt="6"
        >
          <Box w="fit-content" pos="relative">
            <Text zIndex={1} pos="relative" fontSize="4xl" fontWeight={"bold"}>
              "Recipes..."
            </Text>
            <Box
              pos="absolute"
              bottom="8px"
              w="full"
              h="12px"
              bgColor="brand"
            ></Box>
          </Box>
          <Flex
            w="full"
            wrap={"wrap"}
            gap={6}
            mt="6"
            justifyContent={"space-evenly"}
          >
            {recipeResults.map((recipe: IRecipe) => {
              return (
                <Box maxW="300px">
                  <Image
                    boxSize="300px"
                    width="100%"
                    height="auto"
                    src="./images/recipe-brahma.jpg"
                    alt="Dan Abramov"
                  />
                  <Flex justify={"space-between"} mt="2" alignItems={"center"}>
                    <Text fontSize={"lg"} fontWeight={"bold"}>
                      {recipe.title}
                    </Text>
                  </Flex>
                </Box>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default SearchResults;
