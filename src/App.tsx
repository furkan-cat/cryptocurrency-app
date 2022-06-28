import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import { ROUTES } from "./constants/routes";
import Detail from "./pages/detail";
import Home from "./pages/home";
import { useColorModeValue as mode } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => {
      return {
        body: {
          bg: mode("gray.100", "gray.800"),
        },
      };
    },
  },
});

export const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Home />} index={true} />
          <Route element={<Detail />} path={`${ROUTES.detail}/:id`} />
        </Route>
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
);
