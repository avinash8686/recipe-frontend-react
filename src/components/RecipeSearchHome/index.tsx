"use client";

import { Button, Text, Box, Flex, FormControl, Input } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { recipeSearchForm } from "@/utils/forms/RecipeSearch";
import axios from "axios";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { IRecipe } from "@/interfaces/recipe";
import SearchResults from "../SearchResults";

interface Props {
  resetSearch: boolean;
  setResetSearch: Function;
}

const SearchRecipe: React.FC<Props> = ({ resetSearch, setResetSearch }) => {
  type IRecipeSearchForm = yup.InferType<typeof recipeSearchForm>;

  const [recipeResults, setRecipeResults] = useState<IRecipe[] | null>(null);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(recipeSearchForm),
    criteriaMode: "firstError",
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: IRecipeSearchForm) => {
    const dataToPost = {
      recipe: data.recipe,
    };

    axios
      .get(
        `http://localhost:5000/api/recipe/search?search=${dataToPost.recipe}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response: any) {
        setRecipeResults(response.data);
        setResetSearch(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!resetSearch) {
      setRecipeResults(null);
    }
  }, [resetSearch]);

  return (
    <Flex h="auto" w="full" alignItems={"center"} direction={"column"}>
      {!recipeResults && (
        <Flex
          direction="column"
          alignItems={"center"}
          textAlign={"center"}
          mx="auto"
        >
          <Text
            color="white"
            textAlign={"center"}
            fontSize={"5xl"}
            fontWeight={"semibold"}
            mt="6%"
          >
            Gateway to mouth watering recipes 🤤 <br />
            Walk 🚶‍♀️ in to find out
          </Text>
          <Box w="60%" mt="12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "100%",
              }}
            >
              <Flex alignItems={"center"} w="full">
                <FormControl>
                  <Input
                    bgColor={"white"}
                    border="0"
                    borderLeftRadius="full"
                    p="6"
                    placeholder="Search a recipe or cuisine...."
                    name="recipe"
                    onChange={(e) => {
                      setValue("recipe", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormControl>

                <Button
                  backgroundColor="black"
                  color="white"
                  px="12"
                  py="6"
                  borderRadius="14px"
                  type="submit"
                  borderRightRadius="full"
                  _hover={{
                    bgColor: "white",
                    color: "#ff5200",
                  }}
                >
                  Search
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      )}

      {recipeResults && recipeResults?.length > 0 ? (
        <SearchResults recipeResults={recipeResults} />
      ) : null}
    </Flex>
  );
};
export default SearchRecipe;
