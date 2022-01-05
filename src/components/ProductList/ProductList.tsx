// @ts-nocheck
import { useReducer, useEffect, useState, useContext } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { productReducer } from "../../reducers";
import { Context, useAppState } from "../../state";
import { api } from "../../utils/api";
import * as dotenv from "dotenv";
import { TextSlider } from "../TextSlider";
import { ProductProps, StyleProps } from '../../types'
import { ProductItem } from "./ProductItem";
import { Container, Flex, Box, Text, useToast } from "@chakra-ui/react";
import { PRODUCT, TYPE_HOODIE } from "../../state/constants";
import { BigNumber } from "ethers";
import { useProductState } from '../../hooks'

dotenv.config();

const ProductList: React.FC = () => {
  const { state, dispatch, productState, productDispatch, appState, setAppState } = useContext(Context)
  const [productCount, setProductCount] = useState(0)
  const history = useHistory()
  const { category } = useParams()
  const toast = useToast()
  const products = useProductState()
  
  const setLoading = (flag: boolean) => {
    setAppState({...appState, loading: flag})
  }

  useEffect(() => {

  }, [category])

  useEffect(() => {
    let length = state.items.length
    if(length > productCount) {
      console.log('a product added to cart')
      
    }
    setProductCount(length)
  }, [state.items])

  let checkout = () => [
    checkout(state, toast, history, dispatch, setLoading)
  ]

  return (
    <Flex color="white" direction={{ base: "column", md: "column" }}>
      {/* <Cart product={null}
        quantity="100" setLoading={setLoading}>
      </Cart> */}
      {/*products?.length === undefined || products?.length === 0 ? <Text textAlign='center' marginTop='10%'>No Product</Text> : null*/}
      {
        productState.products?.map((item, key) => {
          if(item === undefined || item === '') return ''
          if (key === 0) {
            return (
              <Box key={key}>
                <Container maxW="100%" centerContent>
                  <ProductItem key={key} dataKey={key} product={item} setLoading={setLoading} />
                </Container>
                <TextSlider reverse={true} variant={1} />
              </Box>
            );
          } else if (key === 1) {
            return (
              <Box key={key}>
                <Container
                  maxW="100%"
                  boderbottom={{ base: "1px solid whtie", md: "none" }}
                  centerContent
                >
                  <ProductItem key={key} dataKey={key} product={item} setLoading={setLoading}/>
                </Container>
                <TextSlider
                  reverse={false}
                  variant={2}
                  display={{ base: "none", md: "block" }}
                />
              </Box>
            );
          } else {
            return (
              <Box key={key}>
                <Container maxW="100%" centerContent>
                  <ProductItem key={key} dataKey={key} product={item} setLoading={setLoading}/>
                </Container>
                {/* Dividier. ToDo - to be exported in component */}
                {/* skip border if it's last product not to overlap footer */}
                {key === products.length - 1 ? (
                  ""
                ) : (
                  <Box border="1px solid white"></Box>
                )}
              </Box>
            );
          }
        })
      }
    </Flex>
  );
};

export { ProductList };
