import { useContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { utils, BigNumber } from "ethers";
import { Link } from "react-router-dom";

import {
  VStack,
  HStack,
  Flex,
  Box,
  Text,
  // Heading,
  // Input,
  Button,
  useToast,
  Grid,
  GridItem,
  keyframes,
} from "@chakra-ui/react";
import { CartItem } from "../../components";
import { Context } from "../../state";
import { useAppState } from "../../state";
import { CART } from "../../state/constants";

const Cart = () => {
  const { checkout, discount } = useAppState();
  const { state, dispatch } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast();
  const history = useHistory()

  useEffect(() => {

    dispatch({ type: 'SET_PAGE', payload: CART })
  }, []);
  useEffect(() => {

    let effect = async () => {
      let dstate = await discount(state)
      if (dstate.discount) {
        dispatch({ type: 'SET_DISCOUNT_AMOUNT', payload: dstate.total })
      }
      else {
        // console.log('discount is ', dstate.discount)
        dispatch({ type: 'SET_DISCOUNT_AMOUNT', payload: BigNumber.from('0') })
      }
    }

    effect()
  }, [state.items]);

  let deleteProduct = (id: BigNumber) => {
    console.log('deleteProduct', id)
    dispatch({ type: 'DELETE_PRODUCT', payload: id })
  }
  let checkoutTransfer = async () => {
    checkout(state, toast, history, dispatch, setLoading, true)
  };

  //   gradient animation
  const gradient = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
    `;

  const gradientAnimation = `${gradient} infinite 2s linear`;

  return (
    <>
      {
        state.items.length > 0
          ?
          <Grid
            h="100%"
            w="100%"
            templateRows={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
            gap={0}
          >
            <GridItem colSpan={3} bg="">
              <Box w="100%" flex="4">
                {
                  state.items.map((item: any, key: number) => {
                    return (
                      <CartItem
                        product={item.product}
                        quantity={item.quantity}
                        key={key}
                        deleteProduct={deleteProduct}
                      />
                    );
                  })
                }
              </Box>
            </GridItem>
            <GridItem colSpan={2} rowSpan={5}>
              <VStack p="40px" borderBottom="1px solid white">
                <HStack w="100%" mb="12px">
                  <Box w="100%">
                    <Text color="#A5A5A5" fontWeight="500" fontSize="16px" textTransform="uppercase">subtotal ({state.items?.length} items) :</Text>
                  </Box>
                  <Box>
                    <Text>ETH </Text>
                  </Box>
                  <Box>
                    <Text>{utils.formatEther(state.total)}</Text>

                  </Box>
                </HStack>
                <HStack w="100%" mb="16px !important">
                  <Box w="100%">
                    <Text color="#A5A5A5" fontWeight="500" fontSize="16px">all 4 discount:</Text>
                  </Box>
                  <Box>
                    <Text color="#FF0000" fontWeight="500" fontSize="16px">- </Text>
                  </Box>
                  <Box>
                    <Text color="#FF0000" fontWeight="500" fontSize="16px">ETH </Text>
                  </Box>
                  <Box>
                    <Text color="#FF0000" fontWeight="500" fontSize="16px">{utils.formatEther(state.discount)}</Text>
                  </Box>
                </HStack>
                <HStack w="100%" mb="123px">
                  <Box w="100%">
                    <Text textTransform="uppercase">total:</Text>
                  </Box>
                  <Box>
                    <Text color="#fff" fontWeight="600"> ETH </Text>
                  </Box>
                  <Box>
                    <Text color="#fff" fontWeight="600"> {utils.formatEther(state.total.sub(state.discount))}</Text>

                  </Box>
                </HStack>
                <Flex w="100%">
                  <Button
                    background="linear-gradient(46.58deg, #FF00C7 2.22%, rgba(233, 62, 41, 0) 26.7%), linear-gradient(225.86deg, #60FF35 9.69%, #FE2125 91.19%);"
                    backgroundSize="150% 200%"
                    onClick={checkoutTransfer}
                    outline="none"
                    p="45px"
                    animation={gradientAnimation}
                    _focus={{ outline: "none" }}
                    _hover={{
                      backgroundSize: "800% 800%",
                    }}
                    _active={{
                      backgroundSize: "30% 30%",
                    }}
                    mt="80px"
                  >
                    <Text
                      fontSize={{ base: "12px", md: "24px" }}
                      fontWeight="600"
                      color=""
                    >
                      Proceed to checkout
                    </Text>
                  </Button>
                </Flex>
              </VStack>

            </GridItem>
          </Grid>
          :
          <>
            <Box p='40px' mt="72px" alignItems="center" textAlign="center"><Text textTransform="uppercase" fontWeight="600" fontSize="56px" color="white" >NO ITEMS IN CART.ART</Text>
            </Box>
            <Box textAlign="center">
              <Link to='/token' >
                <Text textAlign="center" textDecoration="underline" mt="72px" fontSize="24px" textTransform="uppercase">
                  Go to products
                </Text>
              </Link>
            </Box>
          </>
      }
      {loading
        ?
        <Box
          style={{
            position: 'fixed',
            top: '0px',
            bottom: '0px',
            right: '0px',
            left: '0px',
            background: 'black',
            opacity: '0.5',
          }}
        >
          <Text color='white' zIndex={'2'} fontSize='22px' textAlign='center' marginTop='40%'>Loading...</Text>
        </Box>
        :
        ''
      }
    </>
  );
};

export { Cart };
