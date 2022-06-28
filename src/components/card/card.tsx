import { Box, BoxProps } from "@chakra-ui/react";

const Card: React.FC<BoxProps> = ({ children, ...props }): JSX.Element => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      borderWidth="thin"
      borderColor="gray.200"
      p="4"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
