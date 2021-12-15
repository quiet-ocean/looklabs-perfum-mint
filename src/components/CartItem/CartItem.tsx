import { useContext, useEffect, useState } from "react";
import { utils } from "ethers";
import {
  Box,
  Flex,
  VStack,
  // HStack,
  Text,
  SimpleGrid,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { Context } from '../../state'

const CartItem = (props: any) => {
  // const { token, quantity } = props
  // const
  const { product, quantity, deleteProduct } = props;
  // const [isCyber, setIsCyber] = useState(false);
  const { dispatch } = useContext(Context)
  // console.log(product, quantity)

  useEffect(() => {
    if (product.type === 2) {
      console.log("product is cyber");
      // setIsCyber(true);
    } else {
      console.log("product is not cyber");
    }
  }, []);
  let addProduct = () => {
    dispatch({ type: 'ADD_PRODUCT', payload: { product: product, quantity: 1 } })
  }
  return (
    <Box
      borderBottom="1px solid white"
      borderRight={{ base: "none", md: "1px solid white" }}
    >
      <Flex direction={{ base: "column", md: "row" }}>
        <Box padding="25px" flex="3">
          <ReactPlayer
            // url={token.media}
            // url = '/static/comfy5402_gloss.mp4'
            url={`/static/${product.mediaUrl}`}
            loop={true}
            playing={true}
            muted={true}
            width="100%"
            height="100%"
          />
        </Box>
        <Box
          padding="40px"
          flex="7"
          borderLeft={{ base: "none", md: "1px solid white" }}
        >
          <VStack align="stretch" spacing="0" h="100%">
            <Flex>
              <Box>
                <Text
                  color="#a5a5a5"
                  textTransform="uppercase"
                  fontWeight="600"
                  mb="16px"
                >
                  ntf &amp; physical
                </Text>
              </Box>
              <Spacer />
              <Box>
                <Text
                  color="#800000"
                  textTransform="uppercase"
                  fontWeight="600"
                  mb="16px"
                  cursor="pointer"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </Text>
              </Box>
            </Flex>
            <Box>
              <Heading as="h3" fontWeight="600" fontSize="32px" mb="24px">
                {product.name}
              </Heading>
            </Box>
            <Box>
              <Text color="white" fontSize="24px" fontWeight="600" mb="16px">
                Ξ {Number(utils.formatEther(product.price))} + gas
              </Text>
            </Box>
            <Box w="100%">
              <Text
                textTransform="uppercase"
                color="rgba(186, 186, 186, 0.5)"
                fontSize="14px"
                mb="20px"
                fontWeight="500"
              >
                {/* TODO change if sold out */}
                SUPPLY 30/1337
              </Text>
              <SimpleGrid flexDirection="row">
                <Box w="100%">
                  <Text
                    textTransform="uppercase"
                    color="#a5a5a5"
                    fontSize="16px"
                    mb="8px"
                  >
                    QTY:
                  </Text>
                  <Flex
                    direction={{ base: "row", md: "row" }}
                    spacing="10px"
                    align="stretch"
                    mt="8px"
                  >
                    <Box
                      background="linear-gradient(0deg, rgba(165, 165, 165, 0.2), rgba(165, 165, 165, 0.2)), #000000"
                      color="#A5A5A5"
                      fontSize="32px"
                      w="100%"
                      textAlign="center"
                      border="3px solid #a5a5a5"
                      p="10px"
                      h='80px'
                      // onClick={minQty}
                      onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: product.id })}
                      cursor={"pointer"}
                      userSelect="none"
                    >
                      -
                    </Box>
                    <Box
                      w="100%"
                      textAlign="center"
                      background="#191919"
                      ml="10px"
                      mr="10px"
                      h='80px'

                    >
                      <Input
                        fontSize="32px"
                        p="36px"
                        w={{ base: "100%", md: "150px" }}
                        textAlign="center"
                        borderRadius="0px"
                        border="none"
                        // value={order.qty}
                        value={quantity}
                        min="1"
                        max="10"
                        readOnly
                        userSelect="none"
                        cursor={"default"}
                        color="#A5A5A5"
                        fontWeight="600"
                      />
                    </Box>
                    <Box
                      background="linear-gradient(0deg, rgba(165, 165, 165, 0.2), rgba(165, 165, 165, 0.2)), #000000"
                      border="1px solid #A5A5A5"
                      color="#A5A5A5"
                      fontSize="32px"
                      w="100%"
                      textAlign="center"
                      p="10px"
                      h='80px'
                      // onClick={plusQty}
                      onClick={() => addProduct()}
                      cursor={"pointer"}
                      userSelect="none"
                    >
                      +
                    </Box>
                  </Flex>
                </Box>
              </SimpleGrid>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export { CartItem };
