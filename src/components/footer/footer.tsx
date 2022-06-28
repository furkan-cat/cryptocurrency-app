import {
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue as mode,
  VStack,
} from "@chakra-ui/react";
import { Fragment } from "react";

const footerNav = [
  {
    title: "Github",
    url: "https://github.com/furkan-cat/my-porfolio",
  },
  {
    title: "Coingecko API",
    url: "https://www.coingecko.com/en/api/documentation",
  },
];

const Footer = () => {
  return (
    <VStack as="footer" py="12" bg={mode("gray.100", "black.500")}>
      <HStack spacing="3">
        {footerNav.map((item, index) => (
          <Fragment key={index}>
            {index !== 0 && <Text fontWeight="semibold">𐤟</Text>}
            <Link
              key={index}
              href={item.url}
              target="_blank"
              fontWeight="medium"
              _hover={{ color: "blue.500" }}
              color={mode("gray.600", "gray.300")}
            >
              {item.title}
            </Link>
          </Fragment>
        ))}
      </HStack>
      <HStack spacing="4">
        <Text>Designed by</Text>{" "}
        <Image src="/images/hearth.png" boxSize="24px" />{" "}
        <Link color={mode("blue.600", "blue.200")}>
          <Text fontWeight="semibold">Furkan Çat</Text>
        </Link>
      </HStack>
    </VStack>
  );
};

export default Footer;
