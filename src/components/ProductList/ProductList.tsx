// @ts-nocheck
import { useReducer, useEffect, useState, useContext } from "react";
import { productReducer } from "../../reducers";
import { Context, useAppState } from "../../state";
import { api } from "../../utils/api";
import * as dotenv from "dotenv";
import { TextSlider } from "../TextSlider";
import { ProductProps } from '../../types'
import { ProductItem } from "./ProductItem";
import { Container, Flex, Box, Text } from "@chakra-ui/react";
import { PRODUCT } from "../../state/constants";

dotenv.config();

const uri = [
  'cyber_grid.mov',
  'hoodie_grid.mp4',
  'card_green_grid.mp4',
  'passcard_grid.mp4',
  'card_green_grid.mp4'
]

const description = [
  ['Diam augue auctor aliquet tortor dui proin purus, amet. Ut pellentesque sem praesent cras adipiscing risus pellentesque non id. Risus sed vitae nisi sit. Learn more'],
  ['Diam augue auctor aliquet tortor dui proin purus, amet. Ut pellentesque sem praesent cras adipiscing risus pellentesque non id. Risus sed vitae nisi sit. Learn more'],
  ['Diam augue auctor aliquet tortor dui proin purus, amet. Ut pellentesque sem praesent cras adipiscing risus pellentesque non id. Risus sed vitae nisi sit. Learn more'],
  ['Diam augue auctor aliquet tortor dui proin purus, amet. Ut pellentesque sem praesent cras adipiscing risus pellentesque non id. Risus sed vitae nisi sit. Learn more'],
]

const ProductList = () => {
  const { contract } = useAppState();
  const { state, dispatch } = useContext(Context)
  const [products, productDispatch] = useReducer(productReducer, []);
  const [loading, setLoading] = useState(true);

  let _products = [];

  let loadProduct = async () => {
    _products = await contract.getProducts();

    console.log('_products', _products)

    if (_products && _products.length) {
      _products.forEach(async (item, key) => {
        // TEST PRODUCT, TO REMOVE WHEN THE DB IS WORKING
        // const response = await api.get(`/product/${item.id}`)
        let newItem: ProductProps = {
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          // contractType: item.contractType,
          sale: item.sale,
          // uri: item.url,
          mediaUrl: "/movies/" + uri[item.id],
          description: description[item.id],
          type: item.name.toLowerCase() === 'cyber edp' ? 2 : 1,
        };
        // console.log(newItem)
        productDispatch({ type: "ADD_PRODUCT", payload: newItem });
      });
    }
  };

  useEffect(async () => {
    dispatch({type: 'SET_PAGE', payload: PRODUCT})
    await loadProduct();
    setLoading(false);
  }, []);

  return (
    <Flex color="white" direction={{ base: "column", md: "column" }}>
      {/* <Cart product={null}
        quantity="100" setLoading={setLoading}>
      </Cart> */}
      {
        products?.map((item, key) => {
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
          <Text color='white' zIndex={'2'} fontSize='22px' textAlign='center' marginTop='30%'>Loading...</Text>
        </Box>
        :
        ''
      }
    </Flex>
  );
};

export { ProductList };
