"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import CreateOrEditingRecipe from "../CreateOrEditingRecipe";

const Panel = ({}) => {
  const [allRecipesData, setAllRecipesData] = useState<any>();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [recipeData, setRecipeData] = useState<any>();

  const getAllRecipes = async () => {
    const accessToken = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:5000/api/recipe`, {
        headers: {
          "auth-token": accessToken,
        },
      });
      setAllRecipesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  const editRecipe = (contactId: string) => {
    const contact = allRecipesData.filter(
      (contact: any) => contact._id === contactId
    );
    setRecipeData(contact);
    setIsEditing(true);
  };

  const deleteRecipe = async (contactId: string) => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/contacts/${contactId}`,
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      getAllRecipes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box w="100%" h="fit-content" className="frost-effect" p="6">
        <CreateOrEditingRecipe
          isEditing={isEditing}
          getAllRecipes={getAllRecipes}
          contactData={recipeData}
          setIsEditing={setIsEditing}
        />

        {allRecipesData && allRecipesData.length > 0 && (
          <TableContainer mt="4">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize={"lg"} fontWeight={"semibold"} color="white">
                    S.No
                  </Th>
                  <Th fontSize={"lg"} fontWeight={"semibold"} color="white">
                    title
                  </Th>

                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {allRecipesData &&
                  allRecipesData.map((recipeData: any, idx: number) => (
                    <Tr>
                      <Td fontSize={"sm"} fontWeight={"semibold"} color="white">
                        {idx + 1}
                      </Td>
                      <Td fontSize={"sm"} fontWeight={"semibold"} color="white">
                        {recipeData.title}
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            p="0"
                            _hover={{
                              backgroundColor: "transparent",
                              border: "1px solid white",
                            }}
                            bgColor="transparent"
                            as={Button}
                          >
                            <Icon
                              as={BsThreeDotsVertical}
                              color="white"
                              zIndex={50}
                              boxSize="6"
                            />
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={() => editRecipe(recipeData._id)}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => deleteRecipe(recipeData._id)}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default Panel;
