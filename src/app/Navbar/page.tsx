"use client";
import {
  Button,
  Wrap,
  WrapItem,
  Avatar,
  Box,
  Text,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserSidebar from "@/components/UserSidebar";
import axios from "axios";
import { IUser } from "../../interfaces/user";

interface Props {
  displayBy: "Fav Cuisines" | "Fav Recipes";
  setDisplayBy: Function;
}

const Navbar: React.FC<Props> = ({ displayBy, setDisplayBy }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userDetails, setUserDetails] = useState<IUser | null>(null);

  const getUserDetails = async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:5000/api/user`, {
        headers: {
          "auth-token": accessToken,
        },
      });

      setUserDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const userProfile = () => {
    onOpen();
    getUserDetails();
  };

  return (
    <>
      <Flex
        px="12"
        py="2"
        mt="2"
        h="fit-content"
        boxShadow={"0 15px 40px -20px rgba(40,44,63,.15)"}
        w="full"
      >
        <Flex
          justify={"space-between"}
          alignItems={"center"}
          mx="auto"
          w="1240px"
        >
          <Box>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Recipe Route
            </Text>
            <Text fontSize={"xl"}>
              Gateway to your favorite{" "}
              <Text as="span" color="brand">
                recipes....
              </Text>
            </Text>
          </Box>

          <Flex gap="6">
            <Flex gap="4">
              <Button
                py="6"
                borderRadius={"full"}
                bgColor={displayBy === "Fav Cuisines" ? "brand" : "#E2E8F0"}
                onClick={() => setDisplayBy("Fav Cuisines")}
              >
                Fav Cuisines {displayBy === "Fav Recipes" ? "🔥" : null}
              </Button>
              <Button
                py="6"
                borderRadius={"full"}
                bgColor={displayBy === "Fav Recipes" ? "brand" : "#E2E8F0"}
                onClick={() => setDisplayBy("Fav Recipes")}
              >
                {displayBy === "Fav Cuisines" ? "❤️" : null} Recipes
              </Button>
            </Flex>

            <Wrap onClick={userProfile} cursor={"pointer"}>
              <WrapItem>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </WrapItem>
            </Wrap>
          </Flex>
        </Flex>
        <UserSidebar
          userDetails={userDetails}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Flex>
    </>
  );
};

export default Navbar;
