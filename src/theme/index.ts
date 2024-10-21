import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";
import Fonts from "@/components/Fonts";

const theme = extendTheme({
  fonts: {
    heading: `'Gilory-Bold', sans-serif`,
    body: `'Gilory', sans-serif`,
  },
  colors: {
    brand: "#ff5200",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: "",
      },
    }),
  },
});

export default theme;
