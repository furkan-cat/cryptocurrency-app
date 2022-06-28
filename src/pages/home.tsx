import { MouseEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Container,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { SearchIcon, StarIcon } from "@heroicons/react/outline";
import { ROUTES } from "../constants/routes";
import { useStore } from "../store";
import { ICurrency } from "../types";
import Favorites from "../components/containers/favorites";

const Home: React.FC = (): JSX.Element => {
  const { currencies, favorites } = useStore();
  const navigate = useNavigate();
  const isFavorites = Object.keys(favorites?.data).length === 0;
  const textColorMode = mode("gray.600", "gray.700");

  const currencyClickHandler = (e: MouseEvent, item: ICurrency): void => {
    navigate(`${ROUTES.detail}/${item.id}`, {
      state: { currentPrice: item.current_price },
    });
  };

  const addFavoriteClickHandler = (
    e: MouseEvent<HTMLButtonElement>,
    item: ICurrency
  ): void => {
    e.stopPropagation();
    favorites.add(item);
  };

  useEffect(() => {
    currencies.getData();
  }, []);

  if (currencies.loading) {
    return (
      <Center alignItems="center">
        <Spinner size="md" />
      </Center>
    );
  }

  return (
    <Box py="12" overflowX="hidden">
      <Container maxW="container.xl">
        {!isFavorites && <Favorites />}
        <TableContainer mt="4">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="4"
          >
            <Text fontWeight="bold" fontSize="xl">
              Today's Cripto Currency Prices
            </Text>
            <InputGroup maxW="56">
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={SearchIcon} />}
              />
              <Input type="search" placeholder="Search" variant="filled" />
            </InputGroup>
          </Box>
          <Table variant="simple" bg="white" borderRadius="lg">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Currency Name</Th>
                <Th>Price</Th>
                <Th isNumeric>24h %</Th>
                <Th isNumeric>Volume 24h</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.values(currencies.data).map((item, index) => {
                //console.log(toJS(item));

                // const isActive =
                //   favorites.data.findIndex(
                //     (favItem) => favItem.id == item.id
                //   ) !== -1;
                const isActive = favorites.data[item.id]; // data normalization approach
                return (
                  <Tr
                    _hover={{ bg: "gray.50" }}
                    key={item.id}
                    fontWeight="medium"
                    onClick={(e) => currencyClickHandler(e, item)}
                  >
                    <Td color={mode("gray.600", "gray.700")}>{index + 1}</Td>
                    <Td color={textColorMode}> {item.name}</Td>
                    <Td color={textColorMode}>{`$${item.current_price}`}</Td>
                    <Td
                      isNumeric
                      color={
                        item.price_change_percentage_24h > 0
                          ? "green.500"
                          : "red.600"
                      }
                    >
                      {item.price_change_percentage_24h.toFixed(1)}%
                    </Td>
                    <Td
                      isNumeric
                      color={textColorMode}
                    >{`$${item.total_volume}`}</Td>
                    <Td>
                      <Flex justifyContent="flex-end">
                        <IconButton
                          size="sm"
                          aria-label="addFavorites"
                          icon={<Icon as={StarIcon} />}
                          color={mode("gray.500", "gray.600")}
                          colorScheme={isActive ? "yellow" : ""}
                          _hover={{ color: "yellow.500" }}
                          onClick={(e) => addFavoriteClickHandler(e, item)}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default observer(Home);
