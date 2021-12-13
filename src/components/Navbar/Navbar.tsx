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
// import { FaShoppingCart } from "react-icons/fa";

// import { Context } from "../../state";
// import { useAppState } from "../../state";

// const MenuListContent = () => {
//   const history = useHistory();

//   let gotoCheckout = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     history.push("/checkout");
//   };
//   let gotoCart = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     history.push("/cart");
//   };

//   return (
//     <VStack bg={"black"} color="white">
//       <Box p="5px" w="full">
//         <VStack w="full">
//           <Button
//             p="8px"
//             onClick={gotoCheckout}
//             bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)"
//           >
//             <Text color="white">proceed to checkout</Text>
//           </Button>
//           <Button
//             p="8px"
//             onClick={gotoCart}
//             bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)"
//           >
//             <Text color="white">view cart</Text>
//           </Button>
//         </VStack>
//       </Box>
//     </VStack>
//   );
// };
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
                fontWeight="600">{state.ids.length}&nbsp;{state.ids.length == 1 ? 'ITEM' : 'ITEMS'}</Text>
            </HStack>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export { Navbar };
