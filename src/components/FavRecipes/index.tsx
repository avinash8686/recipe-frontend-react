"use client";
import { Image, Flex, Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IRecipe } from "@/interfaces/recipe";

const FavRecipes = () => {
  const [favRecipesByUser, setFavRecipesByUser] = useState<IRecipe[] | null>(
    null
  );

  const getFavRecipesByUser = async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/favorite-recipes`,
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      setFavRecipesByUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFavRecipesByUser();
  }, []);

  return (
    <>
      <Flex
        px="12"
        mt="2"
        h="fit-content"
        boxShadow={"0 15px 40px -20px rgba(40,44,63,.15)"}
        w="full"
        maxW="1240px"
        mx="auto"
        direction="column"
        gap="12"
      >
        <Box w="fit-content" pos="relative">
          <Text zIndex={1} pos="relative" fontSize="4xl" fontWeight={"bold"}>
            Likes
          </Text>
          <Box
            pos="absolute"
            bottom="8px"
            w="full"
            h="12px"
            bgColor="brand"
          ></Box>
        </Box>

        <Flex wrap={"wrap"} gap={6} justify={"space-evenly"}>
          {favRecipesByUser?.map((favRecipe: IRecipe) => {
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
                    {favRecipe.title}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default FavRecipes;
