"use client";

import {
  Button,
  Box,
  Flex,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ICuisine } from "@/interfaces/cuisine";
import { SiTicktick } from "react-icons/si";
import { IoAddCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface Props {}

const AllCuisines: React.FC<Props> = ({}) => {
  const router = useRouter();

  const [allCuisines, setAllCuisines] = useState<ICuisine[] | null>(null);

  const [addedCuisines, setAddedCuisines] = useState<String[]>([]);

  const getAllCuisines = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cuisine/");
      setAllCuisines(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCuisines();
  }, []);

  const addCuisine = async (cuisineId: string) => {
    const cuisineIdx = addedCuisines?.indexOf(cuisineId);
    if (cuisineIdx === -1) {
      if (addedCuisines) {
        setAddedCuisines([...addedCuisines, cuisineId]);
      } else {
        setAddedCuisines([cuisineId]);
      }
    }
  };

  const addCuisinesToUser = async () => {
    if (addedCuisines?.length > 0) {
      const accessToken = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/add-cuisines",
          addedCuisines,
          {
            headers: {
              "auth-token": accessToken,
            },
          }
        );
        router.push("/reciperoute");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Box textAlign={"center"} maxW="50%" mx="auto">
        <Flex wrap="wrap" justify={"center"} gap="8" mt="6">
          {allCuisines &&
            allCuisines.map((cuisine: ICuisine, idx: number) => (
              <Tag
                cursor={
                  addedCuisines && addedCuisines?.indexOf(cuisine._id) > -1
                    ? "not-allowed"
                    : "pointer"
                }
                px="4"
                py="2"
                borderRadius={"full"}
                size={"xl"}
                key={idx}
                variant="subtle"
                onClick={() => addCuisine(cuisine._id)}
              >
                <TagLeftIcon
                  boxSize="22px"
                  as={
                    addedCuisines && addedCuisines?.indexOf(cuisine._id) > -1
                      ? SiTicktick
                      : IoAddCircleSharp
                  }
                />
                <TagLabel>{cuisine.name}</TagLabel>
              </Tag>
            ))}
        </Flex>
        <Button
          bgColor={"black"}
          color="white"
          w="100px"
          _hover={{
            bgColor: "white",
            color: "brand",
          }}
          p="0"
          cursor={"pointer"}
          onClick={addCuisinesToUser}
          mt="20"
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default AllCuisines;
