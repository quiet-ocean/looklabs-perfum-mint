import { Container, HStack, Box, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container
      borderTop="1px solid #fff"
      maxW="container.xl"
      maxWidth="100%"
      p="40px"
      margin="0px"
    >
      <HStack w="100%">
        <Box>
          <Link textTransform="uppercase" href='/about' color='white'>
            about
          </Link>
        </Box>
        <Box w="100%" textAlign="center">
          <Link textTransform="uppercase" href='https://twitter.com/look_labs' isExternal  color='white'>
            twitter
          </Link>
        </Box>
      <Box>
          <Link href='https://discord.gg/looklabs' isExternal  color='white'>
            DISCORD
          </Link>
        </Box>
      </HStack>
    </Container>
  );
};

export { Footer };
