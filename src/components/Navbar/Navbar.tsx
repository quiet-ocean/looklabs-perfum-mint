import { Link } from "react-router-dom";
// import { utils } from "ethers";
import { useContext } from 'react'
import { Context } from '../../state'
import {
  HStack,
  Box,
  Text,
  Image,
  Spacer,
  Flex
} from "@chakra-ui/react";
import { CART, PRODUCT } from "../../state/constants";

const Navbar: React.FC = () => {

  const { state } = useContext(Context)
  return (
    <>
      <Flex
        w="100%"
        borderBottom="1px solid #fff"
        borderTop="1px solid #fff"
        color="white"
        p={{ base: "16px", lg: "24px" }}
        direction={{ base: "column", lg: "row" }}
      >
        <HStack>
          <Box>
            <Link to="/token">
              <Text
                color="white"
                fontSize={{ base: "16px", lg: "24px" }}
                fontWeight="600"
              >
                Products
              </Text>
            </Link>
          </Box>
          <Box>
            <Text
              color="white"
              fontSize={{ base: "16px", lg: "24px" }}
              pl="12px"
              pr="12px"
            >
              |
            </Text>
          </Box>
          <Box>
            <Link to="/whitepaper">
              <Text
                color="gray"
                fontSize={{ base: "16px", lg: "24px" }}
                _hover={{
                  color: "white",
                }}
              >
                WHITEPAPER.txt
              </Text>
            </Link>
          </Box>
        </HStack>

        <Spacer />
        <Box>
          { (state.nav === PRODUCT || state.nav === CART )
            ?
            <>
              <Link to="/cart">
                {/* replace icons as isn't flexable on mobile sizing */}
                <HStack>
                  <Image
                    src="/static/cart.svg"
                    w={{ base: "150px", lg: "48px" }}
                    h={{ base: "32px", lg: "32px" }}
                  ></Image>
                  <Text color="white"
                    fontSize={{ base: "16px", lg: "24px" }}
                    fontWeight="600">{state.items.length}&nbsp;{state.items.length == 1 ? 'ITEM' : 'ITEMS'}</Text>
                </HStack>
              </Link>
            </>
            :
            <></> 
          }         
        </Box>
      </Flex>
    </>
  );
};

export { Navbar };
