import { Link } from "react-router-dom";
// import { utils } from "ethers";
import { useContext, useState } from 'react'
import { Context } from '../../state'
import {
  HStack,
  Box,
  Text,
  Image,
  Spacer,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { CART, PRODUCT, WHITEPAPER } from "../../state/constants";

const categories = ['all', 'perfum', 'clothing', 'membership', 'accessories']
const Navbar: React.FC = () => {

  const { state } = useContext(Context)
  
  // const [isOpen, setOpen] = useState(false)
  // const onClose = () => {
  //   console.log('on close function')
  //   setOpen(!isOpen)
  // }
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
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton rightIcon={<ChevronDownIcon />}>
                    <HStack><Text
                        color={state.currentPage === PRODUCT ? "white" : "gray"}
                        fontSize={{ base: "16px", lg: "24px" }}
                        fontWeight="600"
                        >
                        products
                    </Text>
                    <ChevronDownIcon /></HStack>
                  </MenuButton>
                  <MenuList style={{background: 'black', borderRadius: '0px', padding: '0px', marginTop: '16px'}}>
                    {
                        categories.map((item: any, key: number) => (
                            <MenuItem style={{borderTop: '1px solid'}} key={key}><Link to='/token'><Text>{item}</Text></Link></MenuItem>
                        ))   
                    }
                  </MenuList>
                </>
              )}
            </Menu>
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
                color={state.currentPage === WHITEPAPER ? "white" : "gray"}
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
          { (state.currentPage === PRODUCT || state.currentPage === CART )
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
                  <Text color={state.currentPage === CART ? "white" : "gray"}
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
