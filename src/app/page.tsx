import Image from "next/image";
import styles from "./page.module.css";
import { Box, Flex } from "@chakra-ui/react";
import Homepage from "@/components/HomePage";

export default function Home() {
  return (
    <Flex justify={"center"} height="auto" overflow={"hidden"} mx="auto">
      <Homepage />
    </Flex>
  );
}
