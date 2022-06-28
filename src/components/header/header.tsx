import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { ROUTES } from "../../constants/routes";

const Header: React.FC = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="nav"
      py="4"
      bg={mode("gray.200", "black.500")}
      position="sticky"
      top={0}
      zIndex="banner"
    >
      <Container maxW="container.xl">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button variant="ghost">
            <Link to={ROUTES.home}>
              <Text fontWeight="semibold">Cripto Currency App</Text>
            </Link>
          </Button>
          <HStack spacing="2">
            <Button colorScheme="twitter">Login</Button>
            <IconButton
              icon={<Icon as={colorMode === "light" ? MoonIcon : SunIcon} />}
              bg={mode("gray.300", "gray.700")}
              _hover={{ bg: "gray.500", color: "white" }}
              aria-label="toggleTheme"
              onClick={toggleColorMode}
            />
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
