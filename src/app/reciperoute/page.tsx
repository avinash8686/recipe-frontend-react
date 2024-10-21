"use client";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "../Navbar/page";
import FavCuisinesRecipes from "@/components/FavCuisinesRecipes";
import FavRecipes from "@/components/FavRecipes";

export default function Blog() {
  const [displayBy, setDisplayBy] = useState<"Fav Cuisines" | "Fav Recipes">(
    "Fav Cuisines"
  );

  return (
    <>
      <Box h="100vh" mx="auto" alignItems={"center"}>
        <Navbar displayBy={displayBy} setDisplayBy={setDisplayBy} />
        {displayBy === "Fav Cuisines" ? <FavCuisinesRecipes /> : <FavRecipes />}
      </Box>
    </>
  );
}
