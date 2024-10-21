"use client";
import {
  Icon,
  Wrap,
  WrapItem,
  Avatar,
  Box,
  Text,
  Flex,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { IUser } from "../../interfaces/user";
import { ICuisine } from "../../interfaces/cuisine";
import { FaPowerOff } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IRecipe } from "@/interfaces/recipe";

interface Props {
  userDetails: IUser | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserSidebar: React.FC<Props> = ({ userDetails, isOpen, onClose }) => {
  const router = useRouter();

  const [userFavoriteCuisines, setUserFavoriteCuisines] = useState<
    ICuisine[] | null
  >(null);
  const [userFavoriteRecipes, setUserFavoriteRecipes] = useState<
    IRecipe[] | null
  >(null);

  const getUserFavoriteCuisines = async () => {
    if (!userFavoriteCuisines) {
      const accessToken = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/cuisines`,
          {
            headers: {
              "auth-token": accessToken,
            },
          }
        );

        setUserFavoriteCuisines(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getUserFavoriteRecipes = async () => {
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

      setUserFavoriteRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.replace("/");
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>
            <Wrap cursor={"pointer"}>
              <WrapItem>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </WrapItem>
              <WrapItem>
                <Box>
                  <Text>{userDetails?.name}</Text>
                  <Text fontSize={"sm"} fontWeight={"normal"}>
                    {userDetails?.email}
                  </Text>
                </Box>
              </WrapItem>
            </Wrap>
          </DrawerHeader>

          <DrawerBody px="2">
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton onClick={getUserFavoriteCuisines} pr="4">
                    <Box as="span" flex="1" textAlign="left">
                      Favourite Cuisines
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} px="0">
                  <Flex wrap="wrap" gap="2">
                    {userFavoriteCuisines &&
                      userFavoriteCuisines.map(
                        (userFavoriteCuisine: ICuisine, idx: number) => (
                          <Tag
                            px="4"
                            py="2"
                            borderRadius={"full"}
                            size={"xl"}
                            key={idx}
                            variant="subtle"
                          >
                            <TagLabel fontSize={"sm"}>
                              {userFavoriteCuisine.name}
                            </TagLabel>
                          </Tag>
                        )
                      )}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem borderBottom={0}>
                <h2>
                  <AccordionButton onClick={getUserFavoriteRecipes} pr="4">
                    <Box as="span" flex="1" textAlign="left">
                      Favourite Recipes
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} px="4">
                  <Flex wrap="wrap" gap="2">
                    {userFavoriteRecipes &&
                      userFavoriteRecipes.map(
                        (userFavoriteRecipe: IRecipe, idx: number) => (
                          <Box w="full">
                            <Text p="2" fontSize={"sm"} key={idx}>
                              {userFavoriteRecipe.title}
                            </Text>
                            <hr />
                          </Box>
                        )
                      )}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>

          <DrawerFooter>
            <Flex
              _hover={{
                cursor: "pointer",
              }}
              onClick={onLogout}
              alignItems={"center"}
            >
              <Text mr="2">Logout</Text>
              <Icon color={"green.400"} as={FaPowerOff} />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserSidebar;
