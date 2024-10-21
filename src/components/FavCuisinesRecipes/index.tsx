"use client";
import {
  Tooltip,
  Button,
  Icon,
  Image,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IRecipeByUserFavCuisine } from "@/interfaces/cuisine";
import { IRecipe } from "@/interfaces/recipe";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

export default function FavCuisinesRecipes() {
  const [recipesByUserFavCuisines, setRecipesByUserFavCuisines] = useState<
    IRecipeByUserFavCuisine[] | null
  >(null);

  // The backend API call can call User table to get favCuisines
  // With Each & every Cuisines, we can query the Recipe table, modify the result to
  // give the respective recipes under cuisines in 1 API call, saving round trips of http calls

  const getRecipesByUserFavCuisines = async () => {
    const accessToken = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/recipe/by-user-fav-cuisne`,
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      setRecipesByUserFavCuisines(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToFavRecipes = async (
    recipeId: string,
    cuisineId: string | undefined
  ) => {
    // Create a table in the backend
    // RecipeLikes => it consists of userId, recipeId, cuisineId
    // Later, we can get the following combinations
    // 1, get all the liked recipes by user, we call by userId & get all from this table,
    // query the recipe table and send the results
    // 2, get the liked recipes by user under Indian cuisine, we call by userId, cuisineId
    // & get all the entries and query recipe table & send the results.

    const accessToken = localStorage.getItem("token");

    // userId from authToken
    // recipeId, cuisineId needed.
    const data = {
      cuisineId,
      recipeId,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/favorite-recipe`,
        data,
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      getRecipesByUserFavCuisines();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipesByUserFavCuisines();
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
        {recipesByUserFavCuisines?.map(
          (favCuisine: IRecipeByUserFavCuisine) => {
            return (
              <Box>
                <Box w="fit-content" pos="relative">
                  <Text
                    zIndex={1}
                    pos="relative"
                    fontSize="4xl"
                    fontWeight={"bold"}
                  >
                    {favCuisine.name}
                  </Text>
                  <Box
                    pos="absolute"
                    bottom="8px"
                    w="full"
                    h="12px"
                    bgColor="brand"
                  ></Box>
                </Box>
                <Flex wrap={"wrap"} gap={6} justify={"space-between"}>
                  {favCuisine.recipes.map((recipe: IRecipe) => {
                    return (
                      <Box maxW="300px">
                        <Image
                          boxSize="300px"
                          width="100%"
                          height="auto"
                          src="./images/recipe-brahma.jpg"
                          alt="Dan Abramov"
                        />
                        <Flex
                          justify={"space-between"}
                          mt="2"
                          alignItems={"center"}
                        >
                          <Text fontSize={"lg"} fontWeight={"bold"}>
                            {recipe.title}
                          </Text>
                          <Tooltip label="like" bg="grey">
                            <Button
                              bg="transparent"
                              _hover={{
                                backgroundColor: "transparent",
                              }}
                              onClick={() =>
                                addToFavRecipes(recipe._id, recipe.cuisineId)
                              }
                            >
                              <Icon
                                as={recipe.isFavorite ? FaHeart : FaRegHeart}
                                color="brand"
                                zIndex={50}
                                boxSize="6"
                              />
                            </Button>
                          </Tooltip>
                        </Flex>
                      </Box>
                    );
                  })}
                </Flex>
              </Box>
            );
          }
        )}
      </Flex>
    </>
  );
}
