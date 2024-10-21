"use client";
import { Wrap, WrapItem, Avatar, Box, Text, Flex } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ICuisine } from "../../interfaces/cuisine";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function UserFavCuisines() {
  const sliderRef = useRef<any>(null);

  const [userFavoriteCuisines, setUserFavoriteCuisines] = useState<
    ICuisine[] | null
  >(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    autoplay: false,
    autoplaySpeed: 2500,
    centerMode: true,
    centerPadding: "325px",
    slidesPerRow: 1,
    arrows: false,
  };

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

  useEffect(() => {
    getUserFavoriteCuisines();
  }, []);

  return (
    <>
      <Box px="12" mt="2" h="fit-content" w="full">
        <Slider ref={sliderRef} {...settings}>
          {userFavoriteCuisines?.map(
            (userFavoriteCuisine: ICuisine, idx: number) => (
              <Flex direction="column" alignItems={"center"} justify={"center"}>
                <Wrap
                  //   onClick={userProfile}
                  cursor={"pointer"}
                >
                  <WrapItem>
                    <Avatar name="Dan Abrahmov" src="./images/home-food.jpg" />
                  </WrapItem>
                </Wrap>
                <Text>{userFavoriteCuisine.name}</Text>
              </Flex>
            )
          )}
        </Slider>
      </Box>
    </>
  );
}
